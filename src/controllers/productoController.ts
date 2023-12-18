// controllers/productoController.ts
import { Request, Response } from 'express';
import { prisma } from "../prismaClient";

export const crearProducto = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;

        // Validar que los datos no estén vacíos
        if (!nombre || !descripcion || !precio || !stock) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const nuevoProducto = await prisma.producto.create({
            data: { nombre, descripcion, precio, stock },
        });

        res.json(nuevoProducto);
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const obtenerProductosById = async (req: Request, res: Response) => {
    try {
        const {  productoid } = req.params;

        if(!productoid) return res.status(404).json({error:"debe proporcionar un id"});

        const productos = await prisma.producto.findUnique({where:{productoid: Number.parseInt(productoid)}});

        if(!productos) return res.status(404).json({error:"no se encontro producto con ese id"});


        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const { productoid } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        // Validar que los datos no estén vacíos
        if (!nombre || !descripcion || !precio || !stock) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const productoActualizado = await prisma.producto.update({
            where: { productoid: parseInt(productoid) },
            data: { nombre, descripcion, precio, stock },
        });

        res.json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const { productoid } = req.params;

        if (!productoid) return res.status(500).json({ error: "debe proporcional el id del producto a eliminar" });

        // Verificar si el producto con el ID proporcionado existe
        const productoExistente = await prisma.producto.findUnique({
            where: { productoid: parseInt(productoid) },
        });

        if (!productoExistente) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        // Eliminar el producto si existe
        await prisma.producto.delete({
            where: { productoid: parseInt(productoid) },
        });

        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error interno del servidor');
    }
};
