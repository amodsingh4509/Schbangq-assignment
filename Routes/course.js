import express from 'express';
import Course from '../models/Course.js'
import { verifyAdmin, verifySuperAdmin, verifytoken } from '../utils/authenticate.js';

const routes = express.Router();


routes.post('/new',verifyAdmin,async(req,res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).send("Course Added sucessully")
    } catch (error) {
        res.status(500).send(error);
        
    }

})
routes.put('/update/:id',verifyAdmin,async (req,res) => {
    req.body.approved=false;
    try {
        const course = await Course.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).send("Course Updated");
    } catch (error) {
        res.status(500).send(error);
        
    }
    
})
routes.delete('/:id',verifyAdmin,async (req,res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.status(200).send("Course Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
    
})
routes.get('/approve',verifySuperAdmin,async(req,res)=>{
    try {
        const course = await Course.find({approved:false});
        res.status(200).json(course);
    } catch (error) {
        res.status(500).send(error);
    }

})
routes.put('/approve/:id',verifySuperAdmin,async(req,res)=>{
    try {
        await Course.findByIdAndUpdate(req.params.id,{approved:true});
        res.status(200).send("Course Approved");
    } catch (error) {
        res.status(500).send(error);
    }

})
routes.get('/',verifytoken,async(req,res)=>
{
    console.log("Role is ",req.user.role)
    if(req.user.role==="Employee")
    {
        try {
            const course = await Course.find({approved:true});
            res.status(200).json(course);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    else{
        try {
            const course = await Course.find();
            res.status(200).json(course);
        } catch (error) {
            res.status(500).send(error);
        }
    }
})
routes.get('/sort/',verifytoken,async(req,res)=>{
    console.log(req.query)
    if(req.query.category)
    {
        try {
            const course = await Course.find({category:req.query.category});
            res.status(200).json(course);
        } catch (error) {
            res.status(500).send(error);
        }

    }
})

export default routes;