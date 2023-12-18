// pedidoController.js

import { prisma } from "../prismaClient";
import { Request, Response } from "express";


// Obtener todos los pedidos
export async function getPedidos(req:Request, res:Response){
  const pedidos = await prisma.pedido.findMany();
  res.json(pedidos);
};

//Detalle de un Pedido
export async function getPedidosDetalles(req:Request, res:Response){
  const {pedidoid} = req.body;
  const pedido = await prisma.detallespedido.findMany({
    where:{pedidoid}
  });

  if(!pedido) return res.status(400).send("No se encontró el detalle del pedido");


  res.json(pedido);
};

// Obtener un pedido por ID
export async function getPedidoById (req:Request, res:Response){
  const { id } = req.params;
  const pedido = await prisma.pedido.findUnique({
    where: { pedidoid: parseInt(id) },
  });

  if (!pedido) return res.status(400).send("El pedido no existe");


  res.json(pedido);
};

//crear un pedido 
export async function createPedido(req: Request, res: Response) {
  try {
    const { usuarioid, productoid, cantidad } = req.body;

    // Validar que los datos no estén vacíos
    if (!usuarioid || !productoid || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar si existe el usuario y el producto
    const usuario = await prisma.usuario.findUnique({
      where: { usuarioid },
    });

    const producto = await prisma.producto.findUnique({
      where: { productoid },
    });

    if (!usuario) {
      return res.status(404).json({
        message: `No existe usuario con el ID ${usuarioid}`,
        code: 404,
      });
    }

    if (!producto) {
      return res.status(404).json({
        message: `No existe producto con el ID ${productoid}`,
        code: 404,
      });
    }

    // Crear el pedido
    const nuevoPedido = await prisma.pedido.create({
      data: {
        estado: 'Comenzado',
        usuarioid,
        productoid:productoid.toString(),
        fechapedido: new Date(),
      },
    });

    // Crear el detalle del pedido
    const nuevoDetalle = await prisma.detallespedido.create({
      data: {
        productoid,
        pedidoid: nuevoPedido.pedidoid,
        cantidad,
        precioUnitario: producto.precio * cantidad,
      },
    });

    // Agregar al carrito de compra
    const nuevoCarrito = await prisma.carritocompra.create({
      data: {
        productoid,
        usuarioid,
        cantidad,
      },
    });

    res.status(201).json({
      message: 'Pedido Agregado Correctamente',
      code: 201,
      nuevoPedido,
      nuevoDetalle,
      nuevoCarrito,
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).send('Error interno del servidor');
  }
}

// Actualizar un pedido por ID
export async function updatePedidoById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { estado, usuarioid } = req.body;

    // Verificar si el pedido con el ID proporcionado existe
    const pedidoExistente = await prisma.pedido.findUnique({
      where: { pedidoid: parseInt(id) }
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    // Verificar si el usuario con el ID proporcionado existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { usuarioid },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar si el usuario está relacionado con el pedido
    if (usuarioExistente.usuarioid !== pedidoExistente.usuarioid) {
      return res.status(404).json({
        message: 'No existe relación de este usuario con este pedido.',
        code: 404,
      });
    }

    // Actualizar el estado del pedido
    const pedidoActualizado = await prisma.pedido.update({
      where: { pedidoid: parseInt(id) },
      data: {
        estado,
      },
    });

    const historial = await prisma.historialcambio.create({
      data:{
        usuarioid: usuarioExistente.usuarioid,
        pedidoid:pedidoActualizado.pedidoid,
        FechaCambio: new Date(),
      }
    })
    res.status(201).json({
      message: 'Pedido actualizado Correctamente',
      code: 201,
      historial,
      pedidoActualizado,
    });

  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).send('Error interno del servidor');
  }
}

// Eliminar un pedido por ID
export async function deletePedidoById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Verificar si el pedido con el ID proporcionado existe
    const pedidoExistente = await prisma.pedido.findUnique({
      where: { pedidoid: parseInt(id) },
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    // Eliminar el pedido si existe
    const pedidoEliminado = await prisma.pedido.delete({
      where: { pedidoid: parseInt(id) },
    });

    res.json(pedidoEliminado);
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).send('Error interno del servidor');
  }
}





