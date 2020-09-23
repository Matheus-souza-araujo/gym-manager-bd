const express = require('express') //chamo o express para dentro dessa variavel
const nunjunks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')


const server = express() //executa o express, variavel express vira uma função
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))//use é um middleware
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")//configuração da template engine

nunjunks.configure("views", {
    express:server,
    autoescape:false,
    noCache: true
})

server.listen(5000, function(){//vai ficar ouvindo a porta 5000
    console.log("server is running")
}) 