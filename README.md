# Curso: Introducción a Claude Code

Material del curso de introducción a Claude Code. Este repositorio contiene todo lo que necesitas para seguir el curso y practicar después.

## Estructura del Repositorio

```
.
├── README.md                    # Este archivo
├── .claude/                     # Ejemplos de configuración de Claude Code
│   ├── agents/                  # Agentes personalizados de ejemplo
│   └── commands/                # Skills (comandos) personalizados de ejemplo
├── proyecto-inventario/         # Proyecto de práctica
│   ├── index.html              # Abrir en navegador para usar la app
│   ├── css/
│   └── js/
└── docs/                        # Material del curso
    ├── Syllabus.md             # Contenido completo del curso
    ├── FLUJOS.md               # Flujos de trabajo con Claude Code
    ├── prompts-vs-agentes.md   # Diferencia entre prompts y agentes
    └── ejercicios.md           # Ejercicios para practicar
```

## Antes del Curso

### 1. Instala el software necesario

- **VS Code**: [code.visualstudio.com](https://code.visualstudio.com/)
- **Extensión Claude Code**: Busca "Claude Code" en el marketplace de VS Code

### 2. Autentícate en Claude Code

1. Abre VS Code
2. Abre el panel de Claude Code (barra lateral)
3. Escribe `/login`
4. Sigue el enlace y autentica tu cuenta
5. Copia el token y pégalo en Claude Code

Si ves el chat de Claude esperando tu mensaje, estás listo.

### 3. Prueba el proyecto de práctica

1. Abre `proyecto-inventario/index.html` en tu navegador
2. Deberías ver una aplicación de inventario con productos de ejemplo
3. Prueba crear, editar y eliminar productos

## Durante el Curso

Sigue el material en [docs/Syllabus.md](docs/Syllabus.md). El instructor te guiará por las secciones y demos.

## Después del Curso

### Para practicar

1. Haz los ejercicios en [docs/ejercicios.md](docs/ejercicios.md)
2. Empieza por el Nivel 1 y progresa a tu ritmo
3. Aplica lo aprendido en tus proyectos reales

### Material de referencia

- [Syllabus.md](docs/Syllabus.md) — Contenido completo del curso
- [FLUJOS.md](docs/FLUJOS.md) — Flujos de trabajo recomendados (PIV loop)
- [prompts-vs-agentes.md](docs/prompts-vs-agentes.md) — Cuándo usar prompts vs agentes
- [ejercicios.md](docs/ejercicios.md) — Ejercicios prácticos por nivel

## El Proyecto de Práctica

`proyecto-inventario/` es una aplicación de gestión de inventario construida con HTML, JavaScript y Bootstrap. Incluye:

- CRUD completo de productos
- Búsqueda y filtrado
- Exportación a CSV
- Persistencia con localStorage

El proyecto tiene algunos **bugs intencionales** y **código legacy** para practicar debugging y refactoring con Claude Code:

| Bug/Issue | Ubicación | Descripción |
|-----------|-----------|-------------|
| Encoding CSV | `js/utils/export.js` | Caracteres especiales se ven mal en Excel |
| Código legacy | `js/services/inventoryService.js` | Función `doStuff()` con nombres confusos |
| Búsqueda case-sensitive | `js/services/inventoryService.js` | "laptop" no encuentra "Laptop" |

## Recursos Externos

- [Documentación oficial de Claude Code](https://docs.anthropic.com/claude-code)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) — Curso oficial de Anthropic

## Principios Clave del Curso

1. **Prompt claro = menos iteraciones**
2. **Planea antes de codear** (para tareas no triviales)
3. **Siempre verifica** el código generado
4. **Nueva conversación por feature**
5. **Tú eres responsable del código**, no Claude

---

*Material del curso de Introducción a Claude Code*
