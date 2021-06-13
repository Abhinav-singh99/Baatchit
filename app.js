const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const multer= require('multer')
const path = require("path")
const userSchema = require('./schema/user_schema')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const cookieParser= require("cookie-parser")

const http = require('http');
const socketio = require('socket.io');
const { Socket } = require("dgram")

const participants = {};
const app = express();
const server = http.createServer(app);
const PORT= process.env.PORT||3000;
const io = socketio(server);

let abc;
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/erp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function () {
    console.log('connection successful')
})

// socket connection
var flag;
var profile={}
io.on('connection', (socket) => {
    var c = (socket.id)
    console.log(c);

    participants[socket.id] = abc;
     profile[abc]=img;


    console.log(participants);




    socket.on("new_user_joined", d => {
        

        io.emit('temp', { participants, userid: c ,profile});




        var name = abc;
        console.log(d.user)



    })





    // private messaging
    socket.on('firstprivate', data => {
        var id = data.activeUserId;
        var username = data.username;
        socket.emit("firstprivatelyto", { id: id, username: username });

    })
    socket.on("private", data => {
        var id = data.activeUserId;
        console.log(id);

        var username = data.username;
        console.log(username)
        socket.emit("privatelyto", { id: id, username: username })
    })
    socket.on("sendprivately", data => {

        socket.to(data.id).emit("recieveprivately", { message: data.message, sendername: participants[socket.id] })

    })


    socket.on('disconnect', () => {
        var user = participants[socket.id]
        var idx = arr.indexOf(user);
        if (idx != -1) {
            arr.splice(idx, 1);
        }
        delete participants[socket.id];
        var userid = socket.id
        io.emit('temp', { participants, userid,profile });

    })
    socket.on("send", message => {
        socket.broadcast.emit('receive', { message: message, name: participants[socket.id] });
    })



})



app.post('/signup', async function (req, res) {

    const user = new userSchema({
        username: req.body.username,
        password: req.body.password,

        email: req.body.email

    })

    const token= await user.generateAuthToken();
    await user.save();
    res.cookie("jwt",token,{
        httpOnly:true
    })

    //password hash


    var registered = await user.save(function (err, doc) {
        if (err) {
            res.sendFile(path.join(__dirname+"/public/signup_error.html"))
        }
        else {
            console.log("inserted succesfully");
            res.redirect("/")
        }
    })


})




app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"))
})
app.post("/logout", (req, res) => {
    res.redirect("/")

})
var arr = [];

app.post("/signin", async (req, res) => {
    try {
        const password = req.body.password;

        const email = req.body.email;

        const useremail = await userSchema.findOne({ email: email });

        const ismatch = await bcrypt.compare(password, useremail.password);
        const token= await useremail.generateAuthToken();
        res.cookie("jwt",token,{
            httpOnly:true
        })
        console.log(token)

        console.log(useremail)
        var i;
        for (i = 0; i < arr.length; i++) {

            if (arr[i] === req.body.username) {
                flag = 0;
                
                console.log(flag)
            }
            else {
                flag = 1;
               
                console.log(flag)
            }
        }

        if (ismatch && flag != 0 &&useremail.username===req.body.username) {

            abc = useremail.username;
            arr.push(abc);
            if(!useremail.imageUrl){
                img="/images/download.jpg"
            }else{
                img=path.join("/uploads/"+useremail.imageUrl)
            }

            res.sendFile(path.join(__dirname + "/home.html"));




        }
        else {
           res.sendFile(path.join(__dirname+"/public/error.html")) 
        }


    } catch (error) {
        res.send("invalid credentials")
    }

})
// profile image 
var storage=multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{

        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }

})
var upload=multer({
    storage:storage

}).single("file");
const auth = async (req,res,next)=>{
    const token = req.cookies.jwt;
    const verifyuser= jwt.verify(token,process.env.SECRET_KEY)
    const part= await userSchema.findOne({_id:verifyuser._id}) 
    abc=part.username
    console.log(part)

next()


}
const  save= async (req,res,next)=>{
    try{
        var imageFile=req.file.filename;
        const token = req.cookies.jwt;
        const verifyuser= jwt.verify(token,process.env.SECRET_KEY)
        
        console.log(verifyuser._id)
        const useremail = await userSchema.findOne({_id:verifyuser._id});
        console.log(useremail)
        useremail.imageUrl=imageFile;
        useremail.save(function(err,doc){
            if(err){
                res.send("err");
            }else{
                img=path.join("/uploads/"+useremail.imageUrl);
                next();
            }
        })
        
    }catch{
        res.send("error")
    }
    
    
}
var img;
app.post("/upload",[upload,save,auth],  function(req,res){
    
    res.redirect("/signin")
   
})
app.get("/signin",function(req,res){
    res.sendFile(path.join(__dirname+"/home.html"))
})
// delete profile
app.post("/delete",auth,async function(req,res){
    const token = req.cookies.jwt;
    const verifyuser= jwt.verify(token,process.env.SECRET_KEY)
    
    console.log(verifyuser._id)
    const useremail = await userSchema.findOne({_id:verifyuser._id});

    useremail.imageUrl="/images/download.jpg"
    useremail.save(function(err,doc){
        if(err){
            res.send("err");
        }else{
            img="/images/download.jpg"
            
        }
    })
    res.redirect("/signin")

})


server.listen(PORT, () => {
    console.log("server is running");
})