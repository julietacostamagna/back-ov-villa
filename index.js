const express = require("express");
const app = express();
const authRoutes = require("./src/routes/Auth.routes"); // Importa tus rutas de autenticación
const appConf = require("./src/config/app.conf");
// const appRoutes = require('./src/routes/Auth.routes')

app.use(express.json()); // Para poder parsear JSON
// Usa tus rutas de autenticación
app.use(appConf);
app.use(authRoutes);
// app.use(appRoutes)

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
