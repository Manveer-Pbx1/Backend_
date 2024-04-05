const User = require('../models/user.model.js');
async function handleGetAllUsers(req,res){
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function getUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user)
    return res.status(404).json({error: "User Not Found"});
return res.json(user);
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    return res.json({status: "success"});
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "deleted"});
    }

async function handleCreateNewUser(req,res){
    // TODO: Create new user
    const body = req.body;
    // users.push({...body, id: users.length + 1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
    //     return res.status(201).json({status: "success", id: users.length});
    // })
    if(!body.firstName || !body.email)
        return res.status(400).json({status: "error", message: "firstName and email are required"});
    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
    });
    // console.log(result);
    return res.status(201).json({msg: "success!",id: result._id});
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}