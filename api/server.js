// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express()

server.use(express.json())

server.get('/api/users', (req,res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "The users information could not be retrieved"})
        })
})

server.get('/api/users/:id', (req, res) => {
    const idVar = req.params.id
    Users.findById(idVar)
        .then(user => {
            if(!user){
               res.status(404).json({message: "The user with the specified ID does not exist"}) 
            }else{
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({message: "The user information could not be retrieved"})
        })
})

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio) {
        res.status(400).json({message: "Please provide name and bio for the user"})
    }else{
        Users.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({message: "There was an error while saving the user to the database"})
            })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const idVar = req.params.id;
    const changes = req.body;
    try{
        if(!changes.name || !changes.bio){
            req.status(400).json({message: "Please provide name and bio for the user"})
        }else{
            const updatedUser = await Users.update(idVar, changes)
            if(!updatedUser){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }else{
                res.status(200).json(updatedUser)
            }
        }
    }catch(err){
        res.status(500).json({message: "The user information could not be modified"})
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try{
        const idVar = req.params.id
        const deletedUser = await Users.remove(idVar);
        if(!deletedUser){
            res.status(404).json({message: "The user with the specified ID does not exist"})
        }else{
            res.status(201).json(deletedUser);
        }
    }catch(err){
        res.status(500).json({message: "The user could not be removed"})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
