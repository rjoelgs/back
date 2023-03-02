const express = require("express")

const app = express()

const appPort = 3000

app.get("/", (request, response) => {
    response.json({
        "resultado" : "Hola, soy el API de OpenWebinars",
        "ruta" : request.host
    })
})

app.listen(appPort, () => {
    console.info(`Aplicación ejecutandose en  http://localhost:${appPort}`)
})