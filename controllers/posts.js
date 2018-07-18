const express = require('express')
const router = express.Router(); 
const Posts = require('../models/posts.js')

//INDEX ROUTE
router.get('/', (req, res) =>{
    Posts.find({}, (err, foundPosts)=>{
        res.json(foundPosts); 
    }); 
}); 

//DELETE 
router.delete('/:id', (req, res)=>{
    Posts.findByIdAndRemove(req.params.id, (err, deletedPosts)=>{
        res.json(deletedPosts); 
    }); 
}); 

//CREATE ROUTE
router.post('/', (req, res)=>{
    Posts.create(req.body, (err, createdPosts)=>{
        res.json(createdPosts); 
    }); 
}); 

//UPDATE ROUTE
router.put('/:id', (req, res)=>{
    Posts.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPosts)=>{
        res.json(updatedPosts); 
    }); 
}); 

module.exports = router; 
