

const pass_regexp=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
const mail_regexp=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
document.getElementById("signup_form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var user_input={
        name:btoa(document.getElementById("sign_usrname").value.trim()),
        email:btoa(document.getElementById("sign_email").value.trim()),
        password:btoa(document.getElementById("sign_password").value.trim()),
        mobile:btoa(document.getElementById("sign_tel").value.trim()),
    }
    var user_date=JSON.stringify(user_input);
     if(user_input.name.length!=0 && mail_regexp.test(atob(user_input.email))
        && pass_regexp.test(atob(user_input.password)) && user_input.mobile !== ""){
        localStorage.setItem(user_input.email,user_date);
        document.getElementById("signin").innerHTML="Sign In Successful";
        document.getElementById("sign_usrname").value = "";
        document.getElementById("sign_email").value = "";
        document.getElementById("sign_password").value = "";
        document.getElementById("sign_tel").value = "";
        setTimeout(() => {
            document.getElementById("signin").innerHTML="";
            document.getElementsByClassName("left_side")[0].style.display = "none";
        }, 1000);
    }
});

document.getElementById("sign_email").addEventListener("change",()=>{
    var email=btoa(document.getElementById("sign_email").value.trim());
    if(localStorage.getItem(email)!=null){
        document.getElementById("userExist").style.display="block";
        document.getElementById("userExist").innerHTML="User already exists";
        document.getElementById("sign_tel").disabled=true;
        document.getElementById("sign_password").disabled=true;
        document.getElementById("submit").disabled=true;
        document.getElementById("sign_email").classList.add("pulse");
        document.getElementById("sign_email").style.backgroundColor="red";
        document.getElementById("sign_email").style.color="white";
        document.getElementById("sign_email").addEventListener("click",(e)=>{
            e.target.value="";
            e.target.style.color="";
            e.target.style.backgroundColor="";
            document.getElementById("userExist").innerHTML="";
            document.getElementById("userExist").style.display="none";
            document.getElementById("sign_tel").disabled=false;
            document.getElementById("sign_password").disabled=false;
            document.getElementById("submit").disabled=false;
            e.target.classList.remove("pulse");
        });
     }
    }
);

document.getElementById("sign_password").addEventListener("change", () => {
    const passwordField = document.getElementById("sign_password");
    if (!pass_regexp.test(passwordField.value)) {
        passwordField.classList.add("pulse");
        passwordField.style.backgroundColor = "red";
        passwordField.style.color = "white";
        document.getElementById("passhint").style.display = "block";
        passwordField.addEventListener("click", (e) => {
            e.target.value = "";
            e.target.style.color = "";
            e.target.style.backgroundColor = "";
            document.getElementById("passhint").style.display = "none";
            e.target.classList.remove("pulse");
        }, { once: true });
    }
});

document.getElementById("login_form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var login_input={
        username:btoa(document.getElementById("log_usrname").value),
        password:btoa(document.getElementById("log_password").value),
    }
    var login_data=JSON.stringify(login_input);
    sessionStorage.setItem(login_input.username,login_data);
    var user_detail=JSON.parse(sessionStorage.getItem(login_input.username));
    if(localStorage.getItem(user_detail.username)==null){
        window.alert("User does not exist");
    }
    else {
        if(localStorage.getItem(user_detail.username).match(user_detail.password)){
            sessionStorage.setItem("user_mail",login_input.username);
            location.replace("profile/profile.html"); 
        }
        else{
            window.alert("Wrong Password");
        }
    }
})