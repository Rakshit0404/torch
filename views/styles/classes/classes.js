const createbutton = document.querySelector('#createbutton');
const formOverlay = document.querySelector('#form-overlay');
const form = document.querySelector('#form');

createbutton.addEventListener('click', (ev)=>{
    formOverlay.style.display='flex';
    setTimeout(()=>{
        formOverlay.style.opacity='1';
        form.style.transform='translateZ(0px)';
    }, 100);
})

document.addEventListener('click', function(ev) {
    var a1 = form.contains(ev.target);
    var a2 = createbutton.contains(ev.target);
    if (!a1&&!a2) {
        formOverlay.style.opacity='0';
        form.style.transform='translateZ(-100px)';
        setTimeout(()=>{
            formOverlay.style.display='none';
        }, 100);
    }
});