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

var toggle = document.getElementById("toggle").childNodes;
for(i=0; i<(toggle.length - 1)/2 - 1; i++){
    toggle[i*2+1].style.borderRight = "1px solid black";
}

var contentBox = document.getElementById("center_box").childNodes;

//Show only first toggle ie skills
for(i=2; i<(contentBox.length-1)/2; i++){
    contentBox[i*2+1].style.display = "none";
}

//Toggle Functions

function toggleDiv(value){
    for(i=1; i<(contentBox.length-1)/2; i++){
        if(i==value){
            contentBox[i*2+1].style.display = "block";
        }else{
            contentBox[i*2+1].style.display = "none";
        }
    }
}