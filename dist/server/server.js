"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const contactRoutes_js_1 = __importDefault(require("./contactRoutes.js"));
const database_js_1 = __importDefault(require("./database.js"));
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: false
}));
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../..')));
app.use('/node_modules/@fortawesome/fontawesome-free', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));
app.use('/node_modules/bootstrap', express_1.default.static(path_1.default.join(__dirname, '../../node_modules/bootstrap')));
// Routes
app.use('/api/contacts', contactRoutes_js_1.default);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../..', 'index.html'));
});
// Start server
async function startServer() {
    try {
        const db = database_js_1.default.getInstance();
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
//# sourceMappingURL=server.js.map