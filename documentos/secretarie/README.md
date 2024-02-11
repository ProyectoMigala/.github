# Automatización de minutas en Google Docs

- Dudas: [@kevin4moe](https://t.me/Kevin4Moe)
- [Plantilla](https://docs.google.com/document/d/1ef_Ehm8aQULnCNhWt-Y-yOWCvAkxImXriiq_OWkySFU): Ya incluye el código.

## Tutorial

Si duplicas la plantilla, ya debe incluir el código necesario para automatizar el respaldo y la limpieza de las minutas.

![pestaña minutas](https://github.com/ProyectoMigala/.github/assets/32855529/09304e59-8b3b-4035-af15-e225eba09d58)

En la pestaña *Minutas* aparecen 3 opciones

- Limpiar: Elimina los temas agregados en la minuta, para su reúso.
- Guardar minuta: Hace dos copias de la minuta, formato ``doc`` y ``pdf``. (Se requiere configurar la carpeta donde se guardan) 
- Agregar grabación: Forma fácil de añadir el enlace a la grabación.

### Añadir una ruta para guardar las minutas

En la pestaña `Extensiones` aparece la opción `Apps Script`, selecciona esa opción.

Abrirá una ventana similar a lo que aparece en la imagen.

![apps script 1](https://github.com/ProyectoMigala/.github/assets/32855529/7ce6a91c-d101-4d18-9ccb-cb1936492177)

Deben sustituir `<id de la carpeta>` con el id de la carpeta, como se muestra más adelante.

![apps script 2](https://github.com/ProyectoMigala/.github/assets/32855529/9e95b01f-14f1-4242-a49b-211d95744e17)

### ¿Dónde encuentro el id de la carpeta?

![folder id](https://github.com/ProyectoMigala/.github/assets/32855529/1df54dce-f9ee-475e-85f3-cf079e97bb66)

El `id` de las carpetas es el código que aparece al final de los enlaces cuando entras a una carpeta en Drive.

