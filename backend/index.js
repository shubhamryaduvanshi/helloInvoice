const express = require('express')
const merchantRoutes = require("./routes/merchants");
const app = express();
const PORT = 8000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/merchants', merchantRoutes)


app.listen(PORT, () => {
    console.log("server started at ", PORT);
})