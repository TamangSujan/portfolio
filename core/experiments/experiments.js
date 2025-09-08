let experiments = [
    {
        'project-title': 'S-Util',
        'project': createSUtil,
        'project-description': 'A Java project made using legacy swing API in order to demonstrate modern looks for desktop application from Java.',
        'project-media-type': 'video',
        'project-media-src': 'resources/assets/videos/S-Util-1-1.mov',
    },
    {
        'project-title': 'Terminal Chat',
        'project': createTest,
        'project-description': 'A Java project made from scratch in order to communicate between client and server.',
        'project-media-type': 'video',
        'project-media-src': 'resources/assets/videos/Terminal Chat.mp4',
    }
]

let experimentActiveButtons;
let experimentContent = document.getElementById('experiments-content');
let experimentContentChild;

function createPopup(popup){
    experiments.forEach((experiment, index) => {
        var popupItem = document.createElement('option');
        popupItem.innerHTML = experiment['project-title'];
        popup.appendChild(popupItem);
    });
    experimentActiveButtons = popup.children;
}

function initExperiment(){
    let popup = document.getElementById('experiments-popup');
    popup.setAttribute("onchange", "toggleExperiment(this.selectedIndex)");
    createPopup(popup);
    createSUtil();
    toggleExperiment(0)
}

function toggleExperiment(value){
    experimentContent.removeChild(experimentContentChild);
    for(let i=0; i<experimentActiveButtons.length; i++){
        if(i===value){
            experiments[i].project();
        }
    }
}

function createSUtil(){
    let sutil = document.createElement('div');
    loadExperimentChildContent(sutil, experiments[0]);
    experimentContent.appendChild(sutil);
    experimentContentChild = sutil;
}

function createTest(){
    let test = document.createElement('div');
    loadExperimentChildContent(test, experiments[1])
    experimentContent.appendChild(test);
    experimentContentChild = test;
}

function loadExperimentChildContent(child, experiment){
    child.setAttribute('class', 'experiments-content-child');
    let header = document.createElement('h1');
    header.innerHTML = experiment["project-title"];
    let description = document.createElement('p');
    description.innerHTML = experiment["project-description"];
    child.appendChild(header);
    child.appendChild(description);
    if('image' === experiment["project-media-type"]){
        let content = document.createElement('img');
        content.setAttribute('src', experiment["project-media-src"]);
        child.appendChild(content);
    }else if('video' === experiment["project-media-type"]){
        let video = document.createElement('video');
        let source = document.createElement('source');
        video.appendChild(source);
        video.setAttribute("src", experiment["project-media-src"]);
        video.setAttribute("controls", "controls");
        video.setAttribute("type", "vide/mp4");
        video.appendChild(source);
        child.appendChild(video);
    }
}

initExperiment();