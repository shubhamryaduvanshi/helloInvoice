const express = require('express')
const merchantRoutes = require("./routes/merchants");
const authRoutes = require("./routes/auth");
const app = express();
const PORT = 8000;
const cors = require("cors");
app.use(cors());


app.use(express.json())
require('dotenv').config()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/merchants', merchantRoutes);
app.use('/auth', authRoutes);



app.listen(PORT, () => {
    console.log("server started at ", PORT);
})