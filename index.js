const express = require('express')
const app = express()
const authRoutes = require('./routes/Auth.routes') // Importa tus rutas de autenticación
const appConf = require('./config/app.conf')
const appRputes = require('./routes/App.routes')

app.use(express.json()) // Para poder parsear JSON
// Usa tus rutas de autenticación
app.use(appConf)
app.use(authRoutes)
app.use(appRputes)

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})
