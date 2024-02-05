import {Router} from 'express';
const router = Router();

import Nota from '../models/NOTAS.js';
//METODO POST
router.post('/nueva-nota', async(req, res) => {
    const body = req.body;

try {
    const notaDB = await Nota.create(body);
    res.status(200).json(notaDB);
    
} catch (error) {
    return res.status(500).json({
        mensaje: 'ocurio un error',
        error
    })
}
});
//METODO GET
router.get('/nota', async(req, res) => {
    try {
        const notaDb = await Nota.find();
      return res.json(notaDb);
    } catch (error) {
       return res.status(400).json({
            mensaje: 'ocurio un error',
            error
        })
    }

});

//METODO GET con patrametros
router.get('/nota/:id', async(req, res) => {
    const userid =  req.params.id;
    try {
        const notaDb = await Nota.findOne({userid});
        return res.json(notaDb);
    } catch (error) {
       return res.status(400).json({
            mensaje: 'ocurio un error',
            error
        })
    }

});

//METODO DELETE
router.delete('/nota/:id', async(req, res) => {
    const userid  = req.params.id;

    try {
        const notaDb =  await Nota.findOneAndDelete({userid: userid});

        if(!notaDb){
            return res.status(500).json({
                mensaje: 'no se encontro el id para eliminar',
                error
            });
        }

        return res.json(notaDb);
        
    } catch (error) {
        res.status(400).json({
            mensaje: 'ocurio un error',
            error
        })

    }

});

//METODO PUT 
router.put('/nota/:id',  async(req, res) =>{
    const userid = req.params.id;
    const body = req.body;
    
    try {
        const notaDb = await Nota.findOneAndUpdate(
            userid,
            body,
            {new: true},
        );
        return res.json(notaDb);
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'ocurio un error',
            error
        })
    }
});

//exportacion del Rout
export default router;