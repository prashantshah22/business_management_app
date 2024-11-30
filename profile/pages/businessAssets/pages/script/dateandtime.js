function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }}
display_profile();
const show_date=()=>{
    var date=new Date();
    document.getElementById("date_show").innerHTML=`Date: <strong>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</strong>`;
    setInterval(()=>{
        var date=new Date();
        document.getElementById("time_show").innerHTML=`Time: <strong>${date.toLocaleTimeString('en-US', { hour12: false })}</strong>`;
    },1000)
}
show_date(); 
const show_cmpny_logo=()=>{
    var img_url=localStorage.getItem("logo");
    document.getElementById("cmpy_logo").style.backgroundSize="cover";
    document.getElementById("cmpy_logo").style.backgroundImage=`url(${img_url})`;
}
show_cmpny_logo();
const show_cmpy_name=()=>{
    var cmpny_name_div=document.getElementById("cmpy_name");
    var cmpny_data=JSON.parse(localStorage.getItem("Company_details"));
    cmpny_name_div.innerHTML=cmpny_data.cmp_name;
}
show_cmpy_name();

    