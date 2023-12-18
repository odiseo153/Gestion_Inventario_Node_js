// historialCambioController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface HistorialCambioInput {
  FechaCambio: Date;
  pedidoid: number;
  usuarioid: number;
}

export const obtenerHistorialCambio = async (req: Request, res: Response) => {
  const historialCambioId = parseInt(req.params.id, 10);

  try {
    const obtenido = await prisma.historialcambio.findUnique({
      where: { id: historialCambioId },
    });

    if (!obtenido) {
      return res.status(404).json({ error: 'Historial de cambio no encontrado' });
    }

    res.status(200).json(obtenido);
  } catch (error) {
    console.error('Error al obtener historial de cambio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const obtenerHistorialesCambio = async (req: Request, res: Response) => {
  try {
    const historialesCambio = await prisma.historialcambio.findMany();
    res.status(200).json(historialesCambio);
  } catch (error) {
    console.error('Error al obtener historiales de cambio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


