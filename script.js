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

function dock(){
    let dock = document.getElementById('dock');
    let dockCaller = document.getElementById('dock_caller');
    let status = dock.style.display;
    if(status === 'none'){
        dock.style.display = 'flex';
        dockCaller.style.backgroundColor = 'black';
        dockCaller.style.color = 'white';
    }else{
        dock.style.display = 'none';
        dockCaller.style.backgroundColor = 'white';
        dockCaller.style.color = 'black';
    }

}

function enableDock(){
    let dockCaller = document.getElementById('dock_caller');
    dockCaller.style.backgroundColor = 'black';
    dockCaller.style.color = 'white';
}

toggleDiv(0);
enableDock();