import jwt from 'jsonwebtoken';

const SECRET = 'kimviana';

function verifyToken(req, res, next) {
  const token = req.headers.authorizathion;
  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.status(401).json({ message: 'invalid token'});
    }
    return next();
});
}

export default verifyToken;
