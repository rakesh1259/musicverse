const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const songRoutes = require("./routes/songRoutes");
const fs = require("fs");
const path = require("path");


const app = express();

// Define the uploads directory path
const uploadsDir = path.join(__dirname, 'uploads/songs');

// Check if the uploads/songs directory exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("uploads/songs directory created");
}

// Serve the uploads folder statically so clients can access audio files
app.use('/uploads/songs', express.static(uploadsDir));

app.use(cors());

app.use(bodyParser.json());

// Routes
app.use("/artists", artistRoutes);
app.use("/albums", albumRoutes);
app.use("/songs", songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
