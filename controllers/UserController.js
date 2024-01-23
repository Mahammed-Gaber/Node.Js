const User = require("../models/User");
const bcrypt = require('bcrypt');
const Blog = require('../models/Blog')



const Register = async ( _userName, _email, _password, _follower) => {
    try {
        let data = await User.create({ userName : _userName, email :_email, password:_password, follower: _follower});
        if (data) {
            console.log("user was registered successfully", data)
        }
        else {
            console.log("error");
        }
    }
    catch (e) {
        console.log(e);
    }
}

const Login = async (user , pass) => {
    try {
        let data = await User.findOne({userName: user});
        if (data) {
            const passwordMatch = await bcrypt.compare(pass, data.password);

            if (passwordMatch) {
                console.log('Success');
                return data;
            } else {
                console.log('Invalid password');
            }
        } else {
            console.log('User not found');
        }
        
    } catch (error) {
        console.log(error);
    }
}

const findUserByName = async (_userName) => {
    try {
        let data = await User.findOne({userName: _userName}, {_id:1});
        if (data) {
            // let useBlogs = await Blog.aggregate([{$match: {author: data._id}}])
            let userBlogs = await Blog.find({author: data._id})
            console.log("Done");
            return userBlogs;
        }
    } catch (error) {
        
    }
}


// Return the first name of registered users 
const GetAllUsers = async ()=>{
    try {
        let data = await User.find( {} , {userName: 1});
        if (data.length != 0) {
            console.log("Done", data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
} 

// editUser(email, editvalue) 
const UpdateUser= async (_email, editEmail) =>{
    try {
        let data = await User.findOneAndUpdate(
            {email: _email},
            {email: editEmail}
            );
            if (data) {
                console.log('user was edited successfully', data);
            }
    } catch (error) {
        console.log(error);
    }
}


// Delete the user  
const DeleteUser = async (_email)=>{
    try {
        let data =await User.deleteOne({email: _email});
        if(data){
            console.log('Deleted Succesfully');
        }
    } catch (error) {
        console.log(error);
    }
}






module.exports = { Register, Login, findUserByName, GetAllUsers, UpdateUser, DeleteUser};