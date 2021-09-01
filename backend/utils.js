const jwt = require('jsonwebtoken');

// JWT SECRET SIGN-KEY
const secret = process.env.JWT_SECRET;
const options = { expiresIn: '2d', issuer: 'https://hamzeen.github.io' };

module.exports = {
  validateToken: (req, res, next) => {

    if (req.headers.authorization) {

      // C:: AT THE REQUEST FOR A SECURED/RESTRICTED API...
      // 1. extract the JWT from request header
      const extractedToken = req.headers.authorization.split(' ')[1];
      try {
        // 2. Verify it! (do. this in a TRY-CATCH block)
        const verifiedToken = jwt.verify(extractedToken, secret, options);
        // 3. this has expiry date & the payload (ex: username) against which it was issued
        console.log('verified token:::', verifiedToken);

        req.decoded = verifiedToken;
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      res.status(401).send({
        error: `LC:: Authentication error. Token required.`,
        status: 401
      });
    }
  }
};
