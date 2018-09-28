var mongoose = require("mongoose");

var ClosetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
        },
   clothesId: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Clothes"
      }
   ]

});

module.exports = mongoose.model("Closet", ClosetSchema);
