let projects = [
    {
        'logo': 'assets/pictures/icons/central-law-library.png',
        'title': 'Central Law Library',
        'association': 'Code Himalaya',
        'association_url': 'https://codehimalaya.com/',
        'description': '<b>Central Law Library</b>, is a robust system for library management. Leveraging technologies like React, Spring Boot, and Java, I played a significant role in shaping the platform.\n' +
            '<br><br>' +
            '<b>Central Law Library</b> is designed to provide users with reading materials. My contributions focused on creating a secured environment where users and staff could interact the system based on their user type.\n' +
            '<br><br>' +
            'One of the key aspects I worked on was implementing real time in-app notification, enabling users to experience real time updates. This feature empowers users to experience meaningful information and stay updated on their reading materials.\n' +
            '<br><br>' +
            'Through my work on <b>Central Law Library</b>, I gained valuable experience in crafting secured application.'
    },
    {
        'logo': 'assets/pictures/icons/ssf.png',
        'title': 'Social Security Fund',
        'association': 'Code Himalaya',
        'association_url': 'https://codehimalaya.com/',
        'project_url': 'https://play.google.com/store/apps/details?id=np.gov.ssf&hl=en_SG&gl=US&pli=1',
        'description': '<b>Social Security Fund</b>, is a robust technology related to finance security in society. Leveraging technologies like React, Spring Boot, and Java, I played a significant role in shaping the platform.\n' +
            '<br><br>' +
            '<b>Social Security Fund</b> is designed to provide users with a strong security to finance in future. My contributions focused on creating a ease environment where individuals could interact with their finance (contribution/payment).\n' +
            '<br><br>' +
            'One of the key aspects I worked on was implementing real time changes from server to client, enabling users to experience real time updates. This feature empowers users to experience meaningful information and stay updated on their networks.\n' +
            '<br><br>' +
            'Through my work on <b>Social Security Fund</b>, I gained valuable experience in crafting user-friendly applications that bridge the gap between insecurity in future finance.'
    },
    {
        'logo': 'assets/pictures/icons/bahmni.png',
        'title': 'Bahmni Module (OpenMRS)',
        'association': 'Ayata Inc.',
        'association_url': 'https://ayata.com.np/',
        'project_url': '#',
        'description': 'In my previous role at a company, I had the opportunity to explore and contribute to the requirements of <b>OpenMRS</b> module which is robust, world wide a electronic medical record application. Leveraging technologies like Jsp, Spring Boot, and Java, I played a significant role in creating module as per requirements.\n' +
            '<br><br>' +
            '<b>OpenMRS</b> is a collaborative open-source project to develop software to support the delivery of health care in developing countries. <b>OpenMRS</b> is founded on the principles of openness and sharing of ideas, software and strategies for deployment and use.\n' +
            '<br><br>' +
            'One of the key aspects I worked on was synchronizing multiple <b>OpenMRS</b> machine, enabling multiple machine to update data on a regular basis. This feature empowers users to retrieve their information from one medical centre to another. Another key aspect of my work was to create the required report as per <b>DHIS</b> enabling staff to enter data in an easy manner.\n' +
            '<br><br>' +
            'Through my work on <b>OpenMRS</b>, I gained valuable experience in crafting and exploring knowledge empowered from many people.'
    },
    {
        'logo': 'assets/pictures/icons/asha.png',
        'title': 'Asha Connect',
        'association': 'Ayata Inc.',
        'association_url': 'https://ayata.com.np/',
        'project_url': 'https://asha.ayata.com.np/index.php',
        'description': 'In my previous role at a company, I had the opportunity to contribute to the development of <b>Asha Connect</b>, a cutting-edge medical record application. Leveraging technologies like React, Spring Boot, and Java, I played a significant role in shaping the platform.\n' +
            '<br><br>' +
            '<b>Asha Connect</b> is designed to provide health workers with a easy experience to record medical and demographic information.\n' +
            '<br><br>' +
            'My role in the project was to convert the running project on Node.js to Java platform with Spring Boot framework. Through my work on "Asha Connect," I gained valuable experience in crafting user-friendly applications that bridge the gap between health worker and technology.'
    }
]

function createProjects(page){
    if(page < 1)
        page = 1;
    removeProjects();
    let start = (page - 1) * pageSize;
    let end = start + pageSize;
    let parent = document.getElementById("major_projects");
    for(let index=start; index<end; index++){
        let certification = createProjectModel(projects[index]);
        certification.setAttribute('class', 'major_project_model');
        parent.appendChild(certification);
    }
}

function createProjectModel(model){
    let project = document.createElement('div');
    let image = document.createElement('div');
    let info = document.createElement('div');

    let logo = document.createElement('img')
    let title= document.createElement('label');
    let associationParent= document.createElement('div');
    let association= document.createElement('label');
    let associationUrl= document.createElement('a');
    let inAssociationWith= document.createElement('label');
    let projectUrl= document.createElement('a');
    let description = document.createElement('label');

    logo.setAttribute('src', model.logo);
    title.innerHTML = model.title;
    association.innerHTML = model.association;
    associationUrl.setAttribute('href', model.association_url);
    associationUrl.setAttribute('target', '_blank');
    inAssociationWith.innerHTML = 'In Association with ';
    projectUrl.setAttribute('href', model.project_url);
    projectUrl.setAttribute('target', '_blank');
    description.innerHTML = model.description;

    title.setAttribute('class', 'major_project_title');
    associationParent.setAttribute('class', 'major_project_association');
    description.setAttribute('class', 'major_project_description');

    projectUrl.appendChild(logo);
    associationUrl.appendChild(association);
    associationParent.appendChild(inAssociationWith);
    associationParent.appendChild(associationUrl);

    image.setAttribute('class', 'major_project_model_image');
    info.setAttribute('class', 'major_project_model_info');

    image.appendChild(projectUrl);
    info.appendChild(title);
    info.appendChild(associationParent);
    info.appendChild(description);

    project.appendChild(image);
    project.appendChild(info);
    return project;
}

function removeProjects(){
    let parent = document.getElementById("major_projects");
    let children = parent.children;
    for(let index=0; index<children.length; index++){
        parent.removeChild(children[index]);
    }
}

createProjects(1);