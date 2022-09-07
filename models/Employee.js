import mongoose from 'mongoose';

const Employeeschema = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password: {
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin', 'Super Admin','Employee'],
        default:'Employee'
    }

})

export default mongoose.model('Employee',Employeeschema);