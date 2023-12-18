import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
 
// Función para generar un token con información
export function generarToken(info: any): string {
  // La clave secreta debe mantenerse segura y no ser revelada
  const claveSecreta = 'odiseo';

  // El segundo argumento es la clave secreta que se utilizará para firmar el token
  // El tercer argumento es un objeto que contiene la información que deseas incluir en el token
  const token = jwt.sign(info, claveSecreta); // Puedes ajustar el tiempo de expiración según tus necesidades
 
  return token;
}

// Middleware para verificar y extraer información del token
export function verificarToken(req: Request, res: Response, next: NextFunction) {
  // La clave secreta debe coincidir con la clave utilizada para firmar el token
  const claveSecreta = 'odiseo';

  // Obtén el token del encabezado de la solicitud
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  // Verifica y decodifica el token
  jwt.verify(token, claveSecreta, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    // Decoded contendrá la información incluida en el token
    console.log(decoded)

    // Continúa con la ejecución de la solicitud
    next();
  });
}





