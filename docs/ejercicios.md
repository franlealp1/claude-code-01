# Ejercicios Prácticos - Curso Claude Code (HTML/JavaScript)

## IMPORTANTE: Version HTML/JavaScript
Estos ejercicios usan la version HTML/JavaScript del proyecto. Solo necesitas un navegador moderno.

## Ejercicio Durante el Curso (18 minutos)

### Objetivo
Escribir un PRD simple y ver a Claude implementarlo.

### Instrucciones

1. **Elige UNA de estas opciones:**
   - **Opción A (Simple):** Agregar campo "categoría" a productos
   - **Opción B (Media):** Sistema de alertas cuando stock < 10
   - **Opción C (Avanzada):** Tu propio problema (si trajiste código)

2. **Escribe el PRD (5-7 minutos)**

Usa este template:

```markdown
# Feature: [Nombre descriptivo]

## Objetivo
¿Qué problema resuelve? ¿Para quién?

## Requisitos Funcionales
1. [Requisito específico]
2. [Requisito específico]
3. [Requisito específico]

## Casos de uso
- Usuario normal: [qué puede hacer]
- Caso de error: [qué pasa si...]

## Success criteria
- [¿Cómo verifico que funciona?]
```

3. **Dale el PRD a Claude (10 minutos)**
   - Copia tu PRD completo
   - Pégalo en Claude Code
   - Si Claude pregunta algo, responde
   - Deja que implemente

4. **No importa si no termina**
   - El objetivo es ver el PROCESO
   - Si terminas rápido: pide a Claude que agregue validaciones
   - Si Claude pregunta mucho: tu PRD fue muy vago (aprende de eso)

---

## Ejercicios POST-CURSO (Para practicar)

### Nivel 1: Primeros pasos (Día 1-3)

#### Ejercicio 1.1: Exploración de código
**Tiempo:** 10 minutos

1. Abre el proyecto `proyecto-inventario` en VSCode
2. Pregúntale a Claude:
   ```
   Explícame la arquitectura de este proyecto HTML/JavaScript.
   ¿Cómo fluyen los datos desde la interfaz hasta localStorage?
   ```
3. Pídele que te muestre un ejemplo de flujo completo:
   ```
   Muéstrame el flujo completo de cuando un usuario crea un producto:
   desde el formulario HTML hasta el guardado en localStorage
   ```

**Objetivo:** Familiarizarte con cómo Claude lee y entiende proyectos.

---

#### Ejercicio 1.2: Crear tu primer claude.md
**Tiempo:** 15 minutos

1. Crea un archivo `claude.md` en la carpeta `proyecto-inventario/`
2. Incluye (mínimo):
   - Arquitectura general (HTML + JS + localStorage)
   - Tecnologías usadas (Vanilla JS, Bootstrap, localStorage)
   - 3 reglas de código que quieres que Claude respete
   - 2 cosas que Claude NO debe hacer

Ejemplo:
```markdown
# Proyecto Inventory Manager

## Stack
- HTML5 + JavaScript ES6+ (Vanilla JS, sin frameworks)
- Bootstrap 5.3 via CDN
- localStorage para persistencia

## Reglas de Código
- Usa ES6+: const/let (nunca var)
- Funciones flecha cuando sea apropiado
- Naming: camelCase para funciones y variables

## NO hacer
- NO usar jQuery
- NO agregar frameworks adicionales
```

3. Pregúntale a Claude:
   ```
   ¿Qué convenciones de código debo seguir según nuestro claude.md?
   ```

**Objetivo:** Documentar tu proyecto para Claude.

---

#### Ejercicio 1.3: Refactoring simple
**Tiempo:** 15 minutos

En el proyecto `proyecto-inventario`:

1. Encuentra la función `doStuff()` en `js/services/inventoryService.js`
2. Pide a Claude:
   ```
   Refactoriza la función doStuff() en js/services/inventoryService.js:
   - Nombres descriptivos para variables y parámetros
   - Comentario JSDoc apropiado
   - Lógica más clara
   - Siguiendo las convenciones del proyecto
   ```

3. **IMPORTANTE:** Lee el código que genera
4. Si tiene sentido, acéptalo
5. Verifica abriendo `index.html` en tu navegador y probando que todo funciona

**Objetivo:** Primera modificación de código con Claude.

---

### Nivel 2: Desarrollo asistido (Semana 1)

#### Ejercicio 2.1: Implementar búsqueda case-insensitive
**Tiempo:** 30 minutos

**Problema:** La búsqueda actual es case-sensitive (buscar "laptop" no encuentra "Laptop")

