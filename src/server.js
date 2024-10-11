"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Define a route
app.get('/', (req, res) => {
    res.send('Hello TypeScript with Express!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
