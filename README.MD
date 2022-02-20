# DockerCompose + Gulp + Php + Pug + Sass + PostCSS + Tailwind

- For start developing - just use `docker-compose up`

In docker compose **node** service in the **command** field available names of scripts in the package.json.
Defaults:
- `serve` - Just serve with node for pug
- `servePHP` - like **serve** but proxy to **php** container for serve rendered php
- `build` - just buld for pug
- `buildPHP` - build with php
- `clear` - clear dist
- `watch` - watch for pug files
- `watchPHP` - watch for pug and php files