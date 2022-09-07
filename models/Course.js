import mongoose from 'mongoose';
import { boolean } from 'webidl-conversions';

const CourseSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    "video Url":{
        type:String,
    },
    "topics array":{
        type:[String],
    },
    duration:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        default:false,
    }
})

export default mongoose.model("Course",CourseSchema);