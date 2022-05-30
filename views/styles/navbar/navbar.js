const hiddenNav = document.querySelector('#hidden-nav');
const navtoggle = document.querySelector('#navtoggle');

navtoggle.addEventListener('click', (ev)=>{
    hiddenNav.style.marginLeft='0px';
})

document.addEventListener('click', function(ev) {
    var a1 = hiddenNav.contains(ev.target);
    var a2 = navtoggle.contains(ev.target);
    if(!a1&&!a2){
        hiddenNav.style.marginLeft='-320px';
    }
});