//paquete
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

//sequema 
const notasSchema = new Schema({
    nombre: {type: String, required:[true, 'nombre obligatorio']},
    descripcion: String,
    userid:String,
    date: {type: Date, default: Date.now},
    action:{type:Boolean, default:true}
});
//modelo del esquema 
const Nota = mongoose.model('Nota', notasSchema);

export default Nota;