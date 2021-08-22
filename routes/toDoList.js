const express=require('express');
const mongoose=require('mongoose');
const ToDoList = require('../models/toDoList');

var app =express.Router();

app.get('/',async (req,res) =>{
    await ToDoList.find().then((snap) =>{
        if(snap.length > 0){
            return res.status(200).json({
                message: "retrieved succesfully",
                data: snap
            });
        }else{
            return res.status(400).json({
                message: "empty collection",
            });
        }
    }).catch((error) => {
        console.log('test1')
        return res.status(500).json({
            message: "erro while retrieving",
            error: error
        });
    });
});

app.get('/find_create',async (req,res) =>{
    let title = req.query.title;

    if(!title){
        return res.status(400).json({
            message: "required title"
        })
    }
    await ToDoList.findOne({"title": req.query.title}).then((data)=>{
        if(data){
            return res.status(200).json({
                message: "toDo Liste retrives",
                data: data
            });
        }else{
            let toDoList = new ToDoList({
                title : req.query.title
            });
            toDoList.save().then((toDo)=>{
                return res.status(200).json({
                    message: "toDo Liste created successfully",
                    data: toDo
                })
            }).catch((error) =>{
                console.log(error);
                return res.status(400).json({
                    message:"error"
                })
            })
        }
    }).catch((error)=>{
        return res.status(400).json({
            message: "error server",
            error: error
        })
    })
})

app.post('/todo/create', async (req,res) =>{
    let name = req.body.name;
    let list_id = req.body.list_id;
    if(!name && list_id){
        return res.status(400).json({
            message: "required name and toDo list id"
        })
    }
    ToDoList.findById(list_id).then((toDoList)=>{
        if(toDoList){
            toDoList.toDos.push({"name":name});
            toDoList.save().then((data)=>{
                return res.status(200).json({
                    message: "toDo created successfully",
                    data: data
                })
            }).catch((error)=>{
                console.log(error)
                return res.status(400).json({
                    message: "erro",
                    error: error
                })
            })
        }else{
            return res.status(400).json({
                message: "toDo List not found"
            })
        }
    }).catch((error)=>{
        return res.status(400).json({
            message: "error server",
            error: error
        })
    })

})

app.post('/todo/delete', async (req,res) =>{
    let list_id = req.body.list_id;
    let todo_id = req.body.todo_id;

    if(!list_id){
        return res.status(400).json({
            message: "required todo List id"
        })
    }

    ToDoList.findById(list_id).then((toDoList)=>{
        if(toDoList){
            if(toDoList.toDos.id(todo_id)){
                toDoList.toDos.id(todo_id).remove((error)=>{
                    if(error){
                        return res.status(400).json({
                            message: "error"
                        })
                    }
                })
                toDoList.save().then((data)=>{
                    return res.status(200).json({
                        message: "toDo deleted successfully",
                        data: data
                    })
                }).catch((error)=>{
                    return res.status(400).json({
                        message:"error when updated todo list",
                        error: error
                    })
                })
            }else{
                return res.status(400).json({
                    message: "toDo not found"
                });
            }
        }else{
            return res.status(400).json({
                message: "toDo list not found"
            });
        }
    })
})
module.exports = app;