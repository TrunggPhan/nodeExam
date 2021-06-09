let http = require('http');
let fs = require('fs');
let mysql = require('mysql');
let cookiePerser = require('cookie-parser')
let express = require('express')
let app = express();
let port = 3000;

// app.use('/assest', express.static(`${__dirname}/public`))
//app.use(cookiePerser())
let connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'test',
});
//console.log("connection = ", connection)
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
//custom middleware
app.use('/', function (req, res, next){
     connection.connect(function(err) {
         if (err) throw err;
        console.log("Connected!");
     });


    connection.query('SELECT * FROM tbl_sinhvien', function (error, results, fields) {
        if (error) console.log('ádfadfasdafsdfsad', error);
        console.log('The solution is',  results);
    });

    connection.end();
    next();
})

app.get('/', function (req, res){
    // console.log('cookie: ',req.cookies)
    res.send(`
<!--        <link href="/assest/style.css" rel="stylesheet" type="text/css" >-->
        <h1>hello: ${req.params.id}</h1>`)
})

app.get('/api', function (req, res){
    res.cookie('hoa', 'trungphan')
    res.json({
        name: 'trung',
        age: '27',
    })
})
app.listen(port, function (){
    console.log("Server running in port: ", port)
})

// http.createServer(function (req, res){
//     if(req.url === '/' || req.url === '/index.html'){
//         fs.createReadStream(`${__dirname}/index.html`).pipe(res)
//     }else if(req.url === '/json'){
//         res.writeHead(200, {'Content-Type': 'application/json'})
//         let obj = {
//             name: 'trung',
//             age: '27'
//         }
//         res.end(JSON.stringify(obj))
//     }else {
//         res.writeHead(404)
//         res.end("Server Not Found!")
//     }
//
// }).listen(1337, '127.0.0.1', function (){
//     console.log("Server running!!!")
// })
