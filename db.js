const mongoose = require('mongoose');
require('dotenv').config();
const mongouri = process.env.MONGO_URI;
const mongoDB = () => {
    // mongoose.connect(mongouri,()=>{
    //     console.log("Connected");
    // });
    mongoose.connect(mongouri, { useNewUrlParser: true })
        .then(() => {
            console.log("Connected Successfully");
            const fetched_data = mongoose.connection.db.collection("food_items");
            return fetched_data;
        })
        .catch((err) => console.log(err))
        .then((fetched_data) => fetched_data.find({}).toArray())
        .catch((err) => { console.error(err); })
        .then(data=> {
                    global.food_items = data;
                    const foodCategory= mongoose.connection.db.collection("foodCategory");
                    // console.log("hi", global.food_items[0].options);
                    return foodCategory
            }).then((fetchedCatData)=>fetchedCatData.find({}).toArray())
            .then(catData=>{
                global.foodCategory=catData;
                // console.log(global.foodCategory);
            })
            .catch((error)=>{
                console.log(error);
            })
       
        
}
// const mongoDB=async()=>{
//     await mongoose.connect(mongouri,()=>{
//         console.log("Connected");
//     });
// }
module.exports = mongoDB;