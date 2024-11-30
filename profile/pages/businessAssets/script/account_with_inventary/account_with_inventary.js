function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }}
display_profile();

const show_logo=()=>{
    const img_url=localStorage.getItem("logo");
    document.getElementById("cmpy_logo").style.backgroundSize="cover";
    document.getElementById("cmpy_logo").style.backgroundImage=`url(${img_url})`;
};
show_logo();
const show_date=()=>{
    var date=new Date();
    document.getElementById("date_show").innerHTML=`Date: <strong>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</strong>`;
    setInterval(()=>{
        var date=new Date();
        document.getElementById("time_show").innerHTML=`Time: <strong>${date.toLocaleTimeString('en-US', { hour12: false })}</strong>`;
    },1000)
}
show_date(); 
document.getElementById("exit_li").addEventListener("click",()=>{
        window.location="../business.html"
    });

function hover(){
    var sect=document.getElementById("sect");
    var li=sect.getElementsByTagName("LI");
    for(let i=0;i<li.length;i++){
        li[i].onmouseover=function(){
            this.style.transition="1s";
            this.style.transform="rotate(360deg)";
        }
        li[i].onmouseout=function(){
            this.style.transition="1s";
            this.style.transform="rotate(0deg)";
        }
    }
} 
hover();

function open_html(){
    var ledger=document.getElementById("ledger_li");
    ledger.onclick=function(){
        window.location="../businessAssets/pages/ledger.html"
    }

}
open_html();