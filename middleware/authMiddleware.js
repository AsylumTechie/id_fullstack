// const jwt = require('jsonwebtoken');

// const protect = (req, res, next) => {
//     console.log("Authorization Header:", req.headers.authorization);
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) return res.status(401).json({ error: 'Not authorized' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token' });
//     }
// };

// module.exports = { protect };
