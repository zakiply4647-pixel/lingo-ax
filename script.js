////////////////
// XP SYSTEM
////////////////

let xp=localStorage.getItem("xp") || 0;

function updateXP(){

document.getElementById("xp").innerText=xp;
document.getElementById("level").innerText=Math.floor(xp/100)+1;

}

function addXP(){

xp=parseInt(xp)+10;
localStorage.setItem("xp",xp);
updateXP();

}

updateXP();


////////////////
// SPEAK SYSTEM
////////////////

function speak(text,lang){

let speech=new SpeechSynthesisUtterance(text);

speech.lang=lang;

let voices=speechSynthesis.getVoices();

for(let voice of voices){

if(voice.lang.startsWith(lang)){

speech.voice=voice;
break;

}

}

speechSynthesis.cancel();
speechSynthesis.speak(speech);

}

function speakInput(){

let text=document.getElementById("inputText").value;
speak(text,"en");

}

function speakOutput(){

let text=document.getElementById("outputText").innerText;
let lang=document.getElementById("targetLang").value;

speak(text,lang);

}


////////////////
// TRANSLATOR
////////////////

async function translate(){

let text=document.getElementById("inputText").value;
let lang=document.getElementById("targetLang").value;

let res=await fetch(

"https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl="
+lang+
"&dt=t&q="+encodeURIComponent(text)

);

let data=await res.json();

document.getElementById("outputText").innerText=data[0][0][0];

}


////////////////
// WORDS
////////////////

let words=[];

let base=[

["car","سيارة"],
["dog","كلب"],
["cat","قطة"],
["book","كتاب"],
["house","منزل"]

];

for(let i=0;i<200;i++){

let w=base[i%base.length];

words.push({

en:w[0]+i,
ar:w[1]+i

});

}


////////////////
// EXERCISE
////////////////

let current;

function newQuestion(){

current=words[Math.floor(Math.random()*words.length)];

document.getElementById("question").innerText=current.en;

let options=[current.ar];

while(options.length<4){

let random=words[Math.floor(Math.random()*words.length)].ar;

if(!options.includes(random))
options.push(random);

}

options.sort(()=>Math.random()-0.5);

let btns=document.getElementsByClassName("option");

for(let i=0;i<4;i++){

btns[i].innerText=options[i];

}

}

function choose(btn){

if(btn.innerText==current.ar){

addXP();
alert("Correct");

}else{

alert("Wrong");

}

newQuestion();

}

newQuestion();
