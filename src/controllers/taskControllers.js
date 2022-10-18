// Importamos el modelo
const tasksModels = require("../models/tasksModels");
const TaskModel = require("../models/tasksModels");
// Inicializamos el objeto CtrlTask
const ctrlTask = {};

ctrlTask.getTasks = async (req, res) => {
  try {
    const Tasks = await TaskModel.find();

    return res.json({
      message: "Tareas Encontradas.",
      Tasks,
    });
  } catch (error) {
    console.log(`Error, al encontrar la tarea: ${error}`);
  }
};
ctrlTask.getTasksByUser = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(req.params);
    const tasksUser = await TaskModel.find({ userId: id }, { description: 0 });
    return res.json(tasksUser);
  } catch (error) {
    console.log(`Error, no se pudo obtener la tarea: ${error}`);
  }
};

ctrlTask.postTask = async (req, res) => {
  try {
    const { title, description, isActive, userId } = req.body;
    const newTask = new TaskModel({
      title,
      description,
      isActive,
      userId,
    });

    const Task = await newTask.save();

    return res.json({
      message: "Tarea guardada correctamente.",
      Task,
    });
  } catch (error) {
    console.log(`Error, no se pudo guardar la tarea: ${error}`);
  }
};

ctrlTask.putTask = async (req, res) => {
  try {
    const id_task = req.params["idTask"];
    const idUser=req.user
    const { title, description, isActive } = req.body;
    const TaskAmodificar = {
      title,
      description,
      isActive,
    };
    if (TaskAmodificar.userId != idUser){
      return res.json({
        message: "No tienes permisos para modificar esta tarea.",
      });
    } 
  
    const TaskModificada = await TaskModel.findByIdAndUpdate(
      id_task,
      TaskAmodificar
    );
    return res.json({
      message: "Tarea modificada:",
      id_task,
      TaskModificada,
    });
  } catch (error) {
    res.status(404).send(`No se encuentra el ID: ${error}`);
  }
};

ctrlTask.deleteTask = async (req, res) => {
  try {
    const id_task = req.params["idTask"];
    
    TaskModel.findByIdAndDelete(id_task).exec();
    return res.json({
      message: "Tarea eliminada.",
      id_task,
    }); 
  
  } catch (error) {
    console.log(`Error, no se pudo eliminar la tarea: ${error}`);
  }
};

module.exports = ctrlTask;
