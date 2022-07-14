require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());

// ROUTES IMPORT
const bookRouter = require("./router/bookRoute");

//ERROR MIDDLE WARES IMPORT
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

// MIDDLE WARES
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/", bookRouter);

// ERROR MIDDLE WARES
app.use(errorMiddleware);
app.use(notFoundMiddleware);

// START SERVER ON PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port : ${port}`));
