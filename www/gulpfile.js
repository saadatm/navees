const { src, dest, series, parallel, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssimport = require('postcss-import');
const data = require('gulp-data');
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const postcss = require('gulp-postcss');
const prettify = require('gulp-prettify');
const unicodeNames = require('@unicode/unicode-13.0.0/Names/index.js');

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

    environment.addFilter('uniname', function(str) {
        if (str == "RLM") return "U+200F RIGHT-TO-LEFT MARK";
        if (str == "LRM") return "U+200E LEFT-TO-RIGHT MARK";
        if (str == "ZWJ") return "U+200D ZERO WIDTH JOINER";
        if (str == "")    return "";
        
        codepoint = str.charCodeAt(0).toString(16).padStart(4, 0).toUpperCase();
        name = unicodeNames.get(str.charCodeAt(0));
        return `U+${codepoint} ${name}`;
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
