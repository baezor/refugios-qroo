# Refugios Quintana Roo

> Sitio web para la consulta de todos los albergues y refugios disponibles en Quintana Roo.

## Descripción

Este proyecto sin fines de lucro tiene como objetivo la creación de un sitio web que permita a los ciudadanos de Quintana Roo consultar los refugios disponibles.

El sitio se encuentra en desarrollo ya que la información oficial de los refugios solo se encuentra en archivos PDFs, por lo que requiere de un proceso de recolección manual de toda la información para poder mostrarla en el sitio.

## Cómo contribuir

La tarea más ardua en este proyecto es la recolección de las coordenadas geográficas de los refugios.

[El gobierno del estado brinda la información en archivos PDFs](https://qroo.gob.mx/coeproc/refugios/), y unicamente cuenta con el nombre del edificio y la dirección. Sin embargo para que la ubicación de los refugios pueda ser mostrada en un mapa, es necesario contar con las coordenadas geográficas de cada uno.

Puedes ayudar a recolectar las coordenadas geográficas de los refugios. Para ello, sigue los siguientes pasos:

1. Ingresa al [sitio web de Google Maps](https://www.google.com/maps).
2. Busca el refugio en el mapa. Los archivos PDFs contienen la dirección exacta, mismos que puedes encontrar en este [repositorio](https://github.com/baezor/refugios-qroo/main/public/pdfs).
3. Haz clic con el botón derecho en el lugar o en el área del mapa. Se abrirá una ventana emergente. Puedes encontrar tu latitud y longitud en formato decimal en la parte superior.
4. Copia las coordenadas automáticamente, haz clic con el botón izquierdo en la latitud y la longitud.
5. Envíalas a [a@baezor.io](mailto:a@baezor.io). Las coordenadas se ven así: `21.041752219016665, -86.87463826918639`. Si tienes conocimientos técnicos, envía un pull request con la información recolectada.

## Contribuir al desarrollo del sitio

Este proyecto está construido con [Astro](https://astro.build/), un framework para la creación de sitios web. Si deseas contribuir al código, sigue los siguientes pasos:

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor de desarrollo con `npm run dev`.
4. Elige algún issue abierto o tarea pendientes que quieras resolver.
5. Realiza los cambios necesarios.
6. Envía un pull request con tus cambios.

### 🧞 Comandos

Todos los comandos se ejecutan desde la carpeta raíz del proyecto en la terminal:

| Comando                   | Acción                                                     |
| :------------------------ | :--------------------------------------------------------- |
| `npm install`             | Instala dependencias                                       |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321`       |
| `npm run build`           | Construye tu sitio de producción en `./dist/`              |
| `npm run preview`         | Previsualiza tu construcción localmente, antes de lanzarla |
| `npm run astro ...`       | Ejecuta comandos de la CLI como `astro add`, `astro check` |
| `npm run astro -- --help` | Obtén ayuda usando la CLI de Astro                         |

## Recursos

- [Sitio web con la información de los refugios en Quintana Roo](https://qroo.gob.mx/coeproc/refugios/)
- [Listado completo de los municipios de Quintana Roo](https://es.wikipedia.org/wiki/Anexo:Municipios_de_Quintana_Roo)
- [Documentación oficial de Google Maps para descubrir las coordenadas de un lugar](https://support.google.com/maps/answer/18539?hl=es-MX&co=GENIE.Platform%3DDesktop&oco=1)
