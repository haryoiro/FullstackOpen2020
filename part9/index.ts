import express from 'express'
const app = express()

const PORT = 3000


app.get('/hello', (_req, res) => {
    res.send('Hello FullStack!')
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    if (isNaN(height) && isNaN(weight)) {
        res.json({ error: "malformatted parameters" })
    }

    res.json(bmiToJson(height, weight))
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})