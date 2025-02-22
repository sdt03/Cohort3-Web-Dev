import connectDB from "./db.service";
import mongoose, {model, Schema} from 'mongoose';

connectDB();

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
});

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: 'True'},
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true},
})

const TagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

export const UserModel = model("User", UserSchema);
export const TagModel = model("Tag", TagSchema);
export const LinkModel = model("Link", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
