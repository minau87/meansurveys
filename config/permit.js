// middleware for doing role-based permissions
module.exports = permit = (...allowed) => {
  const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role))
      next(); // role is allowed, so continue on the next middleware
    else {
      console.log("permit.js: req.user:", req.user.role);
      res.status(403).json({
        success: false,
        msg: "Forbidden" // user is forbidden
      });
    }
  }
}