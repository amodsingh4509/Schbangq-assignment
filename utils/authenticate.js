import jwt from "jsonwebtoken";

export const verifytoken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token)
    {
     res.status(404).send("Token Not Found");
    }
    jwt.verify(token,process.env.SCERET_KEY,(error,result)=>{
        if(error)
        {
            res.status(404).send("Invalid Token");
        }
        console.log(req.user)
        req.user = result;
        console.log(req.user)
        next();
    })
}
export const verifyAdmin = (req, res, next) => {
    verifytoken(req, res,() =>{ 
        if (req.user.role==="Admin") {
            next();
        }
        else
        {
           res.status(403).send("Not authorized");
        }
    });
}
export const verifySuperAdmin = (req, res, next) => {
    verifytoken(req, res,() =>{ 
        if (req.user.role==="Super Admin") {
            next();
        }
        else
        {
           res.status(403).send("Not authorized");
        }
    });
}
