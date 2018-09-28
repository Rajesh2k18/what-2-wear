var mongoose = require("mongoose");

var ClothesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: String,
    description: String,
    category: String,
    occasion: String,
    /*userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        }*/
});

module.exports = mongoose.model("Clothes", ClothesSchema);
