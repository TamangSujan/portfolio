let profile = [
    {
        'key': 'Name',
        'value': 'Sujan Moktan',
    },
    {
        'key': 'Introduction',
        'value': 'Skillful Java developer welcomes you in my portfolio. I am passionate about building scalable and innovative software solutions. ' +
            'Over the past years, I\'ve honed my skills in Java development and tackling diverse challenges.',
    }
]

function createProfile(){
    let profileElement = document.getElementById('profile_description');
    removeProfile();
    for(let index=0; index < profile.length; index++){
        let container = document.createElement('div');
        let key = document.createElement('label');
        let value = document.createElement('label');

        key.innerHTML = profile[index].key;
        value.innerHTML = profile[index].value;

        key.setAttribute('class', 'profile_data_key')
        value.setAttribute('class', 'profile_data_value')

        container.appendChild(key);
        container.appendChild(value);
        container.setAttribute('class', 'profile_data')
        profileElement.appendChild(container);
    }
}

function removeProfile(){
    let profileElement = document.getElementById('profile_description');
    let profileChildren = profileElement.children;
    for(let index=0; index < profileChildren.length; index++){
        profileElement.removeChild(profileChildren[index]);
    }
}

createProfile();