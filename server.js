const express = require('express')
const app = express()
const views = __dirname +"/views/";
const angularApp = __dirname +"/app/";
const assets = __dirname +"/assets/";
const styles = __dirname +"/styles/";
const path = require('path');
const port = process.env.PORT || 3000;

app.use('/views', express.static(views));
app.use('/app', express.static(angularApp));
app.use('/assets', express.static(assets));
app.use('/styles', express.static(styles));

app.get('/', function (req, res) {
  res.sendFile(path.join(views + "index.html"));
});

app.get('/companies/:id', function (req, res) {
  res.sendFile(path.join(views + "company.html"));
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});