1. **Escribe un PRD:**
```markdown
# Feature: Búsqueda case-insensitive

## Objetivo
Permitir que usuarios busquen productos sin preocuparse por mayúsculas/minúsculas

## Requisitos Funcionales
1. Búsqueda debe funcionar independiente de mayúsculas
2. "laptop", "LAPTOP", "Laptop" deben dar mismos resultados
3. Mantener funcionalidad actual (búsqueda parcial)

## Casos de uso
- Usuario busca "laptop": encuentra "Laptop HP" y "Laptop Dell"
- Usuario busca "MOUSE": encuentra "Mouse Inalámbrico"

## Technical Details
- Modificar función searchProducts() en js/services/inventoryService.js
- Usar .toLowerCase() en ambos lados de la comparación

## Success criteria
- Buscar "laptop" encuentra productos con "Laptop", "LAPTOP", etc.
- La búsqueda sigue siendo parcial (buscar "lap" encuentra "Laptop")
- Todos los productos existentes funcionan correctamente
```

2. Dale el PRD a Claude
3. Implementa
4. **Verifica:**
   - Abre `index.html` en navegador
   - Busca "laptop" (minúsculas)
   - Debe encontrar "Laptop HP Pavilion"
   - Busca "MOUSE"
   - Debe encontrar "Mouse Inalámbrico"

**Objetivo:** Feature completa con PRD + implementación + verificación.

---

#### Ejercicio 2.2: Agregar campo "categoría"
**Tiempo:** 45 minutos

1. **Escribe un PRD completo** (no te saltes esto)
   - Agregar campo `category` a productos
   - Categorías predefinidas: "Electrónica", "Oficina", "Accesorios", "Otros"
   - Validación de categoría válida en validators.js
   - Agregar campo al formulario en index.html
   - Mostrar categoría en la tabla
   - Permitir filtrar por categoría

2. **Usa Plan Mode:**
   ```
   [Pega tu PRD]

   Antes de implementar, analiza el proyecto (especialmente js/models/product.js, js/app.js e index.html) y proponme un plan detallado.
   ```

3. Revisa el plan
4. Si está bien, pide implementación
5. **Verifica:**
   - Abre index.html
   - Crea producto con categoría
   - Verifica que se guarda en localStorage
   - Recarga página y verifica que persiste
   - Edita producto y cambia categoría

**Objetivo:** Flujo completo con plan mode.

---

#### Ejercicio 2.3: Fixear el bug del CSV
**Tiempo:** 30 minutos

**Problema:** El export CSV no muestra correctamente caracteres especiales en Excel Windows

1. Reproduce el bug:
   - Abre `index.html` en navegador
   - Exporta CSV
   - Abre el archivo en Excel (Windows) o editor de texto
   - Busca productos con ñ, á, é
   - Verás caracteres rotos

2. Abre `js/utils/export.js` y lee el comentario sobre el bug

3. Documenta el problema en formato bug report

4. Pide a Claude que lo fixee:
   ```
   [Tu bug report]

   Por favor:
   1. Identifica el problema en js/utils/export.js
   2. Explica por qué falta el BOM para UTF-8
   3. Implementa el fix agregando BOM ('\uFEFF')
   4. Explica cómo verificar que funciona
   ```

5. **Verifica:**
   - Exporta CSV de nuevo
   - Abre en Excel o editor de texto
   - Los caracteres especiales deben verse correctamente
   - En editor hex, los primeros 3 bytes deben ser: EF BB BF

**Objetivo:** Debugging completo con Claude.

---

### Nivel 3: Proyectos reales (Semana 2+)

#### Ejercicio 3.1: Implementar sistema de alertas
**Tiempo:** 1-2 horas

**Feature:** Detectar productos con stock bajo y mostrar alerta visual

1. Escribe PRD completo que incluya:
   - Definición de "stock bajo" (< 10 unidades)
   - Panel de alertas en la interfaz (card de Bootstrap)
   - Mostrar lista de productos con stock bajo
   - Badge visual en la tabla para productos con alerta
   - Contador de alertas en el header

2. Usa plan mode

3. Implementa

4. **Bonus:**
   - Hacer el umbral configurable (guardar en localStorage)
   - Agregar notificación visual cuando hay nuevas alertas

**Objetivo:** Feature completa end-to-end.

---

#### Ejercicio 3.2: Crear tu primer agente (Avanzado)
**Tiempo:** 2-3 horas

**Objetivo:** Agente Node.js que ejecuta ESLint y genera reporte

1. Crea archivo `agents/code-quality-checker.js`

2. El agente debe:
   - Ejecutar ESLint en todos los archivos JS
   - Leer el reporte de errores
   - Identificar archivos con más problemas
   - Usar Claude API para analizar patrones comunes
   - Generar reporte markdown con sugerencias

3. **Estructura base:**
```javascript
import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'child_process';
import fs from 'fs';

function runESLint() {
    try {
        const result = execSync('npx eslint js/**/*.js --format json', {
            encoding: 'utf8'
        });
        return JSON.parse(result);
    } catch (error) {
        // ESLint retorna error cuando hay problemas
        return JSON.parse(error.stdout);
    }
}

async function analyzeWithClaude(eslintResults) {
    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    const prompt = `Analiza estos resultados de ESLint:

${JSON.stringify(eslintResults, null, 2)}

