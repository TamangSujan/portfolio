function generate(){
    var length = document.getElementById("length").value
    var choice = document.getElementById("choice").value
    var result = "";
    switch(choice){
        case "numbers":
            result = password(length, "0123456789")
            break;
        case "alphabets":
            var data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            result = password(length, data)
            break;
        case "alphanumeric":
            var data  = "0123456789"
            data += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            result = password(length, data)
            break;
        case "all":
            var data  = "0123456789"
            data += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            data += "!@#$%^&*()-=+-*/,.'\";:{[}]\|_`~"
            result = password(length, data)
            break;
        default:
            result = "error"; 
    }
    document.getElementById("result").innerHTML = result
}

function password(length, data){
    if(length > 16){
        length = 16
    }

    if(length < 0){
        length = 8
    }
    var result = ""
    for(i=0; i<length; i++){
        result += data[parseInt(Math.random()*(data.length-1))]
    }
    return result
}

function add(){
    var a = parseInt(document.getElementById("length").value)
    if(a>=16){
        document.getElementById("length").value = 16
    }else{
        document.getElementById("length").value = a + 1
    }
}

function sub(){
    var a = parseInt(document.getElementById("length").value)
    if(a<=0){
        document.getElementById("length").value = 0
    }else{
        document.getElementById("length").value = a - 1
    }
}

