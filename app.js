let mouserCursor = document.querySelector(".cursor");
let navLinks = document.querySelectorAll(".nav-links li");

window.addEventListener("mousemove",cursor);

function cursor(event){
    mouserCursor.style.top = event.pageY + 'px';
    mouserCursor.style.left = event.pageX + 'px';
}

navLinks.forEach(link => {
    link.addEventListener('mouseleave',()=> {
        mouserCursor.classList.remove('link-grow');
        link.classList.remove('hovered-link');
    })
    link.addEventListener('mouseover',()=> {
        mouserCursor.classList.add('link-grow');
        link.classList.add('hovered-link');
    })
})

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const greetings= ['Chelakandee po mishter','Aynne','Nee ethaada'];

const weather = ['Onnu poodo','Ankke veere pani onnum ille'];

recognition.onstart = function () {
    console.log('voices activated');
    
};

recognition.onresult = function(event){

   const current = event.resultIndex;
   const transcript = event.results[current][0].transcript;
   content.textContent = transcript;
   readOutLoud(transcript);
    
}

//add the listner to button
btn.addEventListener('click',()=>{
    recognition.start();
})

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();

    speech.text = "i dont know";

    if(message.includes('how are you')){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }else if(message.includes('weather')){
        const finalText = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText;
    }
    else{
        speech.text = message;
    }

   
    speech.volume = 1;
    speech.rate=.4;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}