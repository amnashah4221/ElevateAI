import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
            trim:true,
            minlength: 2
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        subject: {
            type: String,
            required: true,
            trim: true
        },
        message: {
            type: String,
            required: true,
            minlength: 10
        },
    },
    {timestamps: true}
)
export default mongoose.model("Contact", ContactSchema);