-- CreateTable
CREATE TABLE `Pedido` (
    `pedidoid` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` VARCHAR(191) NOT NULL,
    `productoid` VARCHAR(191) NOT NULL,
    `fechapedido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioid` INTEGER NOT NULL,

    PRIMARY KEY (`pedidoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carritocompra` (
    `carritoid` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `productoid` INTEGER NOT NULL,
    `usuarioid` INTEGER NOT NULL,

    PRIMARY KEY (`carritoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detallespedido` (
    `detallepedidoid` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precioUnitario` DECIMAL(65, 30) NOT NULL,
    `pedidoid` INTEGER NOT NULL,
    `productoid` INTEGER NOT NULL,

    PRIMARY KEY (`detallepedidoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Historialcambio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `FechaCambio` DATETIME(3) NOT NULL,
    `pedidoid` INTEGER NOT NULL,
    `usuarioid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `productoid` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`productoid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `usuarioid` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `correoElectronico` VARCHAR(191) NOT NULL,
    `clave` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`usuarioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
