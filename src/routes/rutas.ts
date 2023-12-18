import express from "express";
import { verificarToken } from "../tools/token";
import {ActualizarUsuario, AgregarUsuario, EliminarUsuario, Login, RecuperarCuenta} from "../controllers/usuarioController";
import { createPedido, deletePedidoById, getPedidoById, getPedidos, getPedidosDetalles, updatePedidoById } from "../controllers/pedidoController";
import { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto, obtenerProductosById } from "../controllers/productoController";
import { obtenerHistorialesCambio, obtenerHistorialCambio } from '../controllers/historialController';
import { getCarritoCompra, getCarritosCompra } from "../controllers/carritoController";

const rutas = express.Router();

//Usuario
rutas.get('/Login',Login)
rutas.get('/recuperar',RecuperarCuenta)
rutas.post('/usuario',AgregarUsuario)
rutas.put('/usuario',verificarToken,ActualizarUsuario)
rutas.delete('/usuario/:id',verificarToken,EliminarUsuario)


//Productos
rutas.get('/pedidos',verificarToken, getPedidos)
rutas.get('/pedidos/:id',getPedidoById)
rutas.get('/pedidosDetalles/:pedidoid',getPedidosDetalles)
rutas.post('/pedidos',verificarToken,createPedido)
rutas.put('/pedidos/:id',verificarToken,updatePedidoById)
rutas.delete('/pedidos/:id',verificarToken,deletePedidoById)


//productos
rutas.post('/productos',verificarToken, crearProducto);
rutas.get('/productos', obtenerProductos);
rutas.get('/productos/:productoid', obtenerProductosById);
rutas.put('/productos/:productoid', actualizarProducto);
rutas.delete('/productos/:productoid', eliminarProducto);


//Historial
rutas.get('/historial',verificarToken, obtenerHistorialesCambio);
rutas.get('/historial/:id',verificarToken, obtenerHistorialCambio);

//carrito
rutas.get('/carrito',verificarToken, getCarritosCompra);
rutas.get('/carrito/:carritoid',verificarToken, getCarritoCompra);



export default rutas;















