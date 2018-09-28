var express = require("express");
var router  = express.Router();
var Closet = require("../models/closet");

//INDEX - show all closet
router.get("/", function(req, res){
	res.status(200).json({
    	message: "Closets were fetched"
    });
});

router.post("/", (req, res) => {
	const closet = {
		name: req.body.image,
    	author: req.body.author,
    	clothes: req.body.clothes
    };
    res.status(201).json({
    	message: "Closet was created",
    	closet: closet
    });

});

module.exports = router;
