const request=require("request");
const geocode=(address,callback)=>{
    const url="https://geocode.maps.co/search?q=" + encodeURIComponent(address) + "&api_key=66de8a93ca00c506551127gmx86d3ff&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect to weather services!",undefined);
        }
        else if(body.length===0){
            callback("Invalid location. Please try another search!", undefined);
        }
        else{
            callback(undefined,{
                latitude: body[0].lat,
                longitude: body[0].lon,
                place: body[0].display_name
            })
        }
    })
    }
module.exports=geocode;