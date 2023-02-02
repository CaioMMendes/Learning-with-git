const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'op'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});


app.use(cors()) 

app.get('/data', cors(), function(req, res, next) {
  connection.query('SELECT a.id as id, a.nome as nome, b.nome as fruta FROM personagens as a left join frutas as b on a.frutaId = b.id', (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/personagem', (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const fruta = req.body.fruta;

  connection.query('INSERT INTO personagens (id, nome, frutaid) VALUES (' + id + ", '" + nome + "', " + (fruta ? fruta : 'NULL') +')', (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  }); 

});

app.use("/", router);