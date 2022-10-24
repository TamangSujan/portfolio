function fibonacci(){
    var term = parseInt(document.getElementById("term").value)
    if(term<=0){
        document.getElementById("result").innerHTML = "Fibonacci: 0"
    }else if(term==1){
        document.getElementById("result").innerHTML = "Fibonacci: 1"
    }else{
        var a = 0
        var b = 1
        var c = 0
        for(i=2; i<term; i++){
            c = a + b
            a = b
            b = c
        }
        document.getElementById("result").innerHTML = "Fibonacci: "+c
    }
}