const socket  = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio= new Audio('ting.mp3');


const append=(message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();

    }
    
 
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='' 

})
const named= prompt("enter your name to join");
socket.emit('new-user-joined', named );

socket.on('user-joined',named=>{
    append(`${named} joined the chat`,'right')
})

socket.on('receive',data=>{            
    append(`${data.named} :${data.message}`,'left')
})
socket.on('left',named=>{            
    append(`${named} left the chat `,'right')
})
