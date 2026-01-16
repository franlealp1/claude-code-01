/**
 * Aplicacion principal del Inventory Manager.
 * Maneja la interfaz de usuario y eventos.
 */

// Referencias a elementos del DOM
let productsTableBody;
let searchInput;
let productModal;
let deleteModal;
let alertContainer;

// Estado de la aplicacion
let currentProducts = [];

/**
 * Inicializa la aplicacion cuando el DOM esta listo.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a elementos
    productsTableBody = document.getElementById('productsTableBody');
    searchInput = document.getElementById('searchInput');
    alertContainer = document.getElementById('alertContainer');

    // Inicializar modales de Bootstrap
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    // Inicializar datos si la base de datos esta vacia
    if (SeedData.initializeIfEmpty()) {
        showAlert('Datos de ejemplo cargados correctamente', 'success');
    }

    // Cargar productos
    loadProducts();

    // Event listeners
    setupEventListeners();
});

/**
 * Configura todos los event listeners.
 */
function setupEventListeners() {
    // Boton nuevo producto
    document.getElementById('addProductBtn').addEventListener('click', openNewProductModal);

    // Boton guardar producto
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);

    // Boton exportar CSV
    document.getElementById('exportCsvBtn').addEventListener('click', exportProducts);

    // Boton reiniciar datos
    document.getElementById('resetDataBtn').addEventListener('click', resetData);

    // Busqueda
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    document.getElementById('clearSearchBtn').addEventListener('click', clearSearch);

    // Confirmar eliminacion
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);

    // Validacion en tiempo real del formulario
    document.getElementById('productName').addEventListener('input', validateForm);
    document.getElementById('productStock').addEventListener('input', validateForm);
    document.getElementById('productPrice').addEventListener('input', validateForm);

    // Enviar formulario con Enter
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProduct();
    });
}

/**
 * Carga y muestra todos los productos.
 */
function loadProducts() {
    currentProducts = InventoryService.getAllProducts();
    renderProducts(currentProducts);
    updateStatistics(currentProducts);
}

/**
 * Renderiza la tabla de productos.
 * @param {Product[]} products - Array de productos a mostrar
 */
function renderProducts(products) {
    if (products.length === 0) {
        productsTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">
                    <i class="bi bi-inbox display-4"></i>
                    <p class="mt-2">No hay productos para mostrar</p>
                </td>
            </tr>
        `;
        document.getElementById('productsCount').textContent = '0 productos';
        return;
    }

    productsTableBody.innerHTML = products.map(product => {
        const stockClass = getStockClass(product.stock);
        const formattedDate = formatDate(product.lastUpdated);
        const formattedPrice = formatCurrency(product.price);

        return `
            <tr>
                <td>${product.id}</td>
                <td>${escapeHtml(product.name)}</td>
                <td><span class="badge ${stockClass}">${product.stock}</span></td>
                <td>${formattedPrice}</td>
                <td><small class="text-muted">${formattedDate}</small></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${product.id})" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProductConfirm(${product.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    document.getElementById('productsCount').textContent =
        `${products.length} producto${products.length !== 1 ? 's' : ''}`;
}

/**
 * Actualiza las estadisticas mostradas.
 * @param {Product[]} products - Array de productos
 */
function updateStatistics(products) {
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;
    const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);

    document.getElementById('statTotalProducts').textContent = totalProducts;
    document.getElementById('statTotalStock').textContent = totalStock.toLocaleString();
    document.getElementById('statLowStock').textContent = lowStock;
    document.getElementById('statTotalValue').textContent = formatCurrency(totalValue);
}

/**
 * Abre el modal para crear un nuevo producto.
 */
function openNewProductModal() {
    document.getElementById('productModalLabel').textContent = 'Nuevo Producto';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    clearFormValidation();
    productModal.show();
}

/**
 * Abre el modal para editar un producto existente.
 * @param {number} productId - ID del producto a editar
 */
function editProduct(productId) {
    const product = InventoryService.getProductById(productId);
    if (!product) {
        showAlert('Producto no encontrado', 'danger');
        return;
    }

    document.getElementById('productModalLabel').textContent = 'Editar Producto';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price;
    clearFormValidation();
    productModal.show();
}

/**
 * Guarda un producto (crear o actualizar).
 */
