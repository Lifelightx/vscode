require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const initializeSocket = require('./socket/socketHandler');
const codespaceApiRoutes = require('./routes/codeSpaceApi');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173","https://vscode-ibox.onrender.com"], // Your React app's URL
        methods: ["GET", "POST"]
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

// API Routes
app.use('/api/codespaces', codespaceApiRoutes);
app.get('/', (req,res)=>{
    res.send("Api is running.................")
})
// Initialize Socket.io logic
initializeSocket(io);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));