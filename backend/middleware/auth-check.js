const jwt = require ("jsonwebtoken");

// middleware to check that the current logged in luer is authorized to do a specific task
module.exports = (req, res, next) => {
  try{
    const token = req.headers.autherization.split(" ")[1];
    jwt.verify(token, "secret_long_text_asdvBBGH##$$sdddgfg567$33");
    next();
  }
  catch (error) {
    res.status(401).json({
      message: 'Authntication denied!',
      error: error
    });
  }
}
