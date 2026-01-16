/**
 * Validadores de inputs.
 */

/**
 * Valida los datos de un producto.
 * @param {string} name - Nombre del producto
 * @param {number} stock - Cantidad en stock
 * @param {number} price - Precio del producto
 * @returns {{valid: boolean, error: string|null}} Objeto con resultado de validacion
 */
function validateProductData(name, stock, price) {
    if (!name || !name.trim()) {
        return { valid: false, error: "El nombre del producto es obligatorio" };
    }

    if (name.length > 200) {
        return { valid: false, error: "El nombre del producto no puede exceder 200 caracteres" };
    }

    if (!Number.isInteger(stock)) {
        return { valid: false, error: "El stock debe ser un numero entero" };
    }

    if (stock < 0) {
        return { valid: false, error: "El stock no puede ser negativo" };
    }

    if (typeof price !== 'number' || isNaN(price)) {
        return { valid: false, error: "El precio debe ser un numero" };
    }

    if (price <= 0) {
        return { valid: false, error: "El precio debe ser mayor a cero" };
    }

    if (price > 1000000) {
        return { valid: false, error: "El precio no puede exceder 1,000,000" };
    }

    return { valid: true, error: null };
}

/**
 * Valida una query de busqueda.
 * @param {string} query - Texto de busqueda
 * @returns {{valid: boolean, error: string|null}} Objeto con resultado de validacion
 */
function validateSearchQuery(query) {
    if (!query || !query.trim()) {
        return { valid: false, error: "La busqueda no puede estar vacia" };
    }

    if (query.length > 100) {
        return { valid: false, error: "La busqueda no puede exceder 100 caracteres" };
    }

    return { valid: true, error: null };
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.Validators = {
        validateProductData,
        validateSearchQuery
    };
}
