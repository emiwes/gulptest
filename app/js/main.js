
function toggleUnderLineSignature(){
  console.log('main js 1');
    setTimeout(function(){
        document.querySelector('#signature').firstElementChild.classList.toggle('underlineAnimate');
    }, 1000);
}

toggleUnderLineSignature();

$(document).ready(function(){
  console.log('jquery works!');
});
