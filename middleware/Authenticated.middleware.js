export const isUserAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ message: 'User Not logged in' });
  };
  