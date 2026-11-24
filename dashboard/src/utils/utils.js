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
