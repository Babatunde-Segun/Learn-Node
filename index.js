const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

// Blocking, synchronous way

// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// const textOutput = `This is what we know about the avocoado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);

// console.log("File written");

// Non blocking
// fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
//   if (error) return console.log(`${error.message}🙂`);

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

const server = http.createServer((req, res) => {
  // console.log(req.url);

  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1 style={{backgroundColor: 'red'}}>Page not found!</h1>");
  }
  // res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
