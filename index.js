let url = document.querySelector('.url');
let generateqr = document.querySelector('.generate');
let qrcode = document.querySelector('#qrcode');
let btn = document.querySelector('#btn');
var geturl;
let image;

qrcode.classList.add('qrhide');
btn.classList.add('qrhide')

document.addEventListener("contextmenu", function (e){
               e.preventDefault();
           }, false);

chrome.tabs.query({currentWindow:true,active:true},function(tabs){
               geturl = tabs[0].url;
});

generateqr.addEventListener('click',function(){
               image = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${geturl}`;
               url.innerHTML = geturl;
               qrcode.src = image;
qrcode.classList.remove('qrhide');
btn.classList.remove('qrhide')
});


btn.addEventListener('click',async ()=>{
               try {
                   const response = await fetch(image);
                   const file=await response.blob();
                   const link = document.createElement('a');
                   link.href=URL.createObjectURL(file);
                   link.download="Qr Code";
                   link.click();     
               } catch (error) {
                   alert("Can't Download Qr Code")           
               }
})
