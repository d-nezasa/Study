function sayHelloWorld() {
    var name = document.getElementById("name").value;
    var messagehere = document.getElementById("messagehere");
    if(name == alphabet(name)) {
        messagehere.innerHTML = "Hello dear " + name;
    }else{
        messagehere.innerHTML = "こんにちは" + name + "さん";
    }
}

function alphabet(name) {
    var matchArray = name.match(/[A-z ]/g);
    if(matchArray == null){
        return null;
    }
    return matchArray.join("");
}