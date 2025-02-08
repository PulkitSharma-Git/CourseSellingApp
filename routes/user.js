const {Router} = require("express")
const bcrypt = require("bcrypt")
const {signupSchema , signinSchema} = require("../zod")
const userRouter = Router();

const {userModel, purchaseModel, courseModel} = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config");
const { userMiddleware } = require("../middlewares/user");


userRouter.post("/signup", async (req,res)=>{

    try{
        //Zod validation
        // const zodvalidation = signupSchema.safeParse(req.body);
        // if(!zodvalidation.success){
        //     const validationErrors = result.error.errors.map(err => err.message);
        //     return res.status(400).json({ message: 'Zod Validation failed', errors: validationErrors });

        // }
        //

        const { email, password, firstName, lastName } = req.body;

        const saltRounds = 2;
        const hashedPassword = await bcrypt.hash(password , saltRounds);


    await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    
    res.status(200).json({
        status:200,
        message: "Signup user Successfull"
    })

    }catch(err){
        if(err.name == "ValidationError"){
            const errors = Object.values(err.errors).map(el => el.message); //Extracted error message
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

userRouter.post("/signin", async (req,res)=>{

    try{
        // const zodvalidation = signinSchema.safeParse(req.body);
        // if(!zodvalidation.success){
        //     const validationErrors = result.error.errors.map(err => err.message);
        //     return res.status(400).json({ message: 'Zod Validation failed', errors: validationErrors });

        // }


    const {email, password} = req.body;
        
    const user = await userModel.findOne({ //findOne return either admin or undefined
        email: email,                        //find return empty arrray which is true in itself
    })

    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        return res.status(400).send({
            message: "Incorrect email or password"
        })
    }

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

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
        if(err.name == "ValidationError"){
            const errors = Object.values(err.errors).map(el => el.message); //Extracted error message
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

userRouter.get("/purchases" , userMiddleware , async (req,res)=>{
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })

    let purchasedCourseIds = [];

    for(let i =0 ; i<purchases.length ; i++){
        purchasedCourseIds.push(purchases[i].courseId)
    }
    
    const courseData = await courseModel.find({
        _id: {$in: purchasedCourseIds}

    })
    res.json({
        purchases,
        courseData
    })

    
})

module.exports = {
    userRouter: userRouter
}