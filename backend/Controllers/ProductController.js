const Product = require("../Models/ProductModel");

exports.addProduct = (req, res) => {
  const { name, description, quantity, price, image, rating, review } =
    req.body;
  console.log(req.body);

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    review: req.body.review,
    rating: req.body.rating,
    image: req.file.filename,
  });
  console.log(newProduct);

  newProduct
    .save()
    .then((savedProduct) => {
      res.status(201).json({
        response: "Product Added Successfully",
        success: true,
        user: savedProduct,
      });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ Response: "ERROR IN CREATING THE PRODUCT", error: error });
    });
};
exports.getProduct = (req, res) => {
  Product.find()
    .sort({ name: 1 })
    .then((product) => {
       console.log("Products Displayed")
      res
        .status(200)
        .json({ message: "Here is the Product info", product: product });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error In Fetching" });
    });
};
exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.status(200).json({ message: "Here is the Product info", product });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error In Fetching" });
    });
};


exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.updateProduct = (req, res) => {
  const updateProduct = {
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
    review: req.body.review,
    rating: req.body.rating,
    image: req.file.filename,
  };
  console.log(updateProduct);
  Product.findByIdAndUpdate(req.params.id, updateProduct)
    .then(() => res.status(200).json("Product Updated"))
    .catch((err) => res.status(400).json("Error: " + err));
};
