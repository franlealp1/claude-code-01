/**
 * Script para poblar la base de datos con datos de ejemplo.
 */

/**
 * Datos de productos de ejemplo.
 * Incluye productos con caracteres especiales y variedad de stocks/precios.
 */
const SAMPLE_PRODUCTS = [
    // Productos con caracteres especiales (para demo de CSV)
    { name: "Muneca Nina", stock: 45, price: 29.99 },
    { name: "Senora Lopez Biografia", stock: 12, price: 15.50 },
    { name: "Cafe Colombiano Premium", stock: 8, price: 22.00 },
    { name: "Pinata Tradicional", stock: 5, price: 35.00 },
    { name: "Jalapeno en Conserva", stock: 67, price: 8.99 },

    // Stock normal
    { name: "Laptop HP Pavilion", stock: 23, price: 899.99 },
    { name: "Mouse Inalambrico", stock: 150, price: 25.50 },
    { name: "Teclado Mecanico", stock: 78, price: 120.00 },
    { name: "Monitor 24 pulgadas", stock: 34, price: 299.99 },
    { name: "Webcam HD", stock: 56, price: 65.00 },
    { name: "Auriculares Bluetooth", stock: 92, price: 85.00 },
    { name: "Cable HDMI 2m", stock: 200, price: 12.99 },
    { name: "Hub USB 4 puertos", stock: 88, price: 28.50 },
    { name: "Disco Duro 1TB", stock: 45, price: 89.99 },
    { name: "Memoria RAM 8GB", stock: 120, price: 55.00 },

    // Stock bajo (< 10) para demo de alertas
    { name: "Router Wi-Fi 6", stock: 7, price: 159.99 },
    { name: "Switch 8 puertos", stock: 4, price: 75.00 },
    { name: "Adaptador USB-C", stock: 9, price: 18.99 },
    { name: "Bateria Externa 20000mAh", stock: 6, price: 45.00 },
    { name: "Soporte para Laptop", stock: 3, price: 32.50 },

    // Stock cero (casos edge)
    { name: "Tablet Samsung", stock: 0, price: 349.99 },
    { name: "Smartwatch Xiaomi", stock: 0, price: 189.00 },

    // Precios variados
    { name: "Cable Lightning", stock: 300, price: 9.99 },
    { name: "Mousepad Gaming", stock: 85, price: 24.99 },
    { name: "Lampara LED USB", stock: 110, price: 15.50 },
    { name: "Ventilador USB", stock: 95, price: 12.00 },
    { name: "Organizador Cables", stock: 145, price: 8.50 },
    { name: "Limpiador Pantallas", stock: 78, price: 11.99 },
    { name: "Funda Laptop 15\"", stock: 62, price: 28.00 },
    { name: "Antivirus 1 ano", stock: 48, price: 39.99 }
];

/**
 * Genera una fecha aleatoria en los ultimos N dias.
 * @param {number} maxDaysAgo - Maximo dias en el pasado
 * @returns {string} Fecha en formato ISO
 */
function randomPastDate(maxDaysAgo = 30) {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * maxDaysAgo);
    const pastDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    return pastDate.toISOString();
}

/**
 * Agrega productos de ejemplo a la base de datos.
 * @returns {number} Cantidad de productos agregados
 */
function seedProducts() {
    // Limpiar datos existentes
    InventoryService.resetDatabase();

    // Agregar productos con fechas variadas
    for (const productData of SAMPLE_PRODUCTS) {
        const product = new Product(
            productData.name,
            productData.stock,
            productData.price,
            null,
            randomPastDate(30)
        );

        // Usar createProduct para asignar ID automaticamente
        InventoryService.createProduct(
            productData.name,
            productData.stock,
            productData.price
        );
    }

    console.log(`${SAMPLE_PRODUCTS.length} productos agregados a la base de datos`);
    return SAMPLE_PRODUCTS.length;
}

/**
 * Verifica si ya hay datos en la base de datos.
 * @returns {boolean} True si hay datos
 */
function hasData() {
    const products = InventoryService.getAllProducts();
    return products.length > 0;
}

/**
 * Inicializa la base de datos con datos de ejemplo si esta vacia.
 * @returns {boolean} True si se inicializo con datos
 */
function initializeIfEmpty() {
    if (!hasData()) {
        seedProducts();
        return true;
    }
    return false;
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.SeedData = {
        SAMPLE_PRODUCTS,
        seedProducts,
        hasData,
        initializeIfEmpty
    };
}
