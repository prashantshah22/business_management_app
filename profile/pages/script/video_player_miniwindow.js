document.getElementById("container_theme_input").addEventListener("change",(e)=>{
    var color=e.target.value;
    var header_div=document.getElementById("header-div");
    var footer_div=document.getElementById("footer-div");
    header_div.style.backgroundColor=color;
    footer_div.style.backgroundColor=color;
    localStorage.setItem("cntnr_theme" , color);
});
function active_theme(){
    var color=[localStorage.getItem("cntnr_theme"),localStorage.getItem("ftr_fa_icon"),localStorage.getItem("hdr_plylist_cntnr")];
    var header_div=document.getElementById("header-div");
    var footer_div=document.getElementById("footer-div");
    header_div.style.backgroundColor=color[0];
    footer_div.style.backgroundColor=color[0];
    var footer_div=document.getElementById("footer-div");
    var fa_icon=footer_div.getElementsByTagName("i");
    for(let i=0;i<fa_icon.length;i++){
        fa_icon[i].style.color=color[1];
    }
    var header_container=document.getElementById("header-div");
    var playlist_container=document.getElementById("video_playlist_div");
    header_container.style.color=color[2];
    playlist_container.style.color=color[2];

};
active_theme();

document.getElementById("icon_theme_input").addEventListener('change',(e)=>{
    var fa_color=e.target.value;
    var footer_div=document.getElementById("footer-div");
    var fa_icon=footer_div.getElementsByTagName("i");
    for(let i=0;i<fa_icon.length;i++){
        fa_icon[i].style.color=fa_color;
    }
    localStorage.setItem("ftr_fa_icon", fa_color);
});
document.getElementById("text_theme_input").addEventListener("change",(e)=>{
    var text_color=e.target.value;
    var header_container=document.getElementById("header-div");
    var playlist_container=document.getElementById("video_playlist_div");
    header_container.style.color=text_color;
    playlist_container.style.color=text_color;
    localStorage.setItem("hdr_plylist_cntnr",text_color);  
})
document.getElementById("reset_button").addEventListener("click",()=>{
    localStorage.removeItem("cntnr_theme");
    localStorage.removeItem("ftr_fa_icon");
    localStorage.removeItem("hdr_plylist_cntnr");
    location.reload();
});

