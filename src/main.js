function getGitref() {
    nw = window.open("");
    nw.document.write("GITREF: __REVISION__");
    return 0;
}

function leadingZero(number) {
    var retval = number;
    if (number < 10) {
        retval = '0' + number;
    }
    return retval;
}

function now() {
    var today = new Date();

    return leadingZero(today.getDate())
        + '.' + leadingZero(today.getMonth() + 1)
        + '.' + leadingZero(today.getFullYear())
        + " " + leadingZero(today.getHours())
        + ":" + leadingZero(today.getMinutes())
        + ":" + leadingZero(today.getSeconds());
}

function getHeader() {
    return "<!DOCTYPE html>\n"
         + "<html>\n"
         + "  <head>\n"
         + "    <title>Innleveringskvittering</title>\n"
         + "    <meta charset=\"utf-8\">\n"
         + "    <style type=\"text/css\">\n"
         + "      body { font-family: sans-serif; font-size: 20px; }\n"
         + "      h1 { font-weight: bold; font-size: 3em; }\n"
         + "      p.telephone, p.date, p.email { font-size: 3em; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;}\n"
         + "      table { border-collapse: collapse; border-top: 2px solid #000; }\n"
         + "      td { padding-top: 0em; padding-bottom: 0.5em; vertical-align: top;  font-size: 3em; }\n"
         + "      tr.title-row > td { padding-top: 1em;}\n"
         + "      tr.barcode-row > td { border-bottom: 2px solid #000; padding-bottom: 1.2em; }\n"
         + "      h2 { font-weight: bold; font-size: 3em; }\n"
         + "      h2.footer { padding-bottom: 5em; }\n"
         + "    </style>\n"
         + "  </head>\n"
         + "  <body>\n"
         + "    <p>\n"
         + "      <h1>DEICHMANSKE BIBLIOTEK</h1>\n"
         + "      <p class=\"telephone\">Tlf: 23432900</p>\n"
         + "      <p class=\"email\">postmottak.deichman@oslo.kommune.no</p>\n"
         + "      <h2>Kvittering på innlevert materiale</h2>\n"
         + "      <p class=\"date\">" + now() + "</p>\n"
         + "    </p>\n"
         + "    <table>\n";
}

function getFooter() {
    return "    </table>\n"
         + "    <p>\n"
         + "      <h2 class=\"footer\">www.deichman.no</h2>\n"
         + "    </p>\n"
         + "  </body>\n"
         + "</html>\n";
}

function getInner(contents) {
    var retval;
    if (contents.firstChild === null) {
        retval = "";
    } else if (contents.firstChild.nodeType !== Node.TEXT_NODE) {
        retval = contents.firstChild.innerText;
    } else {
        retval = contents.innerText.trim();
    }
    return retval;
}

function getRow(table) {
    var data = [];
    var headers = [];

    for (var r = 0, n = table.rows.length; r < n; r++) {
        var rowdata = [];

        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            var contents = table.rows[r].cells[c];
            rowdata[c] = getInner(contents);
        }

        if (r === 0) {
            headers = rowdata;
        } else {
            data[r] = rowdata;
        }
    }

    var string = "";

    for (var i = 1, l = data.length; i < l; i++) {
        for (var k = 0, f = data[i].length; k < f; k++) {
            string += getRequiredFields(headers[k], data[i][k]);
        }
    }

    return string;
}

function getRequiredFields(header, data) {
    var ret = "";
    switch (header) {
        case "Tittel":
            ret = "      <tr class=\"title-row\"><td colspan=\"2\">" + data + "</td></tr>\n";
            break;
        case "Strekkode":
            ret = "      <tr class=\"barcode-row\"><td>" + header + ":</td><td>" + data + "</td></tr>\n";
            break;
        default:
            break;
    }
    return ret;
}

function getCheckIns() {
    var tables = ["checkedintable", "rfiditems"];
    var returnedItems = "";

    tables.forEach(function (table) {
        var currentTable = document.getElementById(table);
        if (currentTable !== null) {
            returnedItems += getRow(currentTable);
        }
    });

    if (returnedItems !== "") {
        printWindow = window.open("");
        printWindow.document.write(getHeader());
        printWindow.document.write(returnedItems);
        printWindow.document.write(getFooter());
        printWindow.print();
        printWindow.close();
    }
}

if (window.location.href.toLowerCase().indexOf("gitref") > -1) {
    getGitref();
} else {
    getCheckIns();
}
