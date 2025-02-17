require("express-async-errors");

require("dotenv").config();

const AppError = require("./utils/AppError");

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const routes = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_CONNECTION);

app.use(routes)


app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.log(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));