

# 🌦️ Proyecto 34 EBAC El Tiempo de tus Ciudades

Aplicación web desarrollada en **React** que muestra el **pronóstico del tiempo** de varias ciudades del mundo utilizando la API pública de **[OpenWeather](https://home.openweathermap.org/)**.  
La aplicación cuenta con un listado inicial de 9 ciudades y la posibilidad de buscar cualquier ciudad del mundo para visualizar su información meteorológica actual y pronóstico a varios días.

---

## 📌 Características principales

- **Listado de ciudades predeterminadas** con información meteorológica:
  - Ciudad de México
  - La Habana
  - Miami
  - New York
  - Vancouver
  - Madrid
  - Londres
  - Beijing
  - Sidney
- **Búsqueda de ciudades** por nombre mediante un campo de búsqueda.
- **Pronóstico extendido** de varios días para cada ciudad.
- **Información meteorológica detallada**:
  - 🌡️ Temperatura
  - ☁️ Cobertura Nubosa
  - 💧 Humedad
  - 🌬️ Velocidad del Viento
- **Interfaz responsiva** para PC, Tablet y Teléfono.
- **Gestión de estado global** con Redux Toolkit.
- **Estilizado moderno** usando `styled-components`.
- **Rutas dinámicas** con `react-router-dom`.
- **Pruebas unitarias y de integración** con Jest.

---

## 🛠️ Tecnologías utilizadas

- **React 18+** (Componentes funcionales y Hooks)
- **React Router DOM** (Rutas y navegación)
- **Redux Toolkit** (Manejo de estado global)
- **styled-components** (CSS-in-JS)
- **Jest** (Pruebas)
- **OpenWeather API** (Datos meteorológicos en tiempo real)

---

## 📂 Estructura de componentes

```

src/
├── components/
│   ├── Header.js
│   ├── Search.js
│   ├── Card.js
│   ├── SearchResult.js
│   └── Footer.js
├── redux/
│   ├── store.js
│   ├── weatherSlice.js
│   └── index.js
├── services/
│   └── weatherAPI.js
├── utils/
│   └── constants.js
├── tests/
│   ├── App.test.js
│   ├── Header.test.js
│   └── Card.test.js
├── App.js
├── App.css
└── index.js

````

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tuusuario/el-tiempo-ciudades.git
   cd el-tiempo-ciudades
````

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar la API Key**

   * Crea una cuenta en [OpenWeather](https://home.openweathermap.org/)
   * Copia tu API Key y agrégala en un archivo `.env`:

     ```
     REACT_APP_OPENWEATHER_API_KEY=tu_api_key
     ```

4. **Ejecutar en modo desarrollo**

   ```bash
   npm start
   ```

5. **Construir versión de producción**

   ```bash
   npm run build
   ```

---

## 🔀 Rutas principales

* `/` → Página principal con las 9 ciudades predeterminadas
* `/ciudad/:nombre` → Detalle del clima y pronóstico de una ciudad
* `/busqueda` → Resultados de búsqueda

---

## 🧪 Pruebas con Jest

El proyecto incluye **tests unitarios y de integración** para garantizar su funcionamiento.

Ejecutar las pruebas:

```bash
npm test
```

Ejemplos de pruebas:

* Renderizado correcto de componentes (Header, Footer, Card).
* Funcionamiento del buscador de ciudades.
* Llamadas a la API y manejo de errores.
* Navegación entre rutas.

---

## 📱 Diseño responsivo

La interfaz está optimizada para:

* 🖥️ Escritorio
* 📱 Dispositivos móviles
* 📟 Tablets

Esto se logra gracias al uso de **styled-components** y diseño **flex/grid**.

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Puedes usarlo y modificarlo libremente para fines educativos o personales.

---

## 👨‍💻 Autor

Desarrollado por Lainer Felipe Donet Vasconcellos como proyecto de práctica Frontend con React.

```

---

Si quieres, puedo también prepararte **el esquema del Redux Toolkit** con los slices y thunks listos para que tu app consuma OpenWeather de forma óptima.
```
