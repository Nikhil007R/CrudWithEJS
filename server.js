const express = require("express");
const app = express();
const path = require("path")
const userModel = require("./models/usermodel");
const { name } = require("ejs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res)=>{
    res.render("index");
})

// reading all users 
app.get("/read", async (req, res)=>{
    let allUsers = await userModel.find();
    res.render("users", {users: allUsers});
})

// creating user 
app.post("/create", async (req, res)=>{

    // destructuring req.body se 
    // let {name, email, image} = req.body;
    const createdUser = await userModel.create({
        // jo database mai jis naam se hai: jo hmaare form mai data jis naam se hai 
        // name: name,
        // email: email,
        // image: image

        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
    })

    res.redirect("/read")
    // res.send(createdUser)
})

app.get("/delete/:userid", async (req, res)=>{
    
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.userid})
    console.log(deletedUser);
    res.redirect("/read")
})

// getting data of a user which i select 
app.get("/edit/:userid", async (req, res)=>{
    let user = await userModel.findOne({_id: req.params.userid}, )
    console.log(user);
    res.render("edit", {user})
})

// changes that i need to do in a particular user 

app.post("/update/:userid", async (req, res)=>{
    // update :  findOneAndUpdate("find", "update new one", "new: true")
    let updatedUser = await userModel.findOneAndUpdate({_id: req.params.userid}, {name: req.body.name, email: req.body.email, image: req.body.image}, {new: true})

    // we can also do this by 
    // let {name, email, image} = req.body;
    // let updatedUser = await userModel.findOneAndUpdate({_id: req.params.userid}, {name, email, image}, {new: true})


    // res.send("User was Succesfully updated")
    res.redirect("/read")
})


app.listen(3000);