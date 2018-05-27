var express     = require("express");
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var router      = express.Router({mergeParams: true});
//comments
router.get("/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("error");
		}
		else{
			res.render("comments/new", { campground: campground });
		}
	});
});

router.post("/", isLoggedIn, function(req,res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log("err");
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log("err");
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save(function(err, cam){
						if(!err){
							res.redirect("/campgrounds/" + cam._id);
						}
					});
				}
			});
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