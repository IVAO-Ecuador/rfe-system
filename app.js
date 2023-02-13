import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { default as fetch } from 'node-fetch';
import { createConnection } from 'mysql2';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

const connection = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rfo_2023"
})

connection.connect(error => {
    if(error) throw error;
    console.log('Base de datos conectada')
})

app.get('/api/statistics', (req, res) => {
    const sql = `WITH cte AS (SELECT 'Libre' AS estado UNION ALL
        SELECT 'Reservado' UNION ALL SELECT 'Confirmado') SELECT
        cte.estado, COALESCE(f.cantidad, 0) AS cantidad FROM cte
        LEFT JOIN (SELECT estadoVuelo AS estado, COUNT(*) AS cantidad
        FROM flights GROUP BY estadoVuelo) f ON f.estado = cte.estado`;

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }
    });
})

app.get('/api/flights', (req, res) => {

    const { selectAirport, type } = req.query;
    let sql = "SELECT * FROM flights";
    if (selectAirport === "SEQM" && type === "Departures") {
        sql += " WHERE ICAO_Salida = 'SEQM'";
    } else if (selectAirport === "SEQM" && type === "Arrivals") {
        sql += " WHERE ICAO_Llegada = 'SEQM'";
    } else if (selectAirport === "SEGU" && type === "Departures") {
        sql += " WHERE ICAO_Salida = 'SEGU'";
    } else if (selectAirport === "SEGU" && type === "Arrivals") {
        sql += " WHERE ICAO_Llegada = 'SEGU'";
    }

    connection.query(sql, (error, results) => {
        if (error) {
        return res.status(500).json({
            message: "Error al obtener los datos de los vuelos",
            error
        });
        }
        res.json(results);
    });

})

const port = process.env.port || 2020;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));