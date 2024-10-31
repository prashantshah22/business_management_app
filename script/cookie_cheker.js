function cookie_cheker(){
    if(navigator.cookieEnabled==false)
    {
        document.getElementById("webPpage").style.display="none";
        document.body.style.backgroundColor="black";
        document.body.innerHTML="<h1>Please enable cookie</h1>";
        document.body.style.color="white";

    }
}
cookie_cheker();