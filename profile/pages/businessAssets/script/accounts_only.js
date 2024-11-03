function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }
      display_logo_and_name();

}
display_profile();
function display_logo_and_name(){
  var logo_div=document.getElementById("logo_div");
  var logo_url=localStorage.getItem("logo");
  var local_storage=localStorage.getItem("Company_details")
  var local_data=JSON.parse(local_storage);
  var name_div=document.getElementById("name_div");
  if(logo_url!=null){
    logo_div.style.backgroundImage=`url(${logo_url})`;
    logo_div.style.backgroundSize="cover";
  }
  if(local_data.cmp_name!=null){
    name_div.innerHTML=local_data.cmp_name.toUpperCase();
  }
}

