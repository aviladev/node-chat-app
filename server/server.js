const path = require('path')
const express = require('express')

const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, "../public")

const app = express()

app.use(express.static(PUBLIC_PATH))

app.listen(PORT, () =>
  console.log(`Up and running! PORT: ${PORT}`)
)
