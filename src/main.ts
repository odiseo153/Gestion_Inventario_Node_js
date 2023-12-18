import express from 'express'
import rutas from './routes/rutas';


const app = express();
const puerto = 3000;


app.use(express.json());
app.use(rutas);


app.listen(puerto,()=>{
console.clear();
console.log('servidor en el puerto: '+puerto)
})




