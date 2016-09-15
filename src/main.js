function leadingZero(number) {
  var retval = number;
  if (number < 10) {
    retval = '0' + number; 
  }
  return retval;
}

function now() {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth()+1; //January is 0!
  var year = today.getFullYear();
  var hours = today.getHours();
  var getMinutes = today.getMinutes();
  var seconds = today.getSeconds();

  return leadingZero(day) 
         + '.' + leadingZero(month) 
         + '.' + leadingZero(year)
         + " " + leadingZero(today.getHours())
         + ":" + leadingZero(today.getMinutes())
         + ":" + leadingZero(today.getSeconds());
}

var header = "DEICHMANSKE BIBLIOTEK<br>"
           + "Tlf: 23432900<br>"
           + "postmottak.deichman@oslo.kommune.no<br>"
           + "Kvittering på innlevert materiale<br>"
           + now() + "<br>"
           + "&nbsp;<br><hr>";

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
  var string = header;
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
printWindow.document.write("&nbsp;<br>&nbsp;<br>")
printWindow.print();
printWindow.close();

