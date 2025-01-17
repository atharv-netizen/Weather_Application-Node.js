const path=require("path");
const express=require("express");
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");




const app=express();
const publicDirectoryPath=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

app.set("view engine", "hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Atharv"

    })

})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Atharv"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Welcome to Help Page",
        msg:"Please tell us about your query and we will try to solve it",
        name:"Atharv"
    })
})
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
    
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Atharv",
        msg:"Help article not found"
    })
})


app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide a location!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}= {} )=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
            return res.send({
                error:"error"
            })
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
    })

})
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Atharv",
        msg:"Page not found"

        })
})

app.listen(3000 ,()=>{
    console.log("Server is up and running on port 3000");
})