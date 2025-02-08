const {Router} = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req,res)=>{

   const userId = req.userId;
   const courseId = req.body.courseId;

   //here you should check if the user has paid the price
   await purchaseModel.create({
    userId,
    courseId
   })

   res.json({
    message: "You have successfullly bought the course "
   })


})

courseRouter.get("/preview", async (req,res)=>{

    const courses = await courseModel.find({})

    res.json({
        courses
    })
    
})

module.exports = {
    courseRouter: courseRouter
}