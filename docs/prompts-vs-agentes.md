# Prompts vs Agentes en Claude Code

## ¿Qué es cada uno?

### Prompt
Un **prompt** es simplemente texto de instrucciones que se envía a Claude en una única interacción. Es estático y se ejecuta una vez.

```
User: "Revisa este código y encuentra errores"
Claude: [Lee, analiza, responde]
```

### Agente
Un **agente** es una instancia autónoma de Claude que:
- Usa un prompt como base (su "personalidad")
- Ejecuta múltiples turnos de forma independiente
- Usa herramientas (Read, Grep, Bash, Edit, etc.)
- Toma decisiones sobre qué hacer a continuación
- Trabaja hasta completar la tarea asignada

```
User: [Lanza agente security-auditor]
Agente: [Lee archivos] → [Busca patrones] → [Analiza vulnerabilidades] →
        [Lee más archivos] → [Ejecuta comandos] → [Genera reporte]
```

## Diferencias Clave

| Aspecto | Prompt | Agente |
|---------|--------|--------|
| **Turnos** | Único | Múltiples (hasta max_turns) |
| **Autonomía** | Depende de ti | Autónomo |
| **Herramientas** | Las usas tú | Las usa él |
| **Decisiones** | Tú decides qué hacer | Él decide qué explorar |
| **Contexto** | Lineal | Acumula contexto de su exploración |
| **Resultado** | Respuesta inmediata | Reporte estructurado final |

## Cuándo Usar Cada Uno

### Usa un Prompt cuando:
- ✅ La tarea es simple y directa
- ✅ Sabes exactamente qué archivos necesitas
- ✅ Solo necesitas una respuesta rápida
- ✅ Quieres control total del flujo
- ✅ Es una pregunta puntual

**Ejemplos:**
- "Explica esta función"
- "Corrige este error de sintaxis"
- "¿Qué hace este código?"
- "Añade un comentario aquí"

### Usa un Agente cuando:
- ✅ La tarea requiere exploración del codebase
- ✅ No sabes dónde está el código relevante
- ✅ Necesitas análisis multi-archivo
- ✅ La tarea tiene múltiples pasos
- ✅ Quieres un análisis exhaustivo
- ✅ El resultado debe ser estructurado

**Ejemplos:**
- "Audita la seguridad de mi API"
- "Encuentra todas las referencias a esta función"
- "Refactoriza este módulo monolítico"
- "Analiza el flujo de autenticación completo"
- "Busca patrones de código duplicado"

## Ventajas e Inconvenientes

### Prompts

**Ventajas:**
- ⚡ **Rápidos**: Respuesta inmediata
- 🎯 **Precisos**: Control total del contexto
- 💰 **Económicos**: Menos tokens consumidos
- 🔍 **Transparentes**: Ves cada paso
- 🛠️ **Flexibles**: Cambias de dirección fácilmente

**Inconvenientes:**
- 🔧 **Manual**: Tú haces el trabajo de exploración
- 📊 **Limitado**: Solo procesa lo que le das
- 🔄 **Iterativo**: Requiere múltiples interacciones
- 🧠 **Carga mental**: Tú decides qué buscar

### Agentes

**Ventajas:**
- 🤖 **Autónomos**: Trabajan sin supervisión
- 🔎 **Exploratorios**: Encuentran código relevante solos
- 📋 **Estructurados**: Resultados organizados y completos
- 🎯 **Especializados**: Metodología experta incorporada
- 📚 **Exhaustivos**: Analizan todo lo necesario

**Inconvenientes:**
- ⏱️ **Lentos**: Múltiples turnos toman tiempo
- 💸 **Costosos**: Consumen más tokens
- 🎭 **Opacos**: No ves el trabajo interno en tiempo real
- 🎲 **Variables**: El resultado puede variar
- 🚫 **Menos control**: Decide su propio camino

## Arquitectura de un Agente

Cuando creas un archivo en `.claude/agents/`:

```markdown
---
name: mi-agente
description: "Descripción de cuándo usarlo"
model: sonnet  # o haiku, opus
color: green
---

Instrucciones del agente...
```

Este archivo define:
1. **Identidad**: Nombre y propósito
2. **Metodología**: Cómo debe trabajar
3. **Salida**: Formato de resultados
4. **Expertise**: Conocimiento especializado

Cuando lo invocas:
```javascript
Task({
  subagent_type: "mi-agente",
  prompt: "Analiza el módulo de autenticación"
})
```

Claude Code:
1. Lee el archivo `.md`
2. Crea una nueva sesión
3. Usa el contenido como system prompt
4. Da acceso a todas las herramientas
5. Deja al agente trabajar autónomamente
6. Devuelve el resultado final

## Estrategia Híbrida

Lo óptimo es **combinar ambos**:

1. **Usa prompts** para tareas rápidas y exploración inicial
2. **Lanza agentes** cuando identifies tareas complejas
3. **Revisa resultados** del agente
4. **Usa prompts** para refinar detalles específicos

**Ejemplo de flujo:**
```
[Prompt] "¿Dónde está el código de autenticación?"
Claude: "En src/auth/"

[Agente security-auditor] "Audita src/auth/"
Agente: [Genera reporte completo]

[Prompt] "Explica más sobre la vulnerabilidad #3"
Claude: [Detalle específico]

[Prompt] "Corrígela"
Claude: [Aplica fix específico]
```

## Agentes Disponibles en Claude Code

Los agentes especializados incluyen:

- **Bash**: Operaciones de terminal
- **general-purpose**: Tareas multi-paso
- **Explore**: Exploración rápida de codebase
- **Plan**: Arquitectura de implementación
- **security-auditor**: Auditorías de seguridad
- **express-refactor-specialist**: Refactoring Node.js/Express
- **coolify-deployment-advisor**: Deploy con Coolify

Cada uno tiene su expertise y herramientas optimizadas.

## Conclusión

**Prompt = Control y velocidad**
**Agente = Autonomía y profundidad**

La clave es saber cuándo necesitas **rapidez y precisión** (prompt) vs cuándo necesitas **exploración exhaustiva y análisis completo** (agente).

---

*Piensa en los prompts como consultas SQL directas, y en los agentes como procesos ETL completos.*