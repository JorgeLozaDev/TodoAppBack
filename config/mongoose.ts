import mongoose from "mongoose";
import CONF from "../core/config";
import User from "../entities/users/model";
import bcrypt from "bcrypt";

mongoose
  .connect(CONF.DDBB_URL + CONF.DDBB_NAME, {})

  .then(async () => {
    console.log("Conectado correctamente a la BBDD");
    const adminExist = await User.findOne({ role: "admin" });
    if (!adminExist) {
      const hashedPassword = await bcrypt.hash(
        CONF.ADMIN_PASSWORD,
        CONF.BCRYTP_LOOP
      );
      const adminUser = new User({
        nombre: CONF.ADMIN_USERNAME,
        email: CONF.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("Usuario admin creado");
    }
  }) 
  .catch((e) => console.log("error" + e));

export = mongoose;
