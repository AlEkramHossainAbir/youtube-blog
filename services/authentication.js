const JWT = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageUrl:user.profileImageUrl,
    role: user.role
  };

  return JWT.sign(payload, secret, { expiresIn: "1h" });
}

function validateToken(token) {
  try {
    return JWT.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
    createTokenForUser,
    validateToken
}