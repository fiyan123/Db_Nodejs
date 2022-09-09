// Library
const express = require('express')
const mysql   = require('mysql')
const BodyParser = require("body-parser")

const app = express()

app.use(BodyParser.urlencoded({ extended: true }))

// Templateting ejs
app.set("view engine" , "ejs")
app.set("views" , "views")

// Koneksi kedatabase
const db = mysql.createConnection({
    host: "localhost",
    database: "dbnodejs",
    user: "root",
    password: "",
})

db.connect((err) => {
    if (err) throw err
    console.log("Database Connected...")

    // Untuk get data
    app.get("/", (req, res) => { 
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
        res.render("index", { users: users, title: "Daftar Data Murid" })
        })
    })

    // Untuk Insert data
    app.post("/tambah", (req, res) => {
        const inserSql = `INSERT INTO user (nama, kelas, alamat) VALUES ( '${req.body.nama}' , '${req.body.kelas}','${req.body.alamat}' );`
        db.query(inserSql, (err, result) => {
            if (err) throw err
            // kembali kehalaman
            res.redirect("/")
        })
    })

    app.delete("/hapus", (req, res) => {
        const deleteSql = `DELETE FROM user WHERE user.no`
        db.query(deleteSql, (err, result) => {
            if (err) throw err
            // kembali kehalaman
            res.redirect("/")
        })
    })
})

// Port Sistem
app.listen(8000 , () => {
    console.log('Server Ready...')
})