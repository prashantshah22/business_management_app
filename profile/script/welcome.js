document.getElementById("dp").addEventListener("change",()=>{
    var images_url;
    var input=document.getElementById("dp");
    if(input.files[0].size< 1048576){
        var fileReader=new FileReader();
        fileReader.readAsDataURL(input.files[0]);
        fileReader.onload=(e)=>{
            images_url=e.target.result;
            document.getElementById("dp_label").style.backgroundImage=`url(${e.target.result})`;
            var fafa=document.getElementById("fa_forward");
            fafa.style.display="block";
            fafa.onclick=()=>{
                localStorage.setItem(`${sessionStorage.getItem("user_mail")}image_url`,images_url);
                upload_stop();
                window.location = location.href;
            }
        }
    }
    else{
        alert("File size should be less than 1 MB");
    }
})

function profile(){
    var name=document.getElementById("p_name");
    var user_mail=sessionStorage.getItem("user_mail");
if(user_mail!=null){
    var key=localStorage.getItem((user_mail));
    var user_data=JSON.parse(key);
    name.innerHTML=atob(user_data.name);
}
else{
    document.getElementById("body_div").style.display="none";
    document.body.style.backgroundColor="black";
    document.body.innerHTML="<h1>Please Login</h1>";
    document.body.style.color="white";
    setTimeout(()=>{window.location.replace("../../index.html");},1000)   
}
}
profile();


function upload_stop(){
    if(localStorage.getItem(`${sessionStorage.getItem("user_mail")}image_url`)!=null){
        document.getElementById("body_div").style.display="none";
    }
}
upload_stop();

function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("logo");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
    if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }
}
function display_name(){
    var user_mail = sessionStorage.getItem("user_mail");
    var name = document.getElementById("nameFromLocalStorage");
  
    if (user_mail != null) {
      var key = localStorage.getItem(user_mail);
      var user_data = JSON.parse(key);
      name.innerHTML = atob(user_data.name);
    }

}


window.onload=()=>{

    var user_mail = sessionStorage.getItem("user_mail");
    if (localStorage.getItem(`${user_mail}image_url`) != null) {
        display_profile(); // If image exists, show profile
    } else {
        document.getElementById("app_content").style.display = "none"; // Hide profile content initially
        document.getElementById("body_div").style.display = "block"; // Show the upload section
    }

    if (user_mail != null) {
        display_name();
    }

}


