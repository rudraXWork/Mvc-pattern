const User = require("../models/user");

async function GetAllUsers(req,res){
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    } 
}

async function GetUsersById(req,res){
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function UpdateUsersById(req,res){
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // update with request body
            { new: true } // return updated document
        );
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.json({ status: "Success", user: updatedUser });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }

}

async function DeleteUsersById(req,res){
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    } 
}

async function CreateUserById(req,res){
    const body = req.body;
  
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
  
    try {
      await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
      });
  
      return res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Error creating user", error: err.message });
    }
}



module.exports={
    GetAllUsers,
    GetUsersById,
    UpdateUsersById,
    DeleteUsersById,
    CreateUserById,
}
    


