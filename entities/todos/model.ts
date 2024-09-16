import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    tarea: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    completado: {
      type: Boolean,
      default: false,
    },
    eliminado: {
      type: Boolean,
      default: false,
    },
    estado: {
      type: String,
      enum: ["pendiente", "en progreso", "caducado", "completado"],
      default: "pendiente",
    },
    prioridad: {
      type: String,
      enum: ["normal", "alta", "urgente"],
      default: "normal",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Función para actualizar el estado de la tarea en base a las fechas
todoSchema.pre("save", function (next) {
  const now = new Date();
  
  if (this.completado) {
    this.estado = "completado";
  } else if (now < this.fechaInicio) {
    this.estado = "pendiente";
  } else if (now >= this.fechaInicio && now <= this.fechaFin) {
    this.estado = "en progreso";
  } else if (now > this.fechaFin) {
    this.estado = "caducado";
  }
  
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
