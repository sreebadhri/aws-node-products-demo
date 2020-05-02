const express = require("express");
const products = require("./Products");
const logger = require("./logger");
const app = express();
const PORT = process.env.PORT || 8081;
app.use(logger);

app.get("/", (req, resp) => {
  resp.send("Welcome to my Prodcuts!!");
});

app.get("/products", (req, resp) => {
  resp.send(products);
});

app.get("/prodcuts/:name", (req, resp) => {
  const product = products.some(
    (member) => member.firstName === req.params.name
  );

  if (product) {
    console.log("Prodcut found");
    resp.send(
      products.filter((product) => product.productName === req.params.name)
    );
  } else {
    resp
      .status(404)
      .json({ message: `No member found for name: ${req.params.name}` });
  }
});

app.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
