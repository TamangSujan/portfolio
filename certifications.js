let certifications = [
    {
        'image': 'assets/pictures/icons/simplilearn.png',
        'title': 'Agile Scrum Master (Basic)',
        'from': 'Simplilearn',
        'url': 'https://simpli-web.app.link/e/Sek4Fc2YuRb'
    },
    {
        'image': 'assets/pictures/icons/hacker-rank.png',
        'title': 'Java (Basic)',
        'from': 'Hacker Rank',
        'url': 'https://www.hackerrank.com/certificates/f4e8ad73bd80'
    },
    {
        'image': 'assets/pictures/icons/solo-learn.png',
        'title': 'Java (Intermediate)',
        'from': 'Solo Learn',
        'url': 'https://www.sololearn.com/en/certificates/CC-KX3DVASQ'
    },
    {
        'image': 'assets/pictures/icons/solo-learn.png',
        'title': 'SQL (Intermediate)',
        'from': 'Solo Learn',
        'url': 'https://www.sololearn.com/certificates/CC-3JCL1J2Z'
    },
    {
        'image': 'assets/pictures/icons/hacker-rank.png',
        'title': 'SQL (Advance)',
        'from': 'Hacker Rank',
        'url': 'https://www.hackerrank.com/certificates/286a7908e710'
    }
]


function createCertifications(page){
    if(page < 1)
        page = 1;
    removeCertifications();
    let start = (page - 1) * pageSize;
    let end = start + pageSize;
    let parent = document.getElementById("major_certifications");
    for(let index=start; index<end; index++){
        let certification = createCertificationModel(certifications[index]);
        certification.setAttribute('class', 'major_certification_model');
        parent.appendChild(certification);
    }
}

function createCertificationModel(model){
    let certification = document.createElement('div');
    let image = document.createElement('div');
    let info = document.createElement('div');
    let icon = document.createElement('img')
    let title= document.createElement('label');
    let from= document.createElement('label');
    let url= document.createElement('button');
    let link = document.createElement('a');

    icon.setAttribute('src', model.image);
    title.innerHTML = model.title;
    from.innerHTML = model.from;

    url.innerHTML = 'Show Certificate';
    link.setAttribute('href', model.url);
    link.setAttribute('target', '_blank');
    link.appendChild(url);

    image.setAttribute('class', 'major_certification_image');
    info.setAttribute('class', 'major_certification_info');

    image.appendChild(icon);
    info.appendChild(title);
    info.appendChild(from);
    info.appendChild(link);

    certification.appendChild(image);
    certification.appendChild(info);
    return certification;
}

function removeCertifications(){
    let parent = document.getElementById("major_certifications");
    let children = parent.children;
    for(let index=0; index<children.length; index++){
        parent.removeChild(children[index]);
    }
}

createCertifications(1);