const mongoose = require("mongoose");
const Clothes = require("../models/clothes");

exports.clothes_get_all = (req, res, next) => {
  Product.find()
    .select("image description category occasion _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        clothes: docs.map(doc => {
          return {
            image: doc.image,
            description: doc.description,
            category: doc.category,
            occasion: doc.occasion,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/clothes/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clothes_create_clothes = (req, res, next) => {
  const clothes = new Clothes({
    _id: new mongoose.Types.ObjectId(),
    image: req.file.path,
    description: req.body.description,
    category: req.body.category,
    occasion: req.body.occasion
  });
  clothes
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created clothes successfully",
        createdClothes: {
          image: result.image,
          description: result.description,
          category: result.category,
          occasion: require.occasion,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/clothes/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clothes_get_clothes = (req, res, next) => {
  const id = req.params.clothesId;
  Clothes.findById(id)
    .select("image description category occasion _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          clothes: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/clothes"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.clothes_update_clothes = (req, res, next) => {
  const id = req.params.clothesId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Clothes.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Clothes updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/clothes/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.clothes_delete = (req, res, next) => {
  const id = req.params.clothesId;
  Clothes.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Clothes deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/clothes",
          body: { image: "String", description: "String", category: "String", occasion: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
