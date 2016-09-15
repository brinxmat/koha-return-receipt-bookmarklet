const main = "main.js"

const bookmarklet = require('bookmarklet')
const handlebars = require('handlebars')
const fs = require('fs')

const templateData = {"title": "Bookmarklet for Koha", 
"copyText": "Drag and drop this to your bookmarks toolbar: ",
"bookmarkletName": "Returkvittering"}

console.log("========== BUILDING BOOKMARKLET ==========")

fs.readFile(main, 'utf8', function (err, data) {
    if (err) { throw err }
    writeBookmarklet(data)
})

function writeBookmarklet (data) {
      
    const bmkl = bookmarklet.convert(data, {})

    if (bmkl.errors) { throw bmkl.errors }

    templateData.javascript = bmkl

    const renderer = handlebars.compile(fs.readFileSync("tmpl/template.hjs", 'utf8'))

    console.log("========== ADDING JAVASCRIPT ==========")
    fs.writeFile("../build/index.js", bmkl, function (err) {
      if (err) {throw err}
    })
    console.log("========== ADDING HTML ==========")
    fs.writeFile("../build/index.html", renderer(templateData), function (err) {
      if (err) {throw err}
    })
    console.log("========== BUILD SUCCESSFUL ==========")
}