Genera un reporte estructurado que incluya:
1. Resumen de problemas por severidad
2. Top 5 archivos con más problemas
3. Patrones comunes de errores
4. Recomendaciones priorizadas`;

    const message = await client.messages.create({
        model: 'claude-sonnet-4.5',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
    });

    return message.content[0].text;
}

async function main() {
    console.log('Ejecutando ESLint...');
    const results = runESLint();

    console.log('Analizando con Claude...');
    const analysis = await analyzeWithClaude(results);

    fs.writeFileSync('code-quality-report.md', analysis);
    console.log('Reporte generado: code-quality-report.md');
}

main();
```

4. Requisitos previos:
   ```bash
   npm init -y
   npm install @anthropic-ai/sdk
   npm install --save-dev eslint
   export ANTHROPIC_API_KEY=tu_api_key
   ```

5. Ejecútalo:
   ```bash
   node agents/code-quality-checker.js
   ```

**Objetivo:** Primer agente autónomo funcional.

---

#### Ejercicio 3.3: Usa Claude en tu proyecto real
**Tiempo:** Variable

1. **Elige una tarea de tu trabajo real:**
   - Refactoring que venías posponiendo
   - Bug que no entiendes bien
   - Feature pequeña nueva
   - Documentación faltante

2. **Aplica lo aprendido:**
   - Escribe PRD si es feature nueva
   - Usa plan mode si no es trivial
   - Deja que Claude implemente
   - **VERIFICA TODO**

3. **Documenta:**
   - ¿Cuánto tiempo ahorró Claude?
   - ¿Qué partes hizo bien?
   - ¿Qué tuviste que corregir?
   - ¿Lo volverías a usar?

**Objetivo:** Validar utilidad en tu contexto real.

---

## Checklist de Progreso

Marca lo que has completado:

### Nivel 1 (Primeros días)
- [ ] Ejercicio 1.1: Exploración de código
- [ ] Ejercicio 1.2: Crear claude.md
- [ ] Ejercicio 1.3: Refactoring simple

### Nivel 2 (Primera semana)
- [ ] Ejercicio 2.1: Búsqueda case-insensitive
- [ ] Ejercicio 2.2: Agregar categoría
- [ ] Ejercicio 2.3: Fixear bug CSV

### Nivel 3 (Semana 2+)
- [ ] Ejercicio 3.1: Sistema de alertas
- [ ] Ejercicio 3.2: Primer agente (opcional)
- [ ] Ejercicio 3.3: Proyecto real

---

## Tips para los Ejercicios

**Antes de empezar:**
- Lee el ejercicio completo
- Entiende el objetivo
- Ten claro cómo verificar si funciona

**Durante:**
- Lee el código que Claude genera (SIEMPRE)
- Si no entiendes algo, pregúntale a Claude
- Verifica cada paso en el navegador

**Verificación:**
- Abre index.html en tu navegador
- Prueba la funcionalidad manualmente
- Verifica la consola del navegador (F12) para errores
- Recarga la página para verificar persistencia

**Después:**
- Prueba todos los casos de uso
- Verifica que no rompiste nada existente
- Si funciona, haz commit

**Si te atascas:**
- Revisa las notas del curso
- Abre la consola del navegador y busca errores
- Pregunta a Claude: "¿Qué estoy haciendo mal?"
- Simplifica el ejercicio

---

## Debugging en JavaScript

### Consola del Navegador (F12)
```javascript
// Ver datos de localStorage
console.log(localStorage.getItem('inventory_products'));

// Ver productos parseados
const products = JSON.parse(localStorage.getItem('inventory_products'));
console.table(products);

// Limpiar localStorage
localStorage.clear();

// Agregar breakpoint en código
debugger;
```

### Tips de Debugging
- Usa `console.log()` liberalmente para ver qué está pasando
- Usa `console.table()` para ver arrays de objetos
- Usa la pestaña "Application" → "Local Storage" en DevTools
- Usa `debugger;` para pausar ejecución

---

## Recursos Adicionales

**Documentación:**
- Claude Code: https://docs.anthropic.com/claude-code
- Claude API: https://docs.anthropic.com/en/api
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- Bootstrap 5: https://getbootstrap.com/docs/5.3/

**Comunidad:**
- GitHub Issues: https://github.com/anthropics/claude-code/issues

**Proyecto del curso:**
- Proyecto completo en: `proyecto-inventario/`
- README del curso en: `README-CURSO.md`

---

## Diferencias HTML/JS vs Python

| Aspecto | Python (original) | HTML/JS (esta version) |
|---------|-------------------|------------------------|
| Tests | pytest | Pruebas manuales en navegador |
| Base de datos | SQLite | localStorage |
| Servidor | Flask | No necesario (file://) |
| Debugging | pdb, print() | console.log(), debugger |
| Verificación | pytest -v | Abrir index.html y probar |

---

## Feedback

Si encuentras errores en los ejercicios o tienes sugerencias:
- Anótalas para la próxima revisión del curso
- Comparte con el instructor

¡Éxito con la práctica!
