var count = 0;
var sumh = 0;
var nam = document.getElementById("n");
var height = document.getElementById("h");
var table = document.getElementById("result");
var avgh = document.getElementById("avgh")

function showResult(){
    count++;
    sumh += parseFloat(height.value);
    var tr = document.createElement("tr");
    var tdl = document.createElement("td");
    tdl.id = "n" + count;
    tdl.appendChild(document.createTextNode(nam.value));
    var td2 = document.createElement("td");
    td2.id = "h" + count;
    td2.appendChild(document.createTextNode(height.value + "cm"));
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    avgh.innerHTML=((sumh/count).toString()).substring(0, 5);
    nam.value="";
    height.value="";
}