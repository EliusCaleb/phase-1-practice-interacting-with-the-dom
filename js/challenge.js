//"use strict";function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var playing=!0,timer=function(){return setInterval(function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b+1},1e3)},interval=timer(),minus=document.getElementById("minus"),plus=document.getElementById("plus"),heart=document.getElementById("heart"),pause=document.getElementById("pause"),commentForm=document.getElementsByTagName("form")[0];minus.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b-1}),plus.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText);a.innerText=b+1}),heart.addEventListener("click",function(){var a=document.getElementById("counter"),b=parseInt(a.innerText),c=document.querySelector(".likes"),d=void 0;if([].concat(_toConsumableArray(c.children)).map(function(a){return parseInt(a.dataset.num)}).includes(b)){d=document.querySelector('[data-num="'+b+'"]');var e=parseInt(d.children[0].innerText);d.innerHTML=b+" has been liked <span>"+(e+1)+"</span> times"}else(d=document.createElement("li")).setAttribute("data-num",b),d.innerHTML=b+" has been liked <span>1</span> time",c.appendChild(d)}),pause.addEventListener("click",function(){playing?(playing=!1,clearInterval(interval),this.innerText="resume"):(playing=!0,interval=timer(),this.innerText="pause"),[].concat(_toConsumableArray(document.getElementsByTagName("button"))).forEach(function(a){"pause"!==a.id&&(a.disabled=!playing)})}),commentForm.addEventListener("submit",function(a){a.preventDefault();var b=this.children[0],c=b.value;b.value="";var d=document.querySelector(".comments"),e=document.createElement("p");e.innerText=c,d.appendChild(e)});
let timer;
let isActive = true;
const counter = document.querySelector("#counter")
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const heart = document.querySelector('#heart')
const pause = document.querySelector('#pause')
const likes  = document.querySelector('.likes')
const  comments = document.querySelector('#list')
const commentForm = document.querySelector('#comment-form')
//const commentInput = document.querySelector('#comment-input')
document.addEventListener('DOMContentLoaded',startTimer )
minus.addEventListener('click',decrementCounter);
plus.addEventListener('click',incrementCounter);
heart.addEventListener('click', addLike);
pause.addEventListener('click', pauseActivities)
commentForm.addEventListener('submit',displayComment);
//commentInput.addEventListener('input',handleInput);
 
function startTimer(){
        timer =  setInterval(incrementCounter, 1000) 
}



function decrementCounter(){
  const currentCount = parseInt(counter.textContent, 10)
  if(currentCount >0){
    counter.textContent = `${currentCount -1}`;  
  }
  }
  
function incrementCounter(){
   const currentCount = parseInt(counter.textContent, 10)
   counter.textContent = `${currentCount +1}`;  
}

function addLike(){
  const currentCount = parseInt(counter.textContent, 10)
  const previousLikes = Array.from(likes.children); 
  const previousLike = previousLikes.find(previousLike => {
  const previousLikeCount = parseInt(previousLike.textContent.split(" ")[0], 10)
  return previousLikeCount === currentCount;
  })
  
  if(previousLike){
    const previousHeartsText = previousLike.textContent.split(" ").slice(-2)[0];
    const numberOfHearts = parseInt(previousHeartsText, 10)
    previousLike.textContent = `${currentCount} has been liked ${numberOfHearts+1} times`

  }
  else {
    const newLike = document.createElement('li')
    newLike.textContent = `${currentCount} has been liked 3 time`;
    likes.append(newLike);
  }
  //const previousLikes = document.querySelectorAll('.likes>li')
  

}

function pauseActivities(){
  //const buttons = Array.from(document.querySelectorAll('button'))
  //const notPauseButtons = buttons.filter(button => button.id !== 'pause')
  //console.log(notPauseButtons)
  if(isActive){
    clearInterval(timer);
    pause.textContent = 'resume'
    plus.disabled = true;
    minus.disabled = true;
    heart.disabled = true
    //notPauseButtons.foreach(button => button.disabled = true)
    isActive = false
  }
  else{
    startTimer();
    pause.textContent = 'pause'
    plus.disabled = false
    minus.disabled = false
    heart.disabled = false
    //notPauseButtons.forEach(button =>button.disabled = false)
    isActive = true
  }
      
}
function  displayComment(event){
   event.preventDefault();
   
   const  commentFormData = new FormData(event.target);
   const  commentText =  commentFormData.get('comment')
   
   const comment = document.createElement('p')
   comment.textContent = commentText;
   comments.append(comment)

   event.target.reset();
   
}





