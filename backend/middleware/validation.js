module.exports = function (req, res, next) {
  const { email, name, password1, password2 } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/verifyemail") {
    if (![email, name].every(Boolean)) {
      return res.json("Please fill in all the fields");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/register") {
    if (![email, name, password1, password2].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    } else if (password1 !== password2) {
      return res.json("Passwords must match");
    }
  }

  next();
};
