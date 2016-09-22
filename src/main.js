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
    return "<!DOCTYPE html><html><head></head><body>"
        + "DEICHMANSKE BIBLIOTEK<br>"
        + "Tlf: 23432900<br>"
        + "postmottak.deichman@oslo.kommune.no<br>"
        + "Kvittering på innlevert materiale<br>"
        + now() + "<br>"
        + "&nbsp;<br><hr>";
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
        string += "<hr>";
    }

    string += "&nbsp;<br>&nbsp;<br><body></html>";

    return string;
}

function getRequiredFields(header, data) {
    var ret = "";
    switch (header) {
        case "Tittel":
        case "Strekkode":
            ret = header + ":  " + data + "<br>";
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
        printWindow.print();
        printWindow.close();
    }
}

if (window.location.href.toLowerCase().indexOf("gitref") > -1) {
    getGitref();
} else {
    getCheckIns();
}
