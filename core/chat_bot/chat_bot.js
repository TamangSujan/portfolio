let question = '';
let answer = 'Chat Bot coming soon!';

function createChatBot( ){
    let container = document.getElementById("chat_bot_container");
    container.appendChild( questionBar( ) );
    container.appendChild( answerArea( ) );
}

function questionBar( ){
    let questionBar = document.createElement("div");
    questionBar.setAttribute("class", "question_bar");

    let questionArea = document.createElement("input");
    questionArea.setAttribute("id", "question_area");
    questionArea.setAttribute("class", "question_area");
    questionArea.setAttribute("placeholder", "Ask me about myself");
    questionArea.setAttribute("rows", "1");
    questionArea.addEventListener("change", updateQuestion);
    questionArea.addEventListener("keydown", function(event){
        submitQuestionOnEnter(event);
    });

    let submitQuestionButton = document.createElement("i");
    submitQuestionButton.setAttribute("class", "submit_question_button fa fa-paper-plane");
    submitQuestionButton.addEventListener("click", submitQuestion);

    questionBar.appendChild(questionArea);
    questionBar.appendChild(submitQuestionButton);

    return questionBar;
}

function updateQuestion( ){
    question = document.getElementById( "question_area" ).value;
}

function submitQuestion( ){
    typeWriteAnswer( );
    console.log()
}

function submitQuestionOnEnter( event ){
    updateQuestion( );
    if( event.key === 'Enter'){
        submitQuestion( );
    }
}

function answerArea( ){
    let answerArea = document.createElement("div");
    answerArea.setAttribute("id", "answer_area");
    answerArea.setAttribute("class", "answer_area");
    return answerArea;
}

function typeWriteAnswer( ){
    let answerArea = document.getElementById("answer_area");
    answerArea.textContent = '';
    typeWrite( answerArea, answer, 0);
}

function typeWrite( whereToType, whatToType, currentCharacterIndex ){
    if( currentCharacterIndex < whatToType.length ) {
        whereToType.textContent += whatToType.charAt( currentCharacterIndex++ );
        setTimeout(function(){
            typeWrite( whereToType, whatToType, currentCharacterIndex );
        }, getRandomValueBetween(100, 200));
    }
}

function getRandomValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createChatBot( );