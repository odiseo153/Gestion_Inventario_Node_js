// crud.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();






export async function getCarritoCompra(req: Request, res: Response) {
  const carritoid = parseInt(req.params.carritoid, 10);

  if(!carritoid){return res.status(404).json({ success: false, error: 'debe proporcionar un id' });}

  try {
    const carrito = await prisma.carritocompra.findUnique({
      where: { carritoid },
    });

    if (!carrito) {
      return res.status(404).json({ success: false, error: 'Carrito not found' });
    }

    return res.status(200).json({ success: true, data: carrito });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error fetching carrito',errorMessage:error });
  }
}


export async function getCarritosCompra(req: Request, res: Response) {
    
  
    try {
      const carrito = (await prisma.carritocompra.findMany());


      if (!carrito) {
        return res.status(404).json({ success: false, error: 'No hay carritos agregados' });
      }

  
      return res.status(200).json({ success: true, carrito: carrito });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error recorriendo los carritos carrito',errorMessage:error });
    }
  }
// Similar ajuste para las funciones updateCarritoCompra y deleteCarritoCompra
