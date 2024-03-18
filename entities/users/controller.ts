import express, { NextFunction, Request, Response } from "express";
import User from "./model";
import CONF from "../../core/config";
import bcrypt from "bcrypt";
import { validateRequiredFields } from "../../core/helpers/comun";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { email, username, password } = req.body;

    // Definir campos requeridos
    const camposRequeridos = ["email", "username", "password"];

    // Verificar campos requeridos utilizando la función de validación
    validateRequiredFields(req.body, camposRequeridos);

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, CONF.BCRYTP_LOOP);

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Lanza un error con un código de estado HTTP personalizado
      const error = new Error("El usuario ya existe");
      (error as any).status = 409;
      throw error;
    }

    // Crear un nuevo usuario con el rol asignado
    const newUser = new User({
      email,
      nombre: username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { email, password } = req.body;
  
    // Definir campos requeridos
    const camposRequeridos = ["email", "password"];

    // Verificar campos requeridos utilizando la función de validación
    validateRequiredFields(req.body, camposRequeridos);

    // Buscar al usuario por nombre de usuario
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // Lanza un error con un código de estado HTTP personalizado
      const error = new Error("El usuario no existe");
      (error as any).status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
