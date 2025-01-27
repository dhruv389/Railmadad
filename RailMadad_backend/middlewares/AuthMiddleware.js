const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const SECRET_KEY = process.env.SECRET_KEY || 'WETGGpjk125dnbj579GJRT'; // Use environment variable
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err.message); // Log error for debugging
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
};





const ComplaintsauthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const SECRET_KEY = process.env.SECRET_KEY || 'EYDVHB8y849guyihsgh79GJRT'; // Use environment variable
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err.message); // Log error for debugging
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }
    req.user = user;
    next();
  });
};

module.exports = {authMiddleware,ComplaintsauthMiddleware};
