/**
 * Modelo de producto.
 */

class Product {
    /**
     * Representa un producto en el inventario.
     *
     * @param {string} name - Nombre del producto
     * @param {number} stock - Cantidad disponible en inventario
     * @param {number} price - Precio unitario del producto
     * @param {number|null} id - Identificador unico del producto
     * @param {string|null} lastUpdated - Timestamp de ultima actualizacion
     */
    constructor(name, stock, price, id = null, lastUpdated = null) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.lastUpdated = lastUpdated || new Date().toISOString();
    }

    /**
     * Convierte el producto a objeto JSON.
     * @returns {Object} Objeto con los datos del producto
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            stock: this.stock,
            price: this.price,
            lastUpdated: this.lastUpdated
        };
    }

    /**
     * Crea un producto desde un objeto JSON.
     * @param {Object} data - Objeto con los datos del producto
     * @returns {Product} Instancia de Product
     */
    static fromJSON(data) {
        return new Product(
            data.name,
            data.stock,
            data.price,
            data.id || null,
            data.lastUpdated || null
        );
    }
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.Product = Product;
}