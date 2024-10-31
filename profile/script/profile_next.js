document.getElementById("logout").addEventListener("click",()=>{
    sessionStorage.clear();
    window.location.replace("../../index.html");
});
document.getElementById("contacts").addEventListener("click",()=>{
    window.location.assign("../profile/pages/contact.html");
});
document.getElementById("video_player").addEventListener("click",()=>{
    window.location.assign("../profile/pages/video_player.html");
});
document.getElementById("business").addEventListener("click",()=>{
    window.location.assign("../profile/pages/business.html");
});



