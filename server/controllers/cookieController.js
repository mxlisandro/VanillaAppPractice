const User = require('../models/userModel');
const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  res.cookie('ssid',res.locals.user._id, {httpOnly:true});
  console.log('SSIDCookie set')
  return next();
}

module.exports = cookieController;