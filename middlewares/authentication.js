const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    console.log("Authentication middleware loaded",cookieName);
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
        next()
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next()
    } catch (err) {
        res.status(401).send('Invalid token');
    return;
}
// next()
  };
}

module.exports = { checkForAuthenticationCookie };
