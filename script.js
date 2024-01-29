var skill_set = [9, 8, 7, 7, 9, 7, 7, 7];

var skill_model = document.getElementById("major_skills").childNodes;
var skill_model_size = (skill_model.length-1)/2

for(i=0; i<skill_model_size; i++){
    //Check Number
    var div_circle = skill_model[i*2+1].childNodes[5];
    for(j=0; j<10; j++){ 
        var circle = document.createElement("div");
        circle.setAttribute("class", "skill_circle");
        if(j>=skill_set[i]){
            circle.style.backgroundColor = "#bebebe"
        }
        div_circle.appendChild(circle);
    }
}

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
            activeButton[i+1].style.backgroundColor = '#C0C0C0';
            contentBox[i].style.display = "flex";
        }else{
            activeButton[i+1].style.backgroundColor = 'white';
            contentBox[i].style.display = "none";
        }
    }
}

toggleDiv(0)