import io from 'socket.io-client'
export const overrideStyle = {
    display : 'flex', 
    margin : '0 auto',
    height: '24px',
    justifyContent : 'center',
    alignItems : 'center'
}
const socketUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001'
export const socket = io(socketUrl)

/**
 * Validates and normalizes an image preview URL using URL parsing and a strict protocol allowlist.
 */
export const safePreviewUrl = (url) => {
    if (typeof url !== 'string' || /[<>"'`]/.test(url)) return ''
    try {
        const parsed = new URL(url, window.location.origin)
        if (parsed.protocol === 'blob:' || parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.href
        }
    } catch {
        return ''
    }
    return ''
}
