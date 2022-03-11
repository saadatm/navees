This directory contains the source of Navees' [website](https://saadatm.github.io/navees/).

## Navigating the website source

* [`/assets`](/www/assets): Contains CSS files, images, and webfonts in respective subdirectories.
* [`/pages`](/www/pages): Contains [Nunjucks](https://mozilla.github.io/nunjucks/) templates (including helper macros in [`/pages/helpers`](/www/pages/helpers))
* [`data.json`](/www/data.json): Key mapping data of Navees in JSON.
* [`gulpfile.js`](/www/gulpfile.js): gulp tasks for building the website.
* [`package.json`](/www/package.json): List of packages required by the website.
* [`package-lock.json`](/www/package-lock.json): Automatically generated and updated by npm operations (e.g., if/when `package.json` is modified).


## Building the website locally

Building the website requires [Node.js](https://nodejs.org/). You should also have the gulp command line utility ([`gulp-cli`](https://www.npmjs.com/package/gulp-cli)) installed.

1. Clone or download this repository, and `cd` into this directory (`navees/www`).
1. Run `gulp`. A new directory named `build` will be created.
1. Open `build/index.html` (for English) or `build/ur/index.html` (for Urdu) in a web browser.

## Description of tasks in `gulpfile.js`

To run a gulp task, run `gulp <task name>` (e.g. `gulp pages`).

To run them all at once, just run `gulp`. (The tasks will be run in series, and in this sequence: `css`, `fonts`, `imgs`, `pages`.)

### `css`

Takes `style*.css` files in `assets/css`, runs them through [Autoprefixer](https://github.com/postcss/autoprefixer), and writes the output in `build/assets/css`.

### `fonts`

Copies the contents of `/assets/type` to `/build/assets/type`.

### `imgs`

Copies the contents of `/assets/img` to `/build/assets/img`.

### `pages`

Takes...

* `data.json`
* global values and filters for Nunjucks defined in `gulpfile.js`
* Nunjucks templates and macros in `/www/pages`

... and generates the English and Urdu HTML pages.
