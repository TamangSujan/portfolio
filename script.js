var skill_set = [9, 8, 7, 7, 9];

var skill_model = document.getElementById("major_skills").childNodes;
var skill_model_size = (skill_model.length-1)/2

for(i=0; i<skill_model_size; i++){
    console.log(skill_model[i*2+1])
    console.log(skill_model[i*2+1].childNodes[3])
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