//////////////////// XP SYSTEM ////////////////////

let xp = parseInt(localStorage.getItem("xp")) || 0;

function updateXP(){

document.getElementById("xp").innerText="XP: "+xp;
document.getElementById("level").innerText="Level: "+(Math.floor(xp/100)+1);

localStorage.setItem("xp",xp);

}

updateXP();

function addXP(){

xp+=10;
updateXP();

}

//////////////////// TRANSLATOR ////////////////////

function translate(){

let text=document.getElementById("translateInput").value;

let lang=document.getElementById("targetLang").value;

fetch(
"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl="
+lang+"&dt=t&q="+encodeURIComponent(text)
)
.then(res=>res.json())
.then(data=>{

document.getElementById("translateOutput").innerText=data[0][0][0];

});

}

//////////////////// SPEAK ////////////////////

function speak(text){

let speech=new SpeechSynthesisUtterance(text);

speech.lang="en";

speechSynthesis.cancel();
speechSynthesis.speak(speech);

}

function speakOutput(){

let text=document.getElementById("translateOutput").innerText;

speak(text);

}

//////////////////// WORD API ////////////////////

let usedWords=[];
let currentWord="";
let correctAnswer="";

async function loadQuestion(){

let res=await fetch(
"https://random-word-api.herokuapp.com/word"
);

let data=await res.json();

currentWord=data[0];

document.getElementById("question").innerText=currentWord;

correctAnswer=currentWord;

loadAnswers();

}

function loadAnswers(){

let answers=[correctAnswer];

while(answers.length<4){

answers.push("word"+Math.floor(Math.random()*50000));

}

answers.sort(()=>Math.random()-0.5);

let html="";

answers.forEach(ans=>{

html+=`<button onclick="checkAnswer(this,'${ans}')">${ans}</button>`;

});

document.getElementById("answers").innerHTML=html;

}

function checkAnswer(btn,ans){

if(ans==correctAnswer){

btn.classList.add("correct");

addXP();

}else{

btn.classList.add("wrong");

}

setTimeout(loadQuestion,1000);

}

function speakQuestion(){

speak(currentWord);

}

loadQuestion();

//////////////////// GRAMMAR ////////////////////

function loadGrammar(type){

let text="";

if(type=="present")
text="Present Simple: I eat, You eat, He eats";

if(type=="past")
text="Past Simple: I ate, You ate";

if(type=="future")
text="Future: I will eat";

document.getElementById("grammarOutput").innerText=text;

}

loadGrammar("present");
