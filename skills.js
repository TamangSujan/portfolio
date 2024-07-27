pageSize = 100

let skills = [
    {
        'image': 'assets/pictures/icons/java.png',
        'label': 'Java'
    },
    {
        'image': 'assets/pictures/icons/spring.png',
        'label': 'Spring Boot'
    },
    {
        'image': 'assets/pictures/icons/jenkins.png',
        'label': 'Jenkins'
    },
    {
        'image': 'assets/pictures/icons/tomcat.png',
        'label': 'Tomcat'
    },
    {
        'image': 'assets/pictures/icons/jmeter.png',
        'label': 'JMeter'
    },

    {
        'image': 'assets/pictures/icons/jsp.png',
        'label': 'JSP'
    },
    {
        'image': 'assets/pictures/icons/thymeleaf.png',
        'label': 'Thymeleaf'
    },
    {
        'image': 'assets/pictures/icons/mysql.png',
        'label': 'MySQL'
    },
    {
        'image': 'assets/pictures/icons/postgresql.png',
        'label': 'PostgreSQL'
    },
    {
        'image': 'assets/pictures/icons/mongodb.png',
        'label': 'MongoDB'
    },
    {
        'image': 'assets/pictures/icons/redis.png',
        'label': 'Redis'
    },
    {
        'image': 'assets/pictures/icons/elastic-search.png',
        'label': 'Elastic Search'
    },
    {
        'image': 'assets/pictures/icons/kibana.png',
        'label': 'Kibana'
    },
    {
        'image': 'assets/pictures/icons/angular.png',
        'label': 'Angular'
    },
    {
        'image': 'assets/pictures/icons/html.png',
        'label': 'HTML'
    },
    {
        'image': 'assets/pictures/icons/css.png',
        'label': 'CSS'
    },
    {
        'image': 'assets/pictures/icons/javascript.png',
        'label': 'Javascript'
    },
    {
        'image': 'assets/pictures/icons/selenium.png',
        'label': 'Selenium'
    },
    {
        'image': 'assets/pictures/icons/cucumber.png',
        'label': 'Cucumber'
    },
    {
        'image': 'assets/pictures/icons/json.png',
        'label': 'JSON'
    },
    {
        'image': 'assets/pictures/icons/firebase.png',
        'label': 'Firebase Notification'
    },
    {
        'image': 'assets/pictures/icons/api.png',
        'label': 'APIs'
    },
    {
        'image': 'assets/pictures/icons/docker.png',
        'label': 'Docker'
    },

    {
        'image': 'assets/pictures/icons/github.png',
        'label': 'Git'
    },
    {
        'image': 'assets/pictures/icons/websocket.png',
        'label': 'Web Socket'
    },
    {
        'image': 'assets/pictures/icons/c.png',
        'label': 'C'
    },
    {
        'image': 'assets/pictures/icons/c++.png',
        'label': 'C++'
    },
    {
        'image': 'assets/pictures/icons/deep-learning.png',
        'label': 'Deep Learning'
    },
    {
        'image': 'assets/pictures/icons/python.png',
        'label': 'Python'
    },
    {
        'image': 'assets/pictures/icons/linux.png',
        'label': 'Linux'
    },
    {
        'image': 'assets/pictures/icons/windows.png',
        'label': 'Windows'
    }
]

function createSkills(page){
    if(page < 1)
        page = 1;
    removeSkills();
    let start = (page - 1) * pageSize;
    let end = start + pageSize;
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