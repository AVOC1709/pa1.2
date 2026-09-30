"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3306;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cn = mysql2_1.default.createConnection({
    host: "mysql-avoc.alwaysdata.net",
    user: "avoc",
    password: "Avoc.123",
    database: "avoc_pasteleria",
    port: 3306
});
cn.connect((error) => {
    if (error) {
        console.error("Error de conexión a MySQL:", error);
    }
    else {
        console.log("Conectado exitosamente a la base de datos MySQL");
    }
});
app.get("/productos", (req, res) => {
    const sql = "SELECT * FROM productos";
    cn.query(sql, (error, result) => {
        if (error) {
            console.error("Error al ejecutar la consulta:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
        else {
            res.json(result);
        }
    });
});
// Escuchar en el puerto dinámico de Alwaysdata
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
