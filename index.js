const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("teste 1")
})

app.get("/teste", (req, res) => {
    res.send("teste 2")
})  

app.get("/teste3", (req, res) => {
    res.send("teste 3")
})
  

app.listen(2000, () => {
    console.log('App Rodando')
})
