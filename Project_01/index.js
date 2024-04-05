const express = require("express");
// const users = require("./MOCK_DATA.json");
// const fs = require("fs");
const {connectMongoDB} = require('./connection.js');
const app = express();
const userRouter = require('./routes/user.route.js');
const {logReqRes} = require('./middleware/index.middleware.js');
const PORT = 8000;


// Connection
connectMongoDB("mongodb://127.0.0.1:27017/manveer-database")
.then(()=>console.log("Connected to MongoDB"))
.catch(err => console.error(`Error connecting to MongoDB: ${err}`))

// REST API
// app.get("/api/users", async(req, res) => {
//     const allDBUsers = await User.find({});
//     res.setHeader('myName', 'Manveer Singh') // your own HTTP header
//   return res.json(allDBUsers);
// });

// Middleware -Plugin
//we called middleware from here
app.use(express.urlencoded({extended: false})); 

app.use(logReqRes('log.txt'));

// //using middleware
// app.use((req,res,next)=>{
//     console.log("Hello from middleware1"); //this alone will result in an infinite loop
//     // return res.json({msg: "Hello from middleware1"}); // this will stop the infinite loop
//     next(); //if we don't use next() then we won't be able to see the users
// })


//second middleware
// app.use((req,res,next)=>{
//     console.log("Hello from middleware 2");
//     return res.end("Hey");
// })

app.use("/api/users", userRouter);


app.listen(PORT, () => console.log("Server is running on port 3000"));
