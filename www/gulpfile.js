var autoprefixer = require('autoprefixer');
var cssimport = require('postcss-import');
var data = require('gulp-data');
var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks-render');
var postcss = require('gulp-postcss');
var prettify = require('gulp-prettify');

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

gulp.task('pages', function () {
    return gulp.src([
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
        .pipe(gulp.dest(DEST));
});

gulp.task('fonts', function() {
    return gulp.src(SRC + '/assets/type/**/*')
        .pipe(gulp.dest(DEST + '/assets/type'));
});

gulp.task('css', function() {
    var processors = [
        cssimport(),
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ];
    
    return gulp.src(SRC + '/assets/css/style*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(DEST + '/assets/css'));
});

gulp.task('default', ['css', 'fonts', 'pages']);
