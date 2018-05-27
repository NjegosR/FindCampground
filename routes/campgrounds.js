var express     = require("express");
var Campground  = require("../models/campground");
var router      = express.Router();
//Index
router.get("/", function(req, res){
	Campground.find({}, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", { campgrounds: campground });
		}
	});
});

//Create
router.post("/", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, img: image, description: description, author: { id: req.user._id, username: req.user.username}};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	});
});

//New
router.get("/new", isLoggedIn, function(req,res){
	res.render("campgrounds/new");
});
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("error");
		} else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("auth/login");
}

module.exports = router;