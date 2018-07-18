const express = require('express')
const router = express.Router(); 
const Posts = require('../models/posts.js')

//INDEX ROUTE
router.get('/', (req, res) =>{
    Posts.find({}, (err, foundPosts)=>{
        res.json(foundPosts); 
    }); 
}); 

//CREATE ROUTE
router.post('/', (req, res)=>{
    Posts.create(req.body, (err, createdPosts)=>{
        res.json(createdPosts); 
    })
})
