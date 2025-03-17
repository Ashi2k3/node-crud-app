const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes"); // Import book routes

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Atlas Connection String
const MONGO_URI = "mongodb+srv://ashishsugunan2003:HHMRDZaIjl2mbLBl@librarycluster.7opj9.mongodb.net/?retryWrites=true&w=majority&appName=LibraryCluster";


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Atlas connected successfully"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.use("/api/books", bookRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
