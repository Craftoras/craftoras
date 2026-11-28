const jwt = require('jsonwebtoken');

function getCookieValue(cookieHeader, name) {
    if (typeof cookieHeader !== 'string') return null;
    const match = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

module.exports.authMiddleware = async(req, res, next) =>{
    const accessToken = (req.cookies && req.cookies.accessToken) || getCookieValue(req.headers.cookie, 'accessToken');

    if (!accessToken) {
        return res.status(409).json({ error : 'Please Login First'})
    } else {
        try {
            const deCodeToken = await jwt.verify(accessToken,process.env.SECRET)
            req.role = deCodeToken.role
            req.id = deCodeToken.id
            next()            
        } catch (error) {
            return res.status(409).json({ error : 'Please Login'})
        }        
    }

}