import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import contactRoutes from './contactRoutes.js';
import Database from './database.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false
}));
// Static files
app.use(express.static(path.join(__dirname, '../..')));
app.use('/node_modules/@fortawesome/fontawesome-free', express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));
app.use('/node_modules/bootstrap', express.static(path.join(__dirname, '../../node_modules/bootstrap')));
// Routes
app.use('/api/contacts', contactRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});
// Start server
async function startServer() {
    try {
        const db = Database.getInstance();
        await db.connect();
        app.listen(port, () => {
            console.log(`[INFO] Server started on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("[ERROR] Failed to start server:", error);
        process.exit(1);
    }
}
startServer().catch((err) => {
    console.error("[FATAL] Server crash:", err);
});
