const fs = require("fs");
const http = require("http");
const url = require("url");

const card = fs.readFileSync("./template/template-card.html", "utf-8");
const tempOverview = fs.readFileSync(
  "./template/template-overview.html",
  "utf-8"
);
const data = fs.readFileSync("./dev-data/data.json", "utf-8");

const dataParse = JSON.parse(data);

const replaceTempCard = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);

  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  return output;
};
// console.log(card);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    // console.log("Testing");
    res.end("Hello world");
  } else if (pathName === "/card") {
    console.log(dataParse);
    res.writeHead(200, { "Content-type": "text/html" });
    const dataObj = dataParse.map((el) => replaceTempCard(card, el)).join("");
    // console.log("this is dataObj", dataObj);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", dataObj);
    res.end(output);
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  }
});

server.listen(8001, "127.0.0.1", () => {
  console.log("Listing to port 8001");
});
