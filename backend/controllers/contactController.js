import ContactModel from "../models/Contact.model.js";

export const submitContact = async (req, res)=> {
    try{
        const {name, email,subject, message} = req.body;

        if(!name || !email || !subject || !message){
            return res.status(400).json({message: "All fields are required"});
        }

        const newContact = new ContactModel({
            name, email, subject, message
        })
        await newContact.save();
        res.status(201).json({
            success: true, 
            message: "Message sent successfully"
        })
    }
    catch(error){
        res.status(500).json({message: "Server Error"})
    }
}