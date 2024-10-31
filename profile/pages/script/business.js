function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);

     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }


}
display_profile();
var btn = document.getElementsByTagName("button");
const hover_button = () => {
  for (let i = 0; i < btn.length; i++) { 
    btn[i].addEventListener("mouseover", () => {
      btn[i].className = "animated pulse";
    });

    btn[i].addEventListener("mouseout", () => {
      btn[i].className = "";
    });
  }
};

hover_button();
btn[0].addEventListener("click",(e)=>{
    var hidden_div=document.getElementById("form_for_creat_company");
    if(hidden_div.offsetHeight==0){
      hidden_div.style.display="block";
      hidden_div.style.height="400px";
      hidden_div.style.animation="slideup 1s 1";
      e.target.innerHTML="Close Form";
    }
    else{
      hidden_div.style.animation="slidedown 1s 1";
      hidden_div.style.height="0";
      setTimeout(()=>{
        hidden_div.style.display="none";
        e.target.innerHTML="Create Company";
      },1000);
    }
});

document.getElementById("company_name").addEventListener("change",(e)=>{

  if(!isNaN(e.target.value)){
    e.target.style.borderColor = "red";
    e.target.classList.add("animated", "headShake");
    e.target.addEventListener("click", () => {
      e.target.style.borderColor = "inherit";
      e.target.classList.remove("animated", "headShake");
      e.target.value = "";
    })
  }
else{
  alert("test");
}

})
