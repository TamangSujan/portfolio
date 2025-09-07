function fibonacci(){
    var term = parseInt(document.getElementById("term").value)
    var a = 0
    var b = 1
    console.log(term)
    if(term<=1){
        document.getElementById("result").innerHTML = "Fibonacci: "+a
    }else if(term==2){
        document.getElementById("result").innerHTML = "Fibonacci: "+b
    }else{
        var c = 0
        for(i=2; i<term; i++){
            c = a + b
            a = b
            b = c
        }
        document.getElementById("result").innerHTML = "Fibonacci: "+c
    }
}