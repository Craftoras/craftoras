require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const http = require('http')
const socket = require('socket.io')
const { dbConnect } = require('./utiles/db')

const server = http.createServer(app)

// Security Headers (Helmet)
app.use(helmet({
    crossOriginResourcePolicy: false,
}))

// API Rate Limiting & Traffic Management
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1500, // Limit each IP to 1500 requests per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
})
app.use('/api', globalLimiter)

// Authentication Rate Limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50, // 50 attempts per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication attempts. Please wait 15 minutes before trying again.' }
})
app.use('/api/admin-login', authLimiter)
app.use('/api/seller-login', authLimiter)
app.use('/api/customer/customer-login', authLimiter)
app.use('/api/customer/customer-register', authLimiter)

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
]
if (process.env.CLIENT_URL) {
    allowedOrigins.push(process.env.CLIENT_URL)
}
if (process.env.DASHBOARD_URL) {
    allowedOrigins.push(process.env.DASHBOARD_URL)
}

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else if (process.env.NODE_ENV !== 'production') {
            callback(null, true) // Allow local dev origins
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

// Socket.IO Configuration
const io = socket(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? allowedOrigins : '*',
        credentials: true
    }
})

var allCustomer = []
var allSeller = []
let admin = {}

const addUser = (customerId, socketId, userInfo) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({ customerId, socketId, userInfo })
    }
} 

const addSeller = (sellerId, socketId, userInfo) => {
    const checkSeller = allSeller.some(u => u.sellerId === sellerId)
    if (!checkSeller) {
        allSeller.push({ sellerId, socketId, userInfo })
    }
} 

const findCustomer = (customerId) => {
    return allCustomer.find(c => c.customerId === customerId)
}
const findSeller = (sellerId) => {
    return allSeller.find(c => c.sellerId === sellerId)
}

const remove = (socketId) => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId)
    allSeller = allSeller.filter(c => c.socketId !== socketId)
}

io.on('connection', (soc) => {
    soc.on('add_user', (customerId, userInfo) => {
        addUser(customerId, soc.id, userInfo)
        io.emit('activeSeller', allSeller) 
    })
    soc.on('add_seller', (sellerId, userInfo) => {
        addSeller(sellerId, soc.id, userInfo)
        io.emit('activeSeller', allSeller) 
    })
    soc.on('send_seller_message', (msg) => {
        const customer = findCustomer(msg.receverId)
        if (customer !== undefined) {
            soc.to(customer.socketId).emit('seller_message', msg)
        }
    })  
    soc.on('send_customer_message', (msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('customer_message', msg)
        }
    })  
    soc.on('send_message_admin_to_seller', (msg) => {
        const seller = findSeller(msg.receverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('receved_admin_message', msg)
        }
    })
    soc.on('send_message_seller_to_admin', (msg) => { 
        if (admin.socketId) {
            soc.to(admin.socketId).emit('receved_seller_message', msg)
        }
    })
    soc.on('add_admin', (adminInfo) => {
        if (adminInfo) {
            delete adminInfo.email
            delete adminInfo.password
            admin = adminInfo
            admin.socketId = soc.id  
            io.emit('activeSeller', allSeller) 
        }
    })
    soc.on('disconnect', () => {
        remove(soc.id)
        io.emit('activeSeller', allSeller) 
    })
})

// Body Parser & Cookies
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Healthcheck & Welcome Routes
app.get('/', (req, res) => res.send('Craftoras API Server is running'))
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'craftoras-api',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

// Application Routes
app.use('/api/home', require('./routes/home/homeRoutes'))
app.use('/api', require('./routes/authRoutes'))
app.use('/api', require('./routes/order/orderRoutes'))
app.use('/api', require('./routes/home/cardRoutes'))
app.use('/api', require('./routes/dashboard/categoryRoutes'))
app.use('/api', require('./routes/dashboard/productRoutes'))
app.use('/api', require('./routes/dashboard/sellerRoutes'))
app.use('/api', require('./routes/home/customerAuthRoutes'))
app.use('/api', require('./routes/chatRoutes'))
app.use('/api', require('./routes/paymentRoutes'))
app.use('/api', require('./routes/dashboard/dashboardRoutes'))

// Server Execution
const defaultPort = process.env.PORT || 5000

function startServer(portToTry) {
    dbConnect()
    const listener = server.listen(portToTry, () => {
        console.log(`Server is running on port ${portToTry}`)
    })

    listener.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            const fallbackPort = Number(portToTry) + 1
            console.warn(`[Port Conflict] Port ${portToTry} is already in use (e.g. macOS AirPlay). Falling back to port ${fallbackPort}...`)
            startServer(fallbackPort)
        } else {
            console.error('Server error:', err)
        }
    })
}

if (require.main === module) {
    startServer(defaultPort)
}

module.exports = { app, server }
