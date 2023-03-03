import express from "express";
import cors from "cors"
import bodyParser from "body-parser";

import { createProduct, deleteProduct, showProduct,deleteAllProduct,updateProduct } from "./src/controllers/product.js";
const port = 3000
const host = "localhost"
const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("hello this is server")
})

app.get("/product/show",showProduct)
app.post("/product/create",createProduct)
app.delete("/product/:id",deleteProduct)
app.get("/product/all/",deleteAllProduct)
app.put("/product/update/",updateProduct)


app.listen(port,host,()=>{
    console.log(`server is listening on port ${host}:${port}`)
})