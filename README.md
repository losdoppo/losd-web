# LOSD — Sitio de pre-lanzamiento

Landing page corporativa estática para **losd.com.ar**, preparada para publicarse directamente en **GitHub Pages**.

## Qué incluye

- Sitio responsive con navegación por secciones y menú móvil.
- Presentación del ecosistema LOSD: Editorial, QR Dorado, E-Sports, Tecnología, Academia, LOSD.TV, Internet/Hotspot, distribución, RR. HH. y contacto.
- Modales de suscripción y postulación, formulario de contacto y carga de CV.
- Música MP3 suministrada por el propietario del proyecto, con volumen inicial al 50% y control de reproducción.
- Recursos gráficos optimizados en WebP, favicon, Open Graph, `robots.txt`, sitemap, página de agradecimiento y `404.html`.
- `CNAME` configurado para `losd.com.ar`.

## Publicación en GitHub Pages

1. Crear un repositorio en GitHub y subir **el contenido de esta carpeta** a la raíz del repositorio.
2. En el repositorio, abrir **Settings → Pages** y seleccionar **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. En la configuración de Pages, usar `losd.com.ar` como dominio personalizado. El archivo `CNAME` ya está incluido.
4. Configurar los registros DNS del dominio con el proveedor donde se administra `losd.com.ar` y activar HTTPS cuando GitHub Pages lo habilite.

No hace falta instalar Node.js, Next.js ni ejecutar un proceso de compilación.

## Formularios y recepción de datos

Los tres formularios están preparados para enviar los datos a través de **FormSubmit**:

- Contacto y suscripciones: `contacto@losd.com.ar`.
- Postulaciones y CV: `rrhh@losd.com.ar`.

**Activación necesaria:** después de publicar el sitio, realizar un primer envío de prueba desde cada dirección de destino y confirmar el correo de activación que envía FormSubmit. Hasta completar esa confirmación, el servicio no entregará normalmente las notificaciones. El envío de CV admite PDF, DOC y DOCX; el formulario limita los archivos a 10 MB.

Esta versión remite los datos por correo mediante un proveedor externo; **no incluye una base de datos propia**. Para guardar y administrar leads en Supabase, Firebase, Google Sheets u otro CRM habrá que conectar posteriormente ese servicio y sus credenciales.

## Música

El archivo de audio está en `assets/audio/voyage-voyage-remix.mp3`. El volumen se establece en `0.5` (50%). Los navegadores actuales bloquean la reproducción audible automática en muchos casos, por lo que la persona debe pulsar **ACTIVAR MÚSICA**. El control permanece fijo en pantalla para iniciar o pausar el tema.

## Pendientes de contenido antes de la publicación comercial

- Reemplazar el módulo fiscal de ejemplo por el **QR oficial de Data Fiscal de ARCA**. No se generó un QR ficticio.
- Completar, si corresponde, la razón social y los datos registrales que deben acompañar al CUIT.
- Confirmar las condiciones finales de promociones, descuentos, cupos, cobertura de internet, catálogo de LOSD.TV, señales y sorteos antes de anunciarlos como servicios disponibles.
- Revisar los textos legales y de privacidad con el responsable correspondiente.

## Estructura

```text
LOSD-Web/
├── index.html
├── styles.css
├── script.js
├── gracias.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
└── assets/
    ├── audio/
    │   └── voyage-voyage-remix.mp3
    └── img/
        ├── favicon.svg
        ├── losd-logo-light.webp
        ├── og-losd.jpg
        └── ... imágenes de referencia optimizadas
```
