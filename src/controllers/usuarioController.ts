import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { generarToken } from "../tools/token";

export async function RecuperarCuenta(req:Request, res:Response){
 
    const { correo } = req.body;

    try {
        // Obtén el usuario existente
        const usuarioExistente = await prisma.usuario.findFirst({
          where: { correoElectronico: correo },
        });
    
        if (!usuarioExistente) {
          return res.status(404).send('No existe usuario con ese correo');
        }
 
    
        res.status(200).json({usuario:{correo:usuarioExistente.correoElectronico,clave:usuarioExistente.clave}});
      } catch (error) {
        res.status(500).send('Error al encontrar al usuario con ese correo: ' + error);
      }

}

export async function AgregarUsuario(req:Request, res:Response){
const {nombre,correo,clave,rol} = req.body;

try {
    const usuarioExistente = await prisma.usuario.findFirst
    ({
        where: { correoElectronico: correo,clave:clave }
      });

      if(usuarioExistente){
        return res.status(500).json({message:"ya existe un usuario con ese correo y clave"})
      }

     await prisma.usuario.create({
      data: {
        nombre:nombre,
        clave:clave,
        correoElectronico:correo,
        rol:rol
    },
  });
  res.send(`Usuario ${nombre} creado`);
} catch (error) {
  res.send('Error al crear usuario:'+ error);
}


}

export async function EliminarUsuario(req:Request, res:Response){
    const { id } = req.body;

    try {
        // Obtén el usuario existente
        const usuarioExistente = await prisma.usuario.delete({
          where: { usuarioid: id },
        });
    
        if (!usuarioExistente) {
          return res.status(404).send('No existe usuario con ese id');
        }
 
    
        res.send('Se Elimino el usuario: ' + usuarioExistente.nombre);
      } catch (error) {
        res.status(500).send('Error al eliminar usuario: ' + error);
      }
}


export async function ActualizarUsuario(req: Request, res: Response) {
    const { nombre, correo, clave, rol, id } = req.body;
  
    try {
      // Obtén el usuario existente
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { usuarioid: id },
      });
  
      if (!usuarioExistente) {
        return res.status(404).send('No existe usuario con ese id');
      }
  
      // Actualiza solo los campos no vacíos, manteniendo los valores anteriores si están vacíos
      const dataToUpdate = {
        nombre: nombre !== undefined ? nombre : usuarioExistente.nombre,
        clave: clave !== undefined ? clave : usuarioExistente.clave,
        correoElectronico: correo !== undefined ? correo : usuarioExistente.correoElectronico,
        rol: rol !== undefined ? rol : usuarioExistente.rol,
      };
  
      // Realiza la actualización
      await prisma.usuario.update({
        where: { usuarioid: id },
        data: dataToUpdate,
      });
  
      res.send('Se actualizaron los datos correctamente');
    } catch (error) {
      res.status(500).send('Error al actualizar usuario: ' + error);
    }
  }


  export async function Login(req: Request, res: Response) {
    const { correo, clave } = req.body;
  
    // Verifica que los campos no estén vacíos
    if (!correo || !clave) {
      return res.status(400).json({ error: 'Correo y clave son campos requeridos.' });
    }
  
    try {
      // Obtén el usuario existente
      const usuarioExistente = await prisma.usuario.findFirstOrThrow({
        where: { correoElectronico: correo, clave: clave },
      });
  
      if (!usuarioExistente) {
        return res.status(404).send('Correo o clave incorrectos. Revise bien.');
      }
  
      const token = generarToken(usuarioExistente.usuarioid);
  
      res.status(200).json({
        message: '¡Bienvenido ' + usuarioExistente.nombre + '!',
        token: token,
      });
    } catch (error) {
      res.status(500).send('Error con el inicio de sesión: ' + error);
    }
  }

