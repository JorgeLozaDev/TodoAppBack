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
