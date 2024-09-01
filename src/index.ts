import { app } from "./app"
import connectDB from "./db/db"
import dotenv from "dotenv"

dotenv.config({path: './.env'})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is runnning on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo DB Connection failed !!",err);
})