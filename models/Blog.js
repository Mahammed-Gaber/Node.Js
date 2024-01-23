const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    // Blogs have title, body, photo, author, and tags

    title:{
        type: String,
        required: true, 
        unique: true,
        minLength: 5,
        maxLength: 20,
    },
    body:String,
    photo:String,
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tags:[{
        type:String,
        maxLength: 10 
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }, 
})

const Blog = mongoose.model('Blog', blogSchema);
Blog.createIndexes({ title: 1 });
Blog.createIndexes({ tags: 1 });
module.exports = Blog;