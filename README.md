
# Gestion de inventario con Nodejs


Descripción corta y clara de tu aplicación.

## Configuración

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) instalados en tu máquina.

1. **Instalación de Dependencias**

   Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

2. **Configuración de la Base de Datos**

   Asegúrate de tener configurada y ejecutándose una base de datos compatible. Verifica la configuración de conexión en el archivo `prismaClient.ts` y ajusta según sea necesario.

3. **Variables de Entorno**

   Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias, como la cadena de conexión de la base de datos y cualquier otra configuración específica.

   ```env
   DATABASE_URL=your_database_url
   PORT=your_preferred_port
   SECRET_KEY=your_secret_key
   ```

## Uso

1. **Ejecutar la Aplicación**

   Inicia la aplicación con el siguiente comando:

   ```bash
   npm start
   ```

   La aplicación estará disponible en [http://localhost:your_preferred_port](http://localhost:your_preferred_port).

2. **Endpoints Disponibles**

   - **Usuarios:**
     - `POST /usuario`: Agregar un nuevo usuario.
     - `GET /Login`: Iniciar sesión.
     - `GET /recuperar`: Recuperar cuenta.
     - `PUT /usuario`: Actualizar información del usuario.
     - `DELETE /usuario/:id`: Eliminar un usuario.

   - **Pedidos:**
     - `GET /pedidos`: Obtener todos los pedidos.
     - `GET /pedidos/:id`: Obtener un pedido por ID.
     - `GET /pedidosDetalles/:pedidoid`: Detalle de un pedido.
     - `POST /pedidos`: Crear un nuevo pedido.
     - `PUT /pedidos/:id`: Actualizar un pedido por ID.
     - `DELETE /pedidos/:id`: Eliminar un pedido por ID.

   - **Productos:**
     - `POST /productos`: Crear un nuevo producto.
     - `GET /productos`: Obtener todos los productos.
     - `GET /productos/:productoid`: Obtener un producto por ID.
     - `PUT /productos/:productoid`: Actualizar un producto por ID.
     - `DELETE /productos/:productoid`: Eliminar un producto por ID.

   - **Historial de Cambio:**
     - `GET /historial`: Obtener todos los historiales de cambio.
     - `GET /historial/:id`: Obtener un historial de cambio por ID.

   - **Carrito de Compra:**
     - `GET /carrito`: Obtener todos los carritos de compra.
     - `GET /carrito/:carritoid`: Obtener un carrito de compra por ID.

## Contribuciones

Siéntete libre de contribuir y mejorar este proyecto. Abre un problema o envía una solicitud de extracción.



--- 

Recuerda ajustar la información según tu aplicación y añadir detalles adicionales si es necesario. ¡Espero que esto te sea útil!
