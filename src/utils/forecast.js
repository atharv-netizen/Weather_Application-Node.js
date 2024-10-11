const request=require("request");
const forecast=(latitude,longitude,callback)=>{ // change parameters
    const url="http://api.weatherstack.com/current?access_key=ddba023d6ac6764ab046130a869f88f0&query=" + latitude + "," + longitude;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather services!",undefined);
        }
        else if(body.error){
            callback("Invalid location. Please try again!",undefined);
        }
        else{ 
            callback(undefined, body.current.weather_descriptions + " .Outside temp is: "+body.current.temperature +" degrees,but it feels like: " + body.current.feelslike + " degrees.There is a "+ body.current.precip + "% chance of rain");
        }
        
    })
}
module.exports=forecast;