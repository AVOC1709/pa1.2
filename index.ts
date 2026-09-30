import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();


const PORT = process.env.PORT ||3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cn = mysql.createConnection({
  host: "mysql-avoc.alwaysdata.net",
  user: "avoc",
  password: "Avoc.123",
  database: "avoc_pasteleria",
});

cn.connect((error) => {
  if (error) {
    console.error("Error de conexión a MySQL:", error);
  } else {
    console.log("Conectado exitosamente a la base de datos MySQL");
  }
});

app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";
  cn.query(sql, (error, result) => {
    if (error) {
      console.error("Error al ejecutar la consulta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json(result);
    }
  });
});

// Escuchar en el puerto dinámico de Alwaysdata
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});