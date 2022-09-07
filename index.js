import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import employee from './Routes/employee.js'
import cookieParser from 'cookie-parser';
import course from './Routes/course.js'

const app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/employee',employee);
app.use('/course',course);
const port = process.env.PORT || 4000;

app.use(express.json());

const connect = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL);
         console.log('Connected to MongoDB');
        
    } catch (error) {
        throw error;
    }
   
}
connect();
mongoose.connection.on("disconnect", () => {
    console.log('Disconnected from MongoDB');
})

mongoose.connection.once("connected", () => {
    console.log('Connected to MongoDB');
})
app.get('/', (req,res) => {
    

    res.status(200).send("Api is working");
})


app.listen(port,() => {console.log("Server listening on port " + port)});