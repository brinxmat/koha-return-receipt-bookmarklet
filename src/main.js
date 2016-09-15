function getInner(contents) {
  var retval;
  if (contents.firstChild === null) {
    retval = null;
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
  var string = "Kvittering for utlån<br><hr>";
  for (var i = 1, l = data.length; i < l; i++) {


    for (var k = 0, f = data[i].length; k < f; k++) {
      string += headers[k] + ":  " + data[i][k] + "<br>";
    }
    string += "<hr>";
  }
  return string;
}
printWindow = window.open("");
printWindow.document.write(getRow(document.getElementById("checkedintable")));
printWindow.print();
printWindow.close();

