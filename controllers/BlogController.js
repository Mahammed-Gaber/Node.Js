const Blog = require('../models/Blog');
const User = require('../models/User');


const createBlog = async (_title, _body, _photo, _tag, _author)=> {
    try {
        let data = await Blog.create({
            title: _title,
            body: _body,
            photo: _photo,
            tags: _tag,
            author: _author
        })
        if (data) {
            console.log("Blog was Added successfully", data)
        }
        else {
            console.log("error");
        }
    } catch (error) {
        console.log(error);
    }
}

const searchBlogs = async (_title, _tag) => {
    try {
        let data = await Blog.find({ $or: [{ title: _title }, { tags: _tag }] });
        if (data.length != 0) {
            let Blogs = await User.find({ _id: data[0].author }, {userName: 1 , _id: 0});
            console.log(Blogs, data);
            return data;
        }else{
            console.log('not found');
        }
    } catch (error) {
        console.error(error);
    }
}



module.exports = { createBlog, searchBlogs };