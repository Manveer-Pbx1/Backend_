const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  // const authorizationHeaderValue = req.headers["authorization"];
  req.user = null;

  if (!tokenCookie) {
    return next();
  }
  // now we need to verify
  const token = authorizationHeaderValue.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  return next();
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["authorization"];

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer")[1]; // get token from userUid
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");
//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   const userUid = req.headers["authorization"];
//   const token = userUid.split("Bearer ")[1];

//   const user = getUser(token);

//   req.user = user;
//   next();
// }

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized.");

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
