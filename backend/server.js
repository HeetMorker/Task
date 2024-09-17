
const db = require("./config/database"); 
const express = require("express");
const cors = require("cors");
const Config = require("./config");
var bodyParser = require("body-parser");
const userRoutes = require("./routes/users.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", userRoutes); 
app.use("/api/tasks", taskRoutes); 

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT}`);
});
