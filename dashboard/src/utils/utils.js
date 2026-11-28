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
 * Validates that an image preview URL uses a safe scheme (blob:, http(s):, or relative /).
 */
export const safePreviewUrl = (url) => {
    if (typeof url !== 'string') return ''
    return /^(blob:|https?:\/\/|\/)/.test(url) ? url : ''
}
