import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
{
    name: String,
    email: {
        type: String, 
        required: true,
        unique: true
        },
    password: String,
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    googleId: String,
    profilePic: String,
    bio: String,
    experienceLevel:{
        type: String, 
        enum: ["Student", "Entry-Level", "Junior", "Senior"],
        default: "Student"
    },
    targetRoles: [String],
    role: {
        type: String, 
        enum: ["admin", "user"],
        default: "user"
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailPrefernces: {
        analysisComplete: Boolean,
        scoreImprovement: Boolean
    },
    createdAt: Date,
    updatedAt: Date
}
);

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};



export default mongoose.model("User", userSchema);