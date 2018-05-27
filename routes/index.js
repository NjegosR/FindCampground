var express  = require("express");
var User     = require("../models/user");
var passport = require("passport");
var router   = express.Router();

router.get("/", function(req, res){
	res.render("home");
});
//===========
//AUTH ROUTES
//===========
router.get("/register", function(req, res){
	res.render("auth/register");
});
router.post("/register", function(req, res){
	User.register(new User({ username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("auth/register");
		}else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/campgrounds");
			});
		}
	});
});

//===========
//LOGIN ROUTES
//===========

router.get("/login", function(req,res){
	res.render("auth/login");
});
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "auth/login"
}), function(req, res){
	
});

//==============
//LOG OUT
//==============

router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("auth/login");
}

module.exports = router;