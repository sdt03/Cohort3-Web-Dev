const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://shoumikdaterao10:ThAq3zQa1wT9Nd8l@cluster0.9vggz.mongodb.net/Coursera-App")
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    ObjectId: ObjectId
});

const adminSchema = new Schema({
    email : {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    ObjectId: ObjectId
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: Number,
    ObjectId: ObjectId
});

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};