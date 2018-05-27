var mongoose     = require("mongoose");
var Campground   = require("./models/campground");
var Comment      = require("./models/comment");

function seedDB(){
    //Remove all campgrounds
    var data = [
        {
            name: "Campground 1",
            img: "https://images.pexels.com/photos/398532/pexels-photo-398532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida, odio id consequat dictum, mi justo porta eros, volutpat euismod ex lacus in justo. Phasellus mattis justo hendrerit eros euismod, sed pretium tellus laoreet. Donec pulvinar vel neque at ultrices. Quisque sed urna suscipit, lacinia leo nec, tempor massa. Fusce vitae pulvinar justo, sit amet malesuada turpis. Nullam non magna quis dui placerat tristique in quis mauris. Morbi pellentesque tortor dapibus urna molestie auctor. Morbi placerat eleifend tellus nec imperdiet. Cras volutpat pretium leo sit amet tempus. Maecenas dictum tortor eu augue tincidunt porta. Vivamus id elit at nunc aliquam aliquam. Curabitur aliquam augue tortor, nec efficitur lectus pharetra in. Curabitur lectus tortor, consectetur ut est id, finibus iaculis justo. Vivamus ut pretium libero. Morbi nibh enim, gravida ac porta sed, interdum a leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        },
        {
            name: "Campground 2",
            img: "https://images.pexels.com/photos/109919/pexels-photo-109919.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida, odio id consequat dictum, mi justo porta eros, volutpat euismod ex lacus in justo. Phasellus mattis justo hendrerit eros euismod, sed pretium tellus laoreet. Donec pulvinar vel neque at ultrices. Quisque sed urna suscipit, lacinia leo nec, tempor massa. Fusce vitae pulvinar justo, sit amet malesuada turpis. Nullam non magna quis dui placerat tristique in quis mauris. Morbi pellentesque tortor dapibus urna molestie auctor. Morbi placerat eleifend tellus nec imperdiet. Cras volutpat pretium leo sit amet tempus. Maecenas dictum tortor eu augue tincidunt porta. Vivamus id elit at nunc aliquam aliquam. Curabitur aliquam augue tortor, nec efficitur lectus pharetra in. Curabitur lectus tortor, consectetur ut est id, finibus iaculis justo. Vivamus ut pretium libero. Morbi nibh enim, gravida ac porta sed, interdum a leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        },
        {
            name: "Campground 3",
            img: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida, odio id consequat dictum, mi justo porta eros, volutpat euismod ex lacus in justo. Phasellus mattis justo hendrerit eros euismod, sed pretium tellus laoreet. Donec pulvinar vel neque at ultrices. Quisque sed urna suscipit, lacinia leo nec, tempor massa. Fusce vitae pulvinar justo, sit amet malesuada turpis. Nullam non magna quis dui placerat tristique in quis mauris. Morbi pellentesque tortor dapibus urna molestie auctor. Morbi placerat eleifend tellus nec imperdiet. Cras volutpat pretium leo sit amet tempus. Maecenas dictum tortor eu augue tincidunt porta. Vivamus id elit at nunc aliquam aliquam. Curabitur aliquam augue tortor, nec efficitur lectus pharetra in. Curabitur lectus tortor, consectetur ut est id, finibus iaculis justo. Vivamus ut pretium libero. Morbi nibh enim, gravida ac porta sed, interdum a leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        }
    ];
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed!");
            //Add campers
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log("Error");
                    } else{
                        console.log("Added new campground!");
                        Comment.create(
                            {
                                text: "This place is great...",
                                author: "Njegos The King"
                            }, function(err, comment){
                                if(err){
                                    console.log("err");
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("new comment");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
    

}
module.exports = seedDB;