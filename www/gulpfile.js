const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssimport = require('postcss-import');
const data = require('gulp-data');
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const postcss = require('gulp-postcss');
const prettify = require('gulp-prettify');

const SRC = '.';
const DEST = './build';

// environment function for nunjucks
var env = function(environment) {
    environment.addGlobal('char_categories', {
        "alphabets": "آ ا أ ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ؤ ہ ۂ ۃ ھ ء ئ ی ے ۓ",
        "digits": "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ 0 1 2 3 4 5 6 7 8 9",
        "diacritics": "َ ِ ُ ٰ ٖ ً ٗ ْ ّ ٔ ٘",
        "punctuation": "۔ ؟ ! ، : ؛ ' \" - ( ) [ ] { } / \\ ؏ ؎ ؁ ؍ ؃ ؀ ؂ ٫",
        "honorifics": "ﷻ ؐ ﷺ ؑ ؓ ؒ ؔ",
        "misc": "﷽ ZWNJ ZWJ RLM LRM ` ~ + = _ | @ # $ ٪ ^ & * < >"
    });
    
    environment.addFilter('split', function(str) {
        return str.split(' ');
    });
    
}

function pages () {
    return src([
            SRC + '/pages/**/*.njk',
            '!' + SRC + '/pages/helpers/*.njk'
        ])
        .pipe(data(function() {
            return require(SRC + '/data.json')
        }))
        .pipe(nunjucks({
            manageEnv: env,
            path: SRC + '/pages/'
        }))
        .pipe(prettify({indent_size: 2}))
        .pipe(dest(DEST));
}

function fonts() {
    return src(SRC + '/assets/type/**/*')
        .pipe(dest(DEST + '/assets/type'));
}

function css() {
    var processors = [
        cssimport(),
        autoprefixer()
    ];
    
    return src(SRC + '/assets/css/style*.css')
        .pipe(postcss(processors))
        .pipe(dest(DEST + '/assets/css'));
}

exports.css = css;
exports.fonts = fonts;
exports.pages = pages;
exports.default = series(css, fonts, pages);
