// See our full nodejs tutorial:
// https://opencagedata.com/tutorials/geocode-in-nodejs
//
// npm install opencage-api-client
require('dotenv').config()
const apikey=process.env.OPENCAGE_API_KEY;
const express = require('express')
const router = express.Router()
const opencage = require('opencage-api-client');
const axios = require('axios')
router.post('/getlocation',async(req,res)=>{
    try{
        let lat = req.body.latlong.lat
        let long = req.body.latlong.long
        // let lat=12.90813692547852
        // let long=77.59239979815052
        // console.log(lat, long);
        // location=" "
        // opencage.geocode({ q: {lat,long}, language: 'en' }).then((data) => {
        //     console.log(JSON.stringify(data, null, 2));
        //     // { "components": { "house_number": "1330", "road": "Middle Avenue", "postcode": "94025", "town": ...
        //     console.log("data",data.results)
        //     if (data.status.code == 200 && data.results.length > 0) {
        //         console.log(data.results.length)
        //       console.log(data);
        //     //   return data
        //     location=data.results[0].formatted

        //     //   return data.results[0].formatted;
        //       // "1330 Middle Avenue, Menlo Park, Californie 94025, États-Unis d'Amérique"
        //     }
        //   });
        let c="https://api.opencagedata.com/geocode/v1/json?q=" + lat + "%2C" + long + "&key="+apikey
        console.log(c)
        let location = await axios
        .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "%2C" + long + "&key="+apikey)
        .then(async (res) => {
            // console.log(`statusCode: ${res.status}`)
            // console.log(res.data)
            // let response = stringify(res)
            // response = await JSON.parse(response)
            // let response = res.data.results[0].components;
            let response = res.data.results[0].formatted
            // console.log(response)
            // let { village, county, state_district, state, postcode } = response
            // return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
           
            return response
        })
        .catch(error => {
            console.error(error)
        })
        
    res.send({ location })

} catch (error) {
    console.error("Error prin",error.message)
    console.log(error.status)
    res.send("Server Error")

}
       
    });



// opencage.geocode({ q: '3629 Yale Street, Vancouver, CA' }).then((data) => {
//   console.log(data.results[0].geometry);
//   // { "lat": 49.2909409, "lng": -123.024879 }
// }).catch((error) => { console.warn(error.message) };
module.exports=router;