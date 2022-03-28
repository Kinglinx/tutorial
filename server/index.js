const mysql = require('mysql');
const express = require('express');
var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tuto'
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded.')
    else
    console.log('DB connection failed \n Error :'+ JSON.stringify(err,undefined,2));

});

app.listen(3001,()=>console.log('Express server is running on Port: 3001'));

// Get all employees
app.get('/users',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users',(err,rows,fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
    })
});

// Get a User
app.get('/users/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM users WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
    })
});

// Delete a User
app.delete('/users/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM users WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('Deleted successful');
        else
        console.log(err);
    })
});

//Add user
app.post('/users',(req,res)=>{
    var sql = 'INSERT INTO Users (names,username,password,phone,email) VALUES (?,?,?,?,?)';
    let user = req.body;
    mysqlConnection.query(sql,[user.names,user.username,user.password,user.phone,user.email],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//Updates user 
app.put('/users/:id',(req,res)=>{
    var sql = 'UPDATE users SET names=?,username=?,password=?,phone=?,email=? WHERE id=?';
    let user = req.body;
    mysqlConnection.query(sql,[user.names,user.username,user.password,user.phone,user.email,req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});