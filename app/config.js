const isDev = true;

const folder = {
  dist: "dist",
  src: 'src'
};

const path = {
  build: {
    root: `${folder.dist}/`,
    css: `${folder.dist}/css/`,
    js: `${folder.dist}/js/`,
    assets: `${folder.dist}/assets/`
  },
  src: {
    pug: [`${folder.src}/**/*.pug`, `!${folder.src}/parts/**/*.pug`],
    php: [`${folder.src}/**/*.php`, `!${folder.src}/parts/**/*.php`],
    scss: [`${folder.src}/scss/index.{sass,scss}`, `!${folder.src}/scss/index.css`],
    js: `${folder.src}/js/index.js`,
    assets: `${folder.src}/assets/**/*`,
  },
  watch: {
    pug: `${folder.src}/**/*.pug`,
    php: `${folder.src}/**/*.php`,
    styles: [`${folder.src}/scss/**/*.{scss,css,sass}`, `!${folder.src}/scss/index.css`],
    js: `${folder.src}/js/**/*.js`,
    assets: `${folder.src}/assets/**/*`,
  },
  clear: `./${folder.dist}/`,
  srcFolder: `./${folder.src}/`,
  distFolder: `./${folder.dist}/`,
}

const configs = {
  global: {
    isDev: isDev,
    isProd: !isDev
  },
  postcss: {
    plugins(...names) {
      return names.map(name => require(name));
    },
    prod: () => configs.postcss.plugins('postcss-import', 'tailwindcss', 'autoprefixer', 'postcss-csso'),
    dev: () => configs.postcss.plugins('postcss-import', 'tailwindcss'),
  },
}

exports.path = path;
exports.configs = configs;
