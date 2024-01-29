const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const mongoDB=require("./db");
const cors=require("cors")
// app.use(cors({origin:'http://localhost:3000',
// methods:["GET","POST"],}))
mongoDB();

app.use((req,res,next)=>{
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://go-food-smyf.onrender.com",
    // 'http://localhost:3000'
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
// app.use(cors({
//   origin:["http://localhost:3000","https://go-food.onrender.com"]
// }));
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.use('/api',require("./Routes/GeoLocation"))

app.get('/', (req, res) => {
  res.json({PORT:PORT})
})
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})