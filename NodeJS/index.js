//let's create our own http server

const http = require("http");
const fs = require("fs");
const express = require("express");

const app = express(); //here app is basically a handler function

app.get('/', (req,res)=> {
  return res.send('hello from homepage')
})

app.get('/about', (req,res)=>{
  return res.send(`hello ${req.query.name} from about page`);
})
function myHandler(){
  if(req.url === '/favicon.ico')
        return res.end();
    
  const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`; //there are two requests, one for favicon.ico and one for localhost:3000
  //why for favicon.ico? because the browser is trying to load the favicon.ico for the page and if we don't have it, it will keep on sending requests
  const myUrl = url.parse(req.url,true); //check this out
  console.log(myUrl); //check the console by entering a query
//1
  fs.appendFile("log.txt", log, (err, data) => {
    if (err) throw err;
    console.log("Log updated!");
    // switch(req.url){
    //     case '/': res.end("Homepage");
    //     break
    //     case '/about': res.end("Yo, I am Manveer");
    //     break;
    //     default:
    //     res.end("404, Not Found");
    // }
  });
  // console.log(req.headers); //check what req dot carries and what all you can do with it
  console.log("New request received!");

}
const myServer = http.createServer(app);
//we need a port to listen. a port is like a portal or a door
myServer.listen(3000, () => {
  console.log("Server started!");
});
//try entering localhost:3000 in your browser

//2 Handling URLs
//url: http://localhost:3000/about
// here https is the protocol, localhost is the domain, 3000 is the port and /about is the path
//query parameter for example  ?name=manveer&age=21 would be added as & after /about
//example of query parameter: https://www.youtube.com/watch?v=Nt-AsZh5woE&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=8 
//here the query parameter is v, list and index are not used because we only have one element in the list 
//lets download url package from npm, the url package helps us to parse the url and get the query parameters
//how to identify a query? it starts with a ? and then the key value pairs are separated by & and the key and value are separated by =
//3 HTTP Methods
//GET, POST, PUT, DELETE, PATCH
// GET is used to get data from the server, POST is used to send data to the server, PUT is used to update data, DELETE is used to delete data, PATCH is used to partially update data
//why do we use express? because it makes it easier to handle different routes and different methods
//the need for EXPRESS framework: 1. the code gets very confusing and hard to manage 2. we have to write a lot of code to handle different routes and methods 3. we have to write a lot of code to handle errors

//4 EXPRESS