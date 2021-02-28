# Base Layout Project

## Before you begin

1. Install `nodejs`, `npm`
2. `npm install npm@latest -g`
3. `apt install nodejs-legacy`

## Create project

```bash
composer create-project studio32x32/layout/base_project %project_name% %version% --prefer-dist --repository-url=http://satis.32server.in.ua --no-secure-http
```

## Install dependencies:

### <a name="h3-npm">**npm**</a>:

```bash
npm i -S browser-sync gulp gulp-autoprefixer gulp-imagemin gulp-line-ending-corrector gulp-clean-css gulp-rename gulp-rigger gulp-sass gulp-sourcemaps gulp-uglify gulp-watch imagemin-pngquant rimraf extend require-dir del gulp-util gulp-changed map-stream gulp-jshint vinyl-buffer gulp-header gulp-minifier fs gulp-sequence gulp-pug gulp-jsbeautifier normalize.css
```

### <a name="h3-npm">**composer**</a>

**Install basic system**

```bash
composer install
```

**Example of `bxslider-4` installation for some project**

```bash
composer require bower-asset/bxslider-4
```

> All `bower` packages starts with *bower-asset/* prefix
