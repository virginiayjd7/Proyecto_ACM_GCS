'use strict'

const dataModels = require('../models/Login.model')
const connection = require('../../config/connection')


function Login(req, res) {
   // console.log("id : ", req.params)
    const { correo_usuario,password } = req.body
    dataModels.Login({correo_usuario,password}, (data, error) => {
        res.json(data)
    })
}

module.exports = {
    Login   
}