var Category = require("../models/categoryModel");
var bodyParser = require("body-parser");
const { json } = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post("/api/addCategory", function (req, res) {
    var newCateogry = req.body.category;

    Category.create(newCateogry, function (err, results) {
      res.send("Category Added");
    });
  });

  app.get("/api/cateogeries", function (req, res) {
    Category.find({}, function (err, Categories) {
      if (err) throw err;

      res.send(Categories);
    });
  });

  app.get("/api/categories/name/:catName", function (req, res) {
    Category.find(
      {
        name: "Electronics",
      },
      function (err, categories) {
        if (err) throw err;

        res.send(categories);
      }
    );
  });

  app.get("/api/categories/:id", function (req, res) {
    Category.findById(
      {
        _id: req.params.id,
      },
      function (err, categories) {
        if (err) throw err;
        res.send(categories);
      }
    );
  });

  app.put("/api/categories", function (req, res) {
    if (req.body._id) {
      Category.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          sub: req.body.sub,
        },
        function (err, categories) {
          if (err) throw err;
          res.send(categories);
        }
      );
    }
  });

  app.delete("/api/categories", function (req, res) {
    Category.findByIdAndRemove(req.body._id, function (err) {
      if (err) throw err;
      res.send("deleted");
    });
  });
};
