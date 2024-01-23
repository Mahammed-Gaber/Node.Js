const BlogController = require('../controllers/BlogController');
const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

// Upload ur files
const storeFiles = multer.diskStorage({
    destination : (req, file, callback)=> {
        callback(null, path.join(__dirname, '..', 'upload'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const ubload = multer( {storage: storeFiles} );


route.post('/add-blog', ubload.single('photo') , async (req, res)=> {
    let { title, body, tags, author } = req.body;
    let photo = new Date + req.file.filename;
    // console.log(tags);
    let data = await BlogController.createBlog(title, body, photo, tags, author);
    res.send('Blog added successfuly');
})

route.post('/search', async (req, res) => {
    let { title, tag } = req.body;
    try {

        console.log(req.body);
        let data = await BlogController.searchBlogs(title, tag);
        if (data) {
            // console.log(data);
            res.json(data);
        }
    } catch (error) {
        console.error(error);
    }
})


module.exports = route;