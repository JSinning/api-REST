//paquetes
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import history from'connect-history-api-fallback';
import NotasRout from './routers/NotasRout.js';
import Registros from './routers/Login.js';
const app = express();
// Obteniendo el directorio base usando import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);


//conexion DB Mongo
const uri = 'mongodb://localhost:27017/myapp';
const options = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true};

mongoose.connect(uri, options).then(
  () => { console.log("Conexion exitosa"); },
  err => { console.log(err); }
);


//Middeleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use('/api', NotasRout);
app.use('/api/registros', Registros);

// Middleware para Vue.js router modo history
// const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));



app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Example app listening on port: '+ app.get('puerto'));
});
