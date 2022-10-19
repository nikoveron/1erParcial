const { getTasks, postTask, putTask, deleteTask, getTasksByUser } = require('../controllers/taskControllers');


const TaskRouter = require('express').Router();
const validarJWT = require("../middlewares/validateJWT")

TaskRouter.get('/task', validarJWT, getTasks);

TaskRouter.get('/task/:userId', validarJWT,getTasksByUser);

TaskRouter.post('/task', validarJWT, postTask);

TaskRouter.put('/task/:id', validarJWT, putTask);

TaskRouter.delete('/task/:id', validarJWT, deleteTask)



module.exports = TaskRouter;