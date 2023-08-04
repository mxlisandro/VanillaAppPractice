const toDo = require('../models/todoModel')

const toDoController = {}

toDoController.getList = async (req, res, next) => {
    console.log(req.cookies)
    const ssid = req.cookies.ssid
    res.locals.toDoData = await toDo.find({ssid})
    return next()
}

toDoController.saveNew = async (req, res, next) => {
    console.log(req.body)
    console.log(req.cookies)
    const {text} = req.body
    const ssid = req.cookies.ssid

    toDo.create({text, ssid})
    .then((data)=>{
        console.log("Addded successfully");
        console.log(data);
        return next()
    }).catch((err)=>{
        console.log("Errorr encountered in toDoController.saveNew", err)
        return next(err);
    })
}

toDoController.updateToDo = async (req, res, next) => {
    const {_id, text} = req.body

    toDo.findByIdAndUpdate(_id, {text})
    .then((data)=>{
        console.log("Updated successfully")
        console.log(data)
        return next()
    })
    .catch((err)=>{
        console.log(err)
    })
}

toDoController.deleteToDo = async (req, res, next) => {
    console.log(req.body)
    const {_id} = req.body
    console.log(_id)

    toDo.findByIdAndDelete(_id)
    .then((data)=>{
        console.log("Deleted successfully")
        console.log(data)
        return next()
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = toDoController