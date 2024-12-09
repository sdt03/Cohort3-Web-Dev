const courseRouter = require("express").Router();
const { userAuthMiddleware } = require("../middleware/user");
const {purchaseModel, courseModel} = require("../db");

courseRouter.post("/purchases", userAuthMiddleware, async (req, res)=>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    });
    res.json({
        message: "You have succesfully purchased the course"
    });
});

courseRouter.get("/preview", async (req, res)=>{
    const courses = await courseModel.find({});

    res.json({
        courses
    });
});