const { getTasks, postTask, putTask, deleteTask, getTasksByUser } = require('../controllers/taskControllers');


const TaskRouter = require('express').Router();
const validarJWT = require("../middlewares/validateJWT")

TaskRouter.get('/task', validarJWT, getTasks);

TaskRouter.get('/task/:userId', validarJWT,getTasksByUser);

TaskRouter.post('/task', validarJWT, postTask);

TaskRouter.put('/task/:idTask', validarJWT, putTask);

TaskRouter.delete('/task/:idTask', validarJWT, deleteTask)



module.exports = TaskRouter;