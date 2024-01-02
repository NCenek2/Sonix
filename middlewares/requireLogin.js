module.exports = (req, res, next) => {
  if (!req.user) return res.status(401).send({ error: "You must log in!" });
  // Error should be unauthorized? You must log in is not too descriptive
  next();
};
