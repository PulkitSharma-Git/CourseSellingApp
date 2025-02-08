const {Router} = require("express");
const bcrypt = require("bcrypt")
const adminRouter = Router();
const {adminModel} = require("../db");
const {courseModel} = require("../db")
const {signupSchema , signinSchema} = require("../zod")
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMiddleware } = require("../middlewares/admin");



adminRouter.post("/signup", async (req,res)=>{
    try{
        // const zodvalidation = signupSchema.safeParse(req.body);
        // if(!zodvalidation.success){
        //     const validationErrors = result.error.errors.map(err => err.message);
        //     return res.status(400).json({ message: 'Zod Validation failed', errors: validationErrors });

        // }

        const {email, password, firstName, lastName} = req.body;        
        const saltRounds = 2;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "Signup Successfull"
        })
    }catch(err){
        if (err.name === 'ValidationError') {
            // Handling Mongoose validation errors
            const errors = Object.values(err.errors).map(el => el.message);  // Extract error messages
            return res.status(400).send(
                { message: 'Validation failed', errors }
            );
          }
          // If it's not a validation error, handle it generically
            return res.status(500).send(
                { message: 'Server error', error: err.message }
        );

    }

})

adminRouter.post("/signin", async (req,res)=>{

    try{
        // const zodvalidation = signinSchema.safeParse(req.body)

        // if(!zodvalidation.success){
        //     const validationErrors = result.error.errors.map(err => err.message);
        //     return res.status(400).json({ message: 'Zod Validation failed', errors: validationErrors });
        // }

        const {email, password} = req.body;
    
        //ideally password should be hashed
        const admin = await adminModel.findOne({ //findOne return either admin or undefined
            email: email,                        //find return empty arrray which is true in itself
        })

        const isMatch = await bcrypt.compare(password, admin.password)
        if(!isMatch){
            return res.status(400).send({
                message: "Incorrect email or password"
            })
        }
    
        if(admin){
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD)
    
            //do cookie logic
    
            res.json({
                token : token
            })
        }else{
            res.status(403).json({
                message: "Incorrect credentials"
            })
        }

    }catch(err){
        if (err.name === 'ValidationError') {
            // Handling Mongoose validation errors
            const errors = Object.values(err.errors).map(el => el.message);  // Extract error messages
            return res.status(400).send(
                { message: 'Validation failed', errors }
            );
          }
          // If it's not a validation error, handle it generically
            return res.status(500).send(
                { message: 'Server error', error: err.message }
        );

    }
   
})

adminRouter.post("/course" , adminMiddleware, async (req,res)=>{
    const adminId = req.userId;

    const {title, description , price, imageUrl} = req.body;


    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "Course Created ", 
        courseId: course._id 
    })



})

adminRouter.put("/course" ,adminMiddleware,  async (req,res)=>{
    const adminId = req.userId;

    const {title, description , price, imageUrl, courseId} = req.body;


    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
    })

    res.json({
        message: "Course Updated ", 
        courseId: course._id 
    })
})



adminRouter.get("/course/bulk" ,adminMiddleware, async  (req,res)=>{ //Not working properly...returning empty list 
    const adminId = req.userId;
    console.log(adminId)

    const courses = await adminModel.find({
        creatorId: adminId 
    })

    
    res.json({
        message: "These are your courses",
        courses
    })
    
})

module.exports = {
    adminRouter: adminRouter
}