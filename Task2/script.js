const words = [
    "Coder",
    "Problem Solver",
    "Web Developer",
    "AI Enthusiast",
    "Tech Learner"
];

let wordIndex = 0;
let charIndex = 0;

const typing = document.getElementById("typing");

function typeWord() {

    if(charIndex < words[wordIndex].length){

        typing.textContent += words[wordIndex][charIndex];
        charIndex++;

        setTimeout(typeWord,100);
    }
    else{
        setTimeout(deleteWord,1500);
    }
}

function deleteWord(){

    if(typing.textContent.length > 0){

        typing.textContent =
        typing.textContent.slice(0,-1);

        setTimeout(deleteWord,50);
    }
    else{

        wordIndex++;

        if(wordIndex === words.length){
            wordIndex = 0;
        }

        charIndex = 0;

        setTimeout(typeWord,300);
    }
}

typeWord();