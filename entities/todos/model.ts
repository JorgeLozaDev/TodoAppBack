const mongoose = require("mongoose");

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
    completado: {
      type: Boolean,
      default: false,
    },
    eliminado: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
