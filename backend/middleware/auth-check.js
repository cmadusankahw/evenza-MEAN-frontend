const jwt = require ("jsonwebtoken");

// middleware to check that the current logged in luer is authorized to do a specific task
module.exports = (req, res, next) => {
  try{
    const token = req.headers.autherization.split(" ")[1];
    const decodeToken = jwt.verify(token, "secret_long_text_asdvBBGH##$$sdddgfg567$33");
    req.userData = {user_id: decodeToken.user_id, user_tyype: decodeToken.user_tyype , email: decodeToken.email};
    next();
  }
  catch (error) {
    res.status(401).json({
      message: 'Authntication denied!',
      error: error
    });
  }
}
