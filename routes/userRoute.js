const userController = require('../controllers/UserController');
const express = require('express');
const route = express.Router();
const JWT = require('jsonwebtoken');

const secret_key = 'Top Secret';

// route.get('/', (req, res) => {
//     res.send('hi in user route')
// })

route.post('/register', async (req, res)=> {
        let {userName, email, password} = req.body;
        bcrypt.hash(password, 10, async (err, hash)=>{
            let data = await userController.Register(userName , email, hash);
            // res.json(data); we cant't receve two res
            res.send('user registered sucessfully ');
        })
})

route.post('/login', async (req, res) => {
    let {userName, password} = req.body;
    try {
        let data = await userController.Login(userName, password);

        if (data) {
            let token = JWT.sign(req.body, secret_key);
            res.send(`Welcome ${userName}`);
            // console.log(req.headers);
        } else {
            res.status(401).json({ message: 'Unauthorized: User not found or invalid credentials' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

route.post('/search', async (req, res) => {
    let { userName } = req.body;
    try {

        let data = await userController.findUserByName(userName);
        if (data) {
            // console.log(data);
            res.json(data);
        }
    } catch (error) {
        console.error(error);
    }
})

route.get('/show-users', async (req, res)=> {
    try {
        let data = await userController.GetAllUsers();
        if (data != "error") {
            res.json({
                users: data,
                msg: "ok",
                status: 200
            });
        }
    } catch (error) {
        
    }
})

route.patch('/update-user/:id', async (req, res)=>{
    let {...email} = req.body;
    let data = await userController.UpdateUser(email.email[0], email.email[1]);
    res.send('done updated user')
    console.log(email.email[0]);
})

route.get('/delete-user', async (req, res)=> {
    let email = req.body;
    let data = await userController.DeleteUser(email.email);
    res.send('User deleted sucssecfully');
})



module.exports= route;