import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            enum: ["pdf", "doc", "docx"],
            lowercase: true
        },
        version: {
            type: Number,
            default: 1
        },
        analysis: {
            score: { type: Number, default: 0},
            atsScore: {type: Number, default: 0},
            feedback: [String],
            strengths: [String],
            improvements: [String],
            missingKeywords: [String]
        },
        isPrimary: {
            type: Boolean, 
            default: false
        }
    },
    {timestamps: true}
);

resumeSchema.index({user: 1, createdAt: -1});

export default mongoose.model("Resume", resumeSchema);