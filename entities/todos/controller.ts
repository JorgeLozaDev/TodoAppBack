import express, { NextFunction, Request, Response } from "express";
import AuthenticatedRequest from "../../core/customInterfaces";

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
    console.log(tituloTarea, descripcion, tiempo, tiempoFin, estado, prioridad);

    // Busca al usuario por ID
    // const user = await User.findById(userId);

    // if (!user) {
    //   const error = new Error("Usuario no encontrado");
    //   (error as any).status = 404;
    //   throw error;
    // }

    // res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
