const express=require('express')
const router=express.Router()
const Order=require("../models/Orders")

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    console.log("data",data)
    console.log("types",typeof data)
    // await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)
    // res.json({success:true})
    // if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email})    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            // console.log("1231242343242354",req.body.email)
            // data.date=req.body.order_date
            await Order.create({
                email: req.body.email,
                order_data:[{foodItems:data,date:req.body.order_date}]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            console.log("dub")
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data:{foodItems: data,date:req.body.order_date} }}).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrdersData',async(req,res)=>{
    try{
        // console.log(req.body.email)
        let myData=await Order.findOne({'email':req.body.email})
        res.json(myData.order_data)
    }catch(error){
        res.send("Server Error",error.message)
    }
})
module.exports=router;