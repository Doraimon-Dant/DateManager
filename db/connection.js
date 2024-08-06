import mongoose from "mongoose";


try {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log("Database connected");
} catch (error) {
  console.log(`Error de conexión en la base de datos ${error.message}`);
}