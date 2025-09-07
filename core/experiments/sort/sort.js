var arr = [23, 22, 27, 28, 30, 5, 1, 6, 10, 12, 18, 17, 13, 8, 15, 20, 11, 3, 2, 31, 25, 33]
const arrSize = arr.length
const BOX_WIDTH = "10px"
const BOX_HEIGHT_TIMES = 3;

for(i=0; i<arrSize; i++){
    var box = document.createElement("label")
    box.setAttribute("id", "label"+i)
    box.style.width = BOX_WIDTH
    box.style.height = arr[i]*BOX_HEIGHT_TIMES
    var container = document.getElementById("sort_values")
    container.appendChild(box)
}

function sort(){
    var choice = document.getElementById("choice").value
    const start = window.performance.now()
    switch(choice){
        case "simple":
            simpleSort();
            break;
        case "bubble":
            bubbleSort();
            break; 
        case "insertion":
            insertionSort();
            break; 
    }
    const finished = window.performance.now()
    showResult(finished - start)
    arrange()
}


function simpleSort(){
    var temp = 0
    for(i=0; i<arrSize; i++){
        for(j=0; j<arrSize; j++){
            if(arr[i]<arr[j]){
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
}

function bubbleSort(){
    var temp = 0
    for(i=0; i<arrSize-1; i++){
        for(j=0; j<arrSize-1; j++){
            if(arr[j]>arr[j+1]){
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
}

function insertionSort(){
    for (i = 1; i < arr.length; ++i) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

function scramble(){
    arr = [23, 22, 27, 28, 30, 5, 1, 6, 10, 12, 18, 17, 13, 8, 15, 20, 11, 3, 2, 31, 25, 33]
    arrange()
}

function arrange(){
    for(i=0; i<arrSize; i++){
        var variable = document.getElementById("label"+i)
        variable.style.height = arr[i]*BOX_HEIGHT_TIMES
    }
}

function showResult(result){
    document.getElementById("timing").innerHTML = "Timing: "+result+"ms"
}