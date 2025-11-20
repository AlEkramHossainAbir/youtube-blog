const express= require("express");
const path = require("path")
const userRoute = require("./router/user")
const {connectDB} = require("./connect")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express()

const PORT = process.env.port || 3000;

connectDB('mongodb://127.0.0.1:27017/blogify')

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.use("/user",userRoute)

app.get("/", (req, res)=>{
    res.render("home",{
        user: req.user
    });
})
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
