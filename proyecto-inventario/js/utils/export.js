/**
 * Utilidades de exportacion de datos.
 *
 * BUG INTENCIONAL: El encoding UTF-8 sin BOM causa problemas
 * en Windows Excel con caracteres especiales (n, a, etc.)
 */

/**
 * Exporta productos a formato CSV.
 * @param {Product[]} products - Lista de productos a exportar
 * @returns {string} String del archivo CSV
 *
 * BUG: Este codigo no incluye BOM (Byte Order Mark) para UTF-8,
 * lo que causa que caracteres especiales se vean mal en Excel Windows.
 */
function exportToCSV(products) {
    const rows = [];

    // Escribir header
    rows.push(['ID', 'Nombre', 'Stock', 'Precio', 'Ultima Actualizacion']);

    // Escribir datos
    for (const product of products) {
        rows.push([
            product.id,
            product.name,
            product.stock,
            product.price,
            product.lastUpdated
        ]);
    }

    // Convertir a CSV
    const csvContent = rows.map(row =>
        row.map(cell => {
            // Escapar comillas dobles y envolver en comillas si contiene comas
            const cellStr = String(cell);
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                return '"' + cellStr.replace(/"/g, '""') + '"';
            }
            return cellStr;
        }).join(',')
    ).join('\n');

    // BUG INTENCIONAL: UTF-8 sin BOM
    // Solucion correcta seria: '\uFEFF' + csvContent
    // Pero dejamos solo csvContent para la demo de debugging
    return csvContent;
}

/**
 * Descarga el archivo CSV.
 * @param {Product[]} products - Lista de productos a exportar
 * @param {string} filename - Nombre del archivo
 */
function downloadCSV(products, filename = 'productos.csv') {
    const csvContent = exportToCSV(products);

    // Crear blob y link de descarga
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.ExportUtils = {
        exportToCSV,
        downloadCSV
    };
}
