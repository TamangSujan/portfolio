function add(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    document.getElementById("result").value = parseInt(a) + parseInt(b)
    document.getElementById("num").value = 0
}

function sub(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    document.getElementById("result").value = parseInt(a) - parseInt(b)
    document.getElementById("num").value = 0
}

function mul(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    document.getElementById("result").value = parseInt(a) * parseInt(b)
    document.getElementById("num").value = 0
}

function div(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    if(b==0){
        document.getElementById("result").value = 0
    }else{
        document.getElementById("result").value = parseInt(a) / parseInt(b)
    }
    document.getElementById("num").value = 0
}

function mod(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    if(b==0){
        document.getElementById("result").value = 0
    }else{
        document.getElementById("result").value = parseInt(a) % parseInt(b)
    }
    document.getElementById("num").value = 0
}

function equal(){
    var a = document.getElementById("result").value
    var b = document.getElementById("num").value
    document.getElementById("result").value = b
    document.getElementById("num").value = 0
}

function loadNumber(num){
    var b = document.getElementById("num").value
    if(b==0){
        document.getElementById("num").value = parseInt(num)
    }else{
        document.getElementById("num").value = b*10 + parseInt(num)
    }
}