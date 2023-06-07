console.log("Hello")

const express = require('express')
const app = express()

app.get('/posts' , (req,res)=>
{
    const posts = [
        {
            username: 'Kyle' , 
            title : 'Post 1'
        },
        {
            username: 'Jim' , 
            title : 'Post 2'
        }
    ]

    res.json(posts);



});