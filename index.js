const express = require("express");
const app = express();
const PORT = 8000;

const userRouter = require('./routes/user')
const { connectMongoDb } = require('./Db/db')

const {logReqRes,homeMiddleware } = require("./middlewares/index")

// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/users");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging Middleware
app.use(logReqRes("log.txt"));
app.use( '/', homeMiddleware);

//routes
app.use("/user",userRouter)





// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/user`);
});








