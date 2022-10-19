// Importamos el modelo

const TaskModel = require("../models/tasksModels");
// Inicializamos el objeto CtrlTask
const ctrlTask = {};

ctrlTask.getTasks = async (req, res) =>{
  const obtenerTarea = await TaskModel.find({userId: req.user._id, isActive: true})

  res.json(obtenerTarea)
}


ctrlTask.getTasksByUser = async (req, res) => {
  const obtenerTarea = await TaskModel.find({userId: req.user._id, isActive: true})

  res.json(obtenerTarea)
}



ctrlTask.postTask = async (req, res) => {
  const {title, description} = req.body

  const nuevaTarea = new TaskModel({
      title,
      description,
      userId: req.user._id
  })

  const guardarTarea = await nuevaTarea.save();

  if(!guardarTarea){
      res.json("No se pudo crear la tarea")
  }

  res.json("Tarea creada")
}

ctrlTask.putTask = async (req, res) =>{
  const {title, description} = req.body
  const id = req.params.id
  
  const validacion = await TaskModel.findOne({userId:req.user._id, _id:id})
  if(!validacion){
      return res.json("No está autorizado");
  }
  const actualizarTarea = await TaskModel.findByIdAndUpdate(id, {title, description})

  if(!actualizarTarea){
      res.json("No se pudo actualizar la tarea")
  }

  res.json("Tarea actualizada")
}


ctrlTask.deleteTask =  async (req,res) =>{
  const id = req.params.id;

  const validacion = await TaskModel.findOne({userId:req.user._id, _id:id})
  if(!validacion){
      return res.json("No está autorizado");
  }

  const eliminarTarea = await TaskModel.deleteOne({_id:id,userId:req.user._id})

  res.json("Tarea eliminada")
}


module.exports = ctrlTask;
