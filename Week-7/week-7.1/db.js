const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    name: String
});

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
});

const userModel = mongoose.model('users', User);
const todoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel: userModel,
    TodoModel: todoModel
}