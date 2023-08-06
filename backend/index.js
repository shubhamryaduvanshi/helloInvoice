const express = require('express')
const merchantRoutes = require("./routes/merchants");
const authRoutes = require("./routes/auth");
const app = express();
const PORT = 8000;

app.use(express.json())
require('dotenv').config()

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/merchants', merchantRoutes);
app.use('/auth', authRoutes);



app.listen(PORT, () => {
    console.log("server started at ", PORT);
})