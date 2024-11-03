const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTempCard = require("./modules/replaceTemplateCard");

const slugify = require("slugify");

// console.log("this is Slugify", slugify);

//   console.log(data);

//   fs.readFile(`./txt/${data}.txt`, "utf-8", (error, data4) => {
//     console.log(data4);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data2) => {
//       console.log(data2);

//       fs.writeFile("./txt/final.txt", `${data}\n${data2}`, "utf-8", (err) => {
//         console.log("Your file has been written😄");
//       });
//     });
//   });
// });

// console.log("Will read file");

///////////////////////////////////////////////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/template/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/template/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/template/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);
// console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer((req, res) => {
  // console.log(req.url);

  // console.log(req.url);

  console.log("this is for url parse", url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);
  console.log("looking for query", query.id);
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTempCard(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }

  // Product page
  else if (pathName === `/product?id=${query.id}`) {
    res.writeHead(200, { "Content-type": "text/html" });
    // console.log(query);
    const product = dataObj[query.id];
    // console.log(product);
    const output = replaceTempCard(tempProduct, product);
    res.end(output);
  }

  // API
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(`<h1 style="background-color: red;" >Page not found!</h1>`);
  }
  // res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
