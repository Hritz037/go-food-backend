const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db");
const cors=require("cors")
// app.use(cors({origin:'http://localhost:3000',
// methods:["GET","POST"],}))
mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://go-food.onrender.com",);
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
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})