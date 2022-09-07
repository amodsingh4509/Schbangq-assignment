import express from 'express';
import jwt from 'jsonwebtoken'
import Employee from '../models/Employee.js'
import bcrypt from 'bcryptjs'
const routes = express.Router();


routes.post('/signup', async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newemployee = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: req.body.role,

    }
    try {
        const employee = await Employee.create(newemployee);

        var token = jwt.sign({ id: employee._id, role: employee.role }, process.env.SCERET_KEY);

        res.cookie("access_token", token).status(201).send("Signup successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

routes.get('/signin', async (req, res) => {

    try {
        const employee = await Employee.findOne({ email: req.body.email })
        console.log(employee.length)
        if (!employee) res.status(404).send("Email/password Invalid")

        const isvalid = bcrypt.compareSync(req.body.password, employee.password);
        if (!isvalid) res.status(404).send("Email/password Invalid")

        var token = jwt.sign({ id: employee._id, role: employee.role }, process.env.SCERET_KEY);

        res.cookie("access_token", token).status(200).send("Logged in successfully");


    } catch (errors) {
        res.status(500).send(errors);

    }


})

export default routes;