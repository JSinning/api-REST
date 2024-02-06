import {Router} from 'express';
import { config } from "../models/conection.js";


const router = Router();

router.get('/', async(req, res) => {
try {
    const register = await config.query('select usrname, password, email from login');
    if(!register.rows.length){
      return res.status(404).json({
        mensaje: "No hay usuarios registrados",
        staust: 200,
        data:[]
       });
    }
   return res.status(200).json({
    messaje: "Datos de /get",
    staust: 200,
    data: register.rows
   })
    
} catch (error) {
    return res.status(500).json({
        mensaje: 'ocurio un error',
        error
    })
}
});


router.post('/add', async(req, res) => {
     const body = req.body;
  try {
      const queri = 'INSERT INTO login(usrname, password, email) VALUES ($1, $2, $3)';
      const values = [body.username, body.pass, body.email]; // {username: test, pass: test123,  email:test@test.com }
      const register = await config.query(queri, values);
    
     return res.status(200).json({
      messaje: "/post",
      staust: 200,
      data: register.rowCount
     })
      
  } catch (error) {
      return res.status(500).json({
          mensaje: 'ocurio un error',
          error
      })
  }
  });

  router.get('/find/:username', async(req, res) => {
    try {
        const register = await config.query(`select usrname, password, email from login where usrname='${req.params.username}'`);
        if(!register.rows.length){
          return res.status(404).json({
            mensaje: `El usuario ${req.params.username} no existe`,
            staust: 200,
            data:[]
           });
        }
       return res.status(200).json({
        messaje: "/get",
        staust: 200,
        data: register.rows
       })
        
    } catch (error) {
        return res.status(500).json({
            mensaje: 'ocurio un error',
            error
        })
    }
    });

//exportacion del Rout
export default router;