import express from 'express'
const app = express()

const PORT = 3000

app.get('/ping', (_req: any, res: any) => {
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})