/**
 * Servicio de gestion de inventario.
 * Usa localStorage para persistencia de datos.
 */

const STORAGE_KEY = 'inventory_products';

/**
 * Obtiene todos los productos del almacenamiento.
 * @returns {Product[]} Array de productos
 */
function getProductsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [];
    }
    try {
        const parsed = JSON.parse(data);
        return parsed.map(item => Product.fromJSON(item));
    } catch (e) {
        console.error('Error al parsear productos:', e);
        return [];
    }
}

/**
 * Guarda los productos en el almacenamiento.
 * @param {Product[]} products - Array de productos a guardar
 */
function saveProductsToStorage(products) {
    const data = products.map(p => p.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Genera el siguiente ID disponible.
 * @returns {number} Siguiente ID
 */
function getNextId() {
    const products = getProductsFromStorage();
    if (products.length === 0) {
        return 1;
    }
    const maxId = Math.max(...products.map(p => p.id || 0));
    return maxId + 1;
}

/**
 * Obtiene todos los productos del inventario.
 * @returns {Product[]} Lista de productos
 */
function getAllProducts() {
    return getProductsFromStorage();
}

/**
 * Obtiene un producto por su ID.
 * @param {number} productId - ID del producto
 * @returns {Product|null} Producto si existe, null en caso contrario
 */
function getProductById(productId) {
    const products = getProductsFromStorage();
    const product = products.find(p => p.id === productId);
    return product || null;
}

/**
 * Crea un nuevo producto en el inventario.
 * @param {string} name - Nombre del producto
 * @param {number} stock - Cantidad inicial
 * @param {number} price - Precio unitario
 * @returns {Product} Producto creado con su ID asignado
 * @throws {Error} Si los datos son invalidos
 */
function createProduct(name, stock, price) {
    if (stock < 0) {
        throw new Error("El stock no puede ser negativo");
    }

    if (price <= 0) {
        throw new Error("El precio debe ser mayor a cero");
    }

    const products = getProductsFromStorage();
    const newId = getNextId();
    const lastUpdated = new Date().toISOString();

    const newProduct = new Product(name, stock, price, newId, lastUpdated);
    products.push(newProduct);
    saveProductsToStorage(products);

    console.log(`Producto creado: ${name} (ID: ${newId})`);
    return newProduct;
}

/**
 * Actualiza un producto existente.
 * @param {number} productId - ID del producto a actualizar
 * @param {string|null} name - Nuevo nombre (opcional)
 * @param {number|null} stock - Nuevo stock (opcional)
 * @param {number|null} price - Nuevo precio (opcional)
 * @returns {Product|null} Producto actualizado si existe, null en caso contrario
 * @throws {Error} Si los datos son invalidos
 */
function updateProduct(productId, name = null, stock = null, price = null) {
    const products = getProductsFromStorage();
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return null;
    }

    const product = products[index];

    // Actualizar solo los campos proporcionados
    if (name !== null) {
        product.name = name;
    }
    if (stock !== null) {
        if (stock < 0) {
            throw new Error("El stock no puede ser negativo");
        }
        product.stock = stock;
    }
    if (price !== null) {
        if (price <= 0) {
            throw new Error("El precio debe ser mayor a cero");
        }
        product.price = price;
    }

    product.lastUpdated = new Date().toISOString();
    products[index] = product;
    saveProductsToStorage(products);

    console.log(`Producto actualizado: ${productId}`);
    return product;
}

/**
 * Elimina un producto del inventario.
 * @param {number} productId - ID del producto a eliminar
 * @returns {boolean} True si se elimino, False si no existia
 */
function deleteProduct(productId) {
    const products = getProductsFromStorage();
    const initialLength = products.length;
    const filtered = products.filter(p => p.id !== productId);

    if (filtered.length < initialLength) {
        saveProductsToStorage(filtered);
        console.log(`Producto eliminado: ${productId}`);
        return true;
    }
    return false;
}

/**
 * Busca productos por nombre.
 * @param {string} query - Texto a buscar en el nombre del producto
 * @returns {Product[]} Lista de productos que coinciden con la busqueda
 */
function searchProducts(query) {
    const products = getProductsFromStorage();
    // Busqueda case-sensitive (intencional para ejercicio)
    return products.filter(p => p.name.includes(query));
}

/**
 * Reinicia la base de datos (elimina todos los productos).
 */
function resetDatabase() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Base de datos reiniciada');
}

// CODIGO LEGACY INTENCIONAL PARA DEMO DE REFACTORING
/**
 * Legacy function - needs refactoring
 * @param {number} p - Primer valor
 * @param {number} q - Segundo valor
 * @returns {number} Resultado
 */
function doStuff(p, q) {
    var x = p * q;
    if (x > 0) {
        var y = x + 100;
        return y;
    } else {
        return 0;
    }
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.InventoryService = {
        getAllProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        searchProducts,
        resetDatabase,
        doStuff
    };
}