function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    // Validar datos
    const validation = Validators.validateProductData(name, stock, price);
    if (!validation.valid) {
        showAlert(validation.error, 'danger');
        return;
    }

    try {
        if (id) {
            // Actualizar producto existente
            InventoryService.updateProduct(parseInt(id), name, stock, price);
            showAlert('Producto actualizado correctamente', 'success');
        } else {
            // Crear nuevo producto
            InventoryService.createProduct(name, stock, price);
            showAlert('Producto creado correctamente', 'success');
        }

        productModal.hide();
        loadProducts();
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

/**
 * Muestra el modal de confirmacion para eliminar un producto.
 * @param {number} productId - ID del producto a eliminar
 */
function deleteProductConfirm(productId) {
    const product = InventoryService.getProductById(productId);
    if (!product) {
        showAlert('Producto no encontrado', 'danger');
        return;
    }

    document.getElementById('deleteProductId').value = product.id;
    document.getElementById('deleteProductName').textContent = product.name;
    deleteModal.show();
}

/**
 * Confirma y ejecuta la eliminacion del producto.
 */
function confirmDelete() {
    const productId = parseInt(document.getElementById('deleteProductId').value);

    try {
        if (InventoryService.deleteProduct(productId)) {
            showAlert('Producto eliminado correctamente', 'success');
        } else {
            showAlert('No se pudo eliminar el producto', 'warning');
        }
        deleteModal.hide();
        loadProducts();
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

/**
 * Maneja la busqueda de productos.
 */
function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        loadProducts();
        return;
    }

    const validation = Validators.validateSearchQuery(query);
    if (!validation.valid) {
        showAlert(validation.error, 'warning');
        return;
    }

    const results = InventoryService.searchProducts(query);
    renderProducts(results);
    document.getElementById('productsCount').textContent =
        `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`;
}

/**
 * Limpia la busqueda.
 */
function clearSearch() {
    searchInput.value = '';
    loadProducts();
}

/**
 * Exporta los productos a CSV.
 */
function exportProducts() {
    const products = InventoryService.getAllProducts();
    if (products.length === 0) {
        showAlert('No hay productos para exportar', 'warning');
        return;
    }

    ExportUtils.downloadCSV(products, 'inventario.csv');
    showAlert('Archivo CSV descargado', 'success');
}

/**
 * Reinicia los datos de ejemplo.
 */
function resetData() {
    if (confirm('Esta seguro de que desea reiniciar todos los datos? Se perderan todos los cambios.')) {
        SeedData.seedProducts();
        loadProducts();
        showAlert('Datos reiniciados correctamente', 'success');
    }
}

/**
 * Valida el formulario en tiempo real.
 */
function validateForm() {
    const name = document.getElementById('productName').value.trim();
    const stock = parseInt(document.getElementById('productStock').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;

    // Validar nombre
    const nameInput = document.getElementById('productName');
    if (name && name.length > 200) {
        nameInput.classList.add('is-invalid');
        document.getElementById('productNameError').textContent = 'Maximo 200 caracteres';
    } else {
        nameInput.classList.remove('is-invalid');
    }

    // Validar stock
    const stockInput = document.getElementById('productStock');
    if (stockInput.value !== '' && stock < 0) {
        stockInput.classList.add('is-invalid');
        document.getElementById('productStockError').textContent = 'No puede ser negativo';
    } else {
        stockInput.classList.remove('is-invalid');
    }

    // Validar precio
    const priceInput = document.getElementById('productPrice');
    if (priceInput.value !== '' && (price <= 0 || price > 1000000)) {
        priceInput.classList.add('is-invalid');
        document.getElementById('productPriceError').textContent = 'Debe ser entre 0.01 y 1,000,000';
    } else {
        priceInput.classList.remove('is-invalid');
    }
}

/**
 * Limpia la validacion del formulario.
 */
function clearFormValidation() {
    document.querySelectorAll('#productForm .is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
}

// ===================
// UTILIDADES
// ===================

/**
 * Muestra una alerta temporal.
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;

    alertContainer.innerHTML = alertHtml;

    // Auto-cerrar despues de 5 segundos
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            bsAlert.close();
        }
    }, 5000);
}

/**
 * Determina la clase CSS para el badge de stock.
 * @param {number} stock - Cantidad de stock
 * @returns {string} Clase CSS
 */
function getStockClass(stock) {
    if (stock === 0) return 'bg-danger';
    if (stock < 10) return 'bg-warning text-dark';
    return 'bg-success';
}

/**
 * Formatea una fecha ISO a formato legible.
 * @param {string} isoDate - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Formatea un numero como moneda.
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Escapa caracteres HTML para prevenir XSS.
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Funcion debounce para limitar llamadas frecuentes.
 * @param {Function} func - Funcion a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Funcion con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
