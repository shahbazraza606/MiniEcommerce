const express = require("express");

const router = express.Router();

const product = require("../Controllers/ProductController");
const auth = require("../Middleware/auth");
const upload = require("../Controllers/MulterConfig");

router.post("/add",auth.verifyUser,auth.verifytoken, upload.single("image"), product.addProduct);
router.get("/get", auth.verifytoken,product.getProduct);
router.delete("/delete/:id",auth.verifytoken, product.deleteProduct);
router.put("/update/:id",auth.verifytoken,upload.single("image"), product.updateProduct);
router.get("/get/:id",auth.verifytoken, product.getProductById);

module.exports = router;