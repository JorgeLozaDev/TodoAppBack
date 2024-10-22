import express, { NextFunction, Request, Response } from "express";
import AuthenticatedRequest from "../../core/customInterfaces";
import { validateRequiredFields } from "../../core/helpers/comun";
import Todo from "./model";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Usar 'import' para el plugin de UTC
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc); // Extender dayjs con el plugin de UTC
dayjs.extend(timezone);

export const addTodo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado desde el middleware
    // Obtener datos del cuerpo de la solicitud
    const { tituloTarea, descripcion, tiempo, tiempoFin, estado, prioridad } =
      req.body;

    const camposRequeridos = [
      "tituloTarea",
      "descripcion",
      "tiempo",
      "tiempoFin",
      "estado",
      "prioridad",
    ];

    // Verificar campos requeridos utilizando la función de validación
    validateRequiredFields(req.body, camposRequeridos);

    // Crear una nueva tarea con el usuario autenticado
    const newTodo = new Todo({
      usuario: userId,
      tarea: tituloTarea,
      descripcion,
      fechaInicio: dayjs(tiempo).tz("Europe/Madrid").format(), // Usar las fechas convertidas a UTC
      fechaFin: dayjs(tiempoFin).tz("Europe/Madrid").format(), // Usar las fechas convertidas a UTC
      estado,
      prioridad,
    });

    await newTodo.save();

    res.status(201).json({ message: "Se ha agregado una nueva tarea" });
  } catch (error) {
    next(error);
  }
};

export const getAllTodosUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id; // Obtén el rol del usuario autenticado

    // Obtener los to-dos del usuario
    const allTodos = await Todo.find({ usuario: userId, eliminado: false })
      .select(
        "tarea descripcion fechaInicio fechaFin completado eliminado estado prioridad"
      )
      .sort({ fechaFin: 1 })
      .exec();

    res.status(200).json({ allTodos });
  } catch (error) {
    next(error);
  }
};

export const deleteTodos = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ids } = req.body;
    const userId = req.user.id; // Obtén el ID del usuario autenticado

    // Actualiza los todos marcándolos como eliminados solo para el usuario autenticado
    const result = await Todo.updateMany(
      { _id: { $in: ids }, usuario: userId }, // Cambiado de userId a usuario
      { $set: { eliminado: true } }
    );

    res
      .status(200)
      .send({ message: "Tareas marcadas como eliminadas correctamente" });
  } catch (error) {
    next(error);
  }
};

export const todoDetails = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId = req.params.id;

    // Busca el usuario por ID y selecciona los campos deseados
    const user = await Todo.findById(todoId);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para actualizar datos personales del usuario
export const updateTodo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tarea, descripcion, tiempo, tiempoFin, estado, prioridad, id } =
      req.body;
    const userIdFromToken = req.user.id;
    console.log(req.body);

    const todoFound = await Todo.findOne({ _id: id });

    if (!todoFound) {
      const error = new Error("Todo no encontrado");
      (error as any).status = 404;
      throw error;
    }

    // Definir campos requeridos
    const camposRequeridos = [
      "tarea",
      "descripcion",
      "tiempo",
      "tiempoFin",
      "estado",
      "prioridad",
      "id",
    ];

    // // Verificar campos requeridos utilizando la función de validación
    validateRequiredFields(req.body, camposRequeridos);

    todoFound.tarea = tarea;
    todoFound.descripcion = descripcion;
    todoFound.fechaInicio = tiempo;
    todoFound.fechaFin = tiempoFin;
    todoFound.estado = estado;
    todoFound.prioridad = prioridad;

    await todoFound.save();
    res
      .status(200)
      .json({ message: "Datos personales actualizados con éxito" });
  } catch (error) {
    next(error);
  }
};
