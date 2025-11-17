const express = require("express");
const cors = require("cors");
const photoRoutes = require("./routes/photoRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/photos", photoRoutes);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
