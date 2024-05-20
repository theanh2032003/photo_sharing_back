const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

module.exports = function(req, res, next) {
  // Lấy token từ header
  const token = req.header('x-auth-token');

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Xác thực token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
