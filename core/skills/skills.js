pageSize = 100

let skills = [
    {
        'image': 'resources/assets/pictures/icons/java.png',
        'label': 'Java'
    },
    {
        'image': 'resources/assets/pictures/icons/spring.png',
        'label': 'Spring Boot'
    },
    {
        'image': 'resources/assets/pictures/icons/jenkins.png',
        'label': 'Jenkins'
    },
    {
        'image': 'resources/assets/pictures/icons/tomcat.png',
        'label': 'Tomcat'
    },
    {
        'image': 'resources/assets/pictures/icons/jmeter.png',
        'label': 'JMeter'
    },
    {
        'image': 'resources/assets/pictures/icons/jsp.png',
        'label': 'JSP'
    },
    {
        'image': 'resources/assets/pictures/icons/thymeleaf.png',
        'label': 'Thymeleaf'
    },
    {
        'image': 'resources/assets/pictures/icons/mysql.png',
        'label': 'MySQL'
    },
    {
        'image': 'resources/assets/pictures/icons/postgresql.png',
        'label': 'PostgreSQL'
    },
    {
        'image': 'resources/assets/pictures/icons/redis.png',
        'label': 'Redis'
    },
    {
        'image': 'resources/assets/pictures/icons/html.png',
        'label': 'HTML'
    },
    {
        'image': 'resources/assets/pictures/icons/css.png',
        'label': 'CSS'
    },
    {
        'image': 'resources/assets/pictures/icons/javascript.png',
        'label': 'Javascript'
    },
    {
        'image': 'resources/assets/pictures/icons/json.png',
        'label': 'JSON'
    },
    {
        'image': 'resources/assets/pictures/icons/firebase.png',
        'label': 'Firebase Notification'
    },
    {
        'image': 'resources/assets/pictures/icons/api.png',
        'label': 'APIs'
    },
    {
        'image': 'resources/assets/pictures/icons/docker.png',
        'label': 'Docker'
    },

    {
        'image': 'resources/assets/pictures/icons/github.png',
        'label': 'Git'
    },
    {
        'image': 'resources/assets/pictures/icons/linux.png',
        'label': 'Linux'
    },
    {
        'image': 'resources/assets/pictures/icons/windows.png',
        'label': 'Windows'
    }
]

function createSkills(page){
    if(page < 1)
        page = 1;
    removeSkills();
    let start = (page - 1) * pageSize;
    let end = start + pageSize;
    if(end > skills.length)
        end = skills.length;
    let parent = document.getElementById("major_skills");
    for(let index=start; index<end; index++){
        let skill = createSkillModel(skills[index]);
        skill.setAttribute('class', 'major_model');
        parent.appendChild(skill);
    }
}

function createSkillModel(model){
    let skill = document.createElement('div');
    let icon = document.createElement('img')
    let label= document.createElement('label');

    icon.setAttribute('src', model.image);
    label.innerHTML = model.label;

    skill.appendChild(icon);
    skill.appendChild(label);
    return skill;
}

function removeSkills(){
    let parent = document.getElementById("major_skills");
    let children = parent.children;
    for(let index=0; index<children.length; index++){
        parent.removeChild(children[index]);
    }
}

createSkills(1);