var uncss = require('uncss')
var cleancss = require('clean-css')
var glob = require('glob')
var fs = require('fs')

var stylesheetLocation = '_site/assets/css/'
var stylesheetSourceLocation = 'assets/css/'
var stylesheetName = 'style.css'
var stylesheetMinName = 'style.min.css'

var jekyllUncss = function() {
  var css = fs.readFileSync(stylesheetLocation + stylesheetName, 'utf8')

  glob('_site/**/*.html', function(err, files) {
    if (err) {
      console.log(err)
    }

    uncss(files, {
      raw: css,
      ignore: [/.*is-.*/],
      ignoreSheets:[/\/css\//]
    }, function(err, output) {
      if (err) {
        console.log(err)
      }

      new cleancss().minify(output, function(err, minified) {
        if (err) {
          console.log(err)
        }

        fs.writeFileSync(stylesheetSourceLocation + stylesheetMinName, minified.styles)
      })
    })
  })
}

jekyllUncss()
