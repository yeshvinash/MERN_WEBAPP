// This middleware checks the adminroute, like weather loggedin user is admin or not!
export const adminMiddleware = (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied! User is not an admin." });
    }
    // go to next middleware
    next();
  } catch (error) {
    next(error);
  }
};
