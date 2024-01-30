var activeButton = document.getElementById("side_bar").children;

var contentBox = document.getElementById("center_box").children;

//Show only first toggle ie skills
for(let i=1; i<contentBox.length; i++){
    contentBox[i].style.display = "none";
}

//Toggle Functions

function toggleDiv(value){
    for(let i=0; i<contentBox.length; i++){
        if(i===value){
            activeButton[i+1].style.backgroundColor = '#dedede';
            contentBox[i].style.display = "flex";
        }else{
            activeButton[i+1].style.backgroundColor = 'white';
            contentBox[i].style.display = "none";
        }
    }
}

toggleDiv(0)