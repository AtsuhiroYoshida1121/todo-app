const express = require('express');
const app = express();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b5852baf8e30d9',
    password: '9482c776',
    database:'heroku_e651c01b88a0c09'
});

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/top', (req,res) => {
    res.render('top.ejs');
});

app.get('/index', (req,res) => {

    connection.query(
        'select * from items',
        (error,results) => {
            res.render('index.ejs',{items: results});
        }
    );
});

app.get('/new', (req,res) => {
    res.render('new.ejs');
});

app.post('/create',(req,res) => {
    console.log(req.body.itemName);
    connection.query(
        'insert into items(name) values(?)',
        [req.body.itemName],
        (error,results) => {
            res.redirect('/index');
        }
    );
});

app.post('/delete/:id', (req,res) => {
    connection.query(
        'delete from items where id = ?',
        [req.params.id],
        (error,results) => {
            res.redirect('/index');
        }
    );
});

app.get('/edit/:id', (req,res) => {
    connection.query(
        'select * from items where id = ?',
        [req.params.id],
        (error,results) => {
            res.render('edit.ejs',{item: results[0]});
        }
    );
});

app.post('/update/:id', (req,res) => {
    connection.query(
        'update items set name = ? where id = ?',
        [req.body.itemName,req.params.id],
        (error,results) => {
            res.redirect('/index');
        }
    );
});

app.listen(process.env.PORT || 3000)