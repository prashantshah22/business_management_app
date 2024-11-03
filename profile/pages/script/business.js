function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }}
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


var company_name=document.getElementById("company_name");
company_name.addEventListener("change",(e)=>{
  if(localStorage.getItem("Company_details")==null){
 var mailing_name=document.getElementById("mailing_name");
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
 mailing_name.addEventListener("change",()=>{
  mail_name_validation(e.target , mailing_name);
 })}
}})

const mail_name_validation=(company_name,mailing_name)=>{
  if(localStorage.getItem("Company_details")==null){
  if(mailing_name.value===company_name.value){
    mailing_name.value="mailing and company name shouldn't be same";
    mailing_name.style.color="red";
    mailing_name.style.borderColor = "red";
    mailing_name.classList.add("animated", "headShake");
    mailing_name.addEventListener("click",()=>{
    mailing_name.style.borderColor = "inherit";
    mailing_name.classList.remove("animated", "headShake");
    mailing_name.style.color="inherit";
    mailing_name.value = "";
    })
  }
  else if(mailing_name.value.indexOf(company_name.value+".pvt.ltd")!=-1||mailing_name.value.indexOf(company_name.value+".gov.ltd")!=-1){
    var address=document.getElementById("address");
    var finyear=document.getElementById("fin_year");
    var phone=document.getElementById("mobile");
    var fax=document.getElementById("fax");
    var mail=document.getElementById("email");
    var website=document.getElementById("website");
    var stock_type=document.getElementById("stock_type");
    var form=document.getElementById("creat_company_form");
    finyear.addEventListener("change",()=>{
      var current_date=new Date();
      var selected_year=new Date(finyear.value);
      if(selected_year.getFullYear()>=current_date.getFullYear()){
        if(selected_year.getMonth()+1==4){
          if(selected_year.getDate()==1){
            form.addEventListener("submit",()=>{
              var cmp_details={
                cmp_name:company_name.value,
                mailing_name:mailing_name.value,
                address:address.value,
                phone:phone.value,
                fax:fax.value,
                mail:mail.value,
                website:website.value,
                finyear:finyear.value,
                stock_type:stock_type.value,
              }
              var company_data=JSON.stringify(cmp_details);
              localStorage.setItem("Company_details",company_data);
              window.location=location.href;
            })
          }
          else{
            finyear.type="text";
            finyear.value="Only 1st day allowed";
            finyear.style.color="red";
            finyear.style.borderColor = "red";
            finyear.classList.add("animated", "headShake");
            finyear.addEventListener("click",()=>{
            finyear.type="date";
            finyear.style.borderColor = "inherit";
            finyear.classList.remove("animated", "headShake");
            finyear.style.color="inherit";
            })
          }
        }
        else{
          finyear.type="text";
          finyear.value="only April / 4th month allowed";
          finyear.style.color="red";
          finyear.style.borderColor = "red";
          finyear.classList.add("animated", "headShake");
          finyear.addEventListener("click",()=>{
          finyear.type="date";
          finyear.style.borderColor = "inherit";
          finyear.classList.remove("animated", "headShake");
          finyear.style.color="inherit";
          })
        }
      }
      else{
        finyear.type="text";visible_crt_cmpny
        finyear.value="Company Name.pvt.ltd or .gov.ltd";
        finyear.style.color="red";
        finyear.style.borderColor = "red";
        finyear.classList.add("animated", "headShake");
        finyear.addEventListener("click",()=>{
        finyear.type="date";
        finyear.style.borderColor = "inherit";
        finyear.classList.remove("animated", "headShake");
        finyear.style.color="inherit";
        })
      }
    })
  }
  else{
    mailing_name.value="Company Name.pvt.ltd or .gov.ltd";
    mailing_name.style.color="red";
    mailing_name.style.borderColor = "red";
    mailing_name.classList.add("animated", "headShake");
    mailing_name.addEventListener("click",()=>{
    mailing_name.style.borderColor = "inherit";
    mailing_name.classList.remove("animated", "headShake");
    mailing_name.style.color="inherit";
    mailing_name.value = "";
    })}}};

var delete_cmpny=document.getElementById("delete_company");
delete_cmpny.addEventListener("click",()=>{
  var delete_notice=document.getElementById("delete_cmpny_conform");
  var cancel_btn=document.getElementById("cancel_button");
  var ok_btn=document.getElementById("ok_bth");
  if(localStorage.getItem("Company_details")!=null){
    delete_notice.style.visibility="visible";
    ok_btn.onclick=function(){
      localStorage.removeItem("Company_details");
      localStorage.removeItem("logo");
      window.location=location.href;
    }
    cancel_btn.onclick=function(){
      delete_notice.style.visibility="hidden";
    }
  }
  else{
    delete_notice.style.visibility="visible";
    delete_notice.innerHTML="Company Not Created";
    ok_btn.style.visibility="hidden";
    cancel_btn.style.visibility="hidden";
    setTimeout(()=>{
      delete_notice.style.visibility="hidden";
    },1000)
  }
});

document.getElementById("log_out_btn").addEventListener("click",()=>{
  sessionStorage.clear();
  window.location.replace("../../index.html");
});

 var cmpny=document.getElementById("crt_cmp");
 cmpny.addEventListener("click",()=>{
  var localstoragedata=localStorage.getItem("Company_details");
  var local_data=JSON.parse(localstoragedata);

  if(localStorage.getItem("Company_details")!=null&&local_data.stock_type=="accounts Only"){
    window.location.assign("/profile/pages/businessAssets/accounts_only.html");
  }
  else if(localStorage.getItem("Company_details")!=null&&local_data.stock_type=="accounts with inventry"){

    window.location.assign("/profile/pages/businessAssets/accounts_with_inventry.html");
  }
 });

const check_company=()=>{
  if(localStorage.getItem("Company_details")!=null){
   document.getElementById("form_for_creat_company").remove(); 
   var keydata=localStorage.getItem("Company_details");
   var cmp_data=JSON.parse(keydata);
   var brand_name=document.getElementById("crt_cmp");
   brand_name.innerHTML=cmp_data.cmp_name.toUpperCase();
   brand_name.style.fontSize="25px";
   brand_name.style.fontFamily="Times New Roman";
   brand_name.style.color="#ff1aff";
   brand_name.style.fontWeight="900";
   var upload=document.getElementById("fa_home");
   upload.style.cursor="pointer";
   upload.className="fa fa-upload";
   upload.title="Upload Logo";
   upload.classList.add("animated","infinite","flash");
   upload.onclick=function(){
    var input=document.createElement("input");
    input.type="file";
    input.accept="image/*";
    input.click();
    input.addEventListener("change",(e)=>{
      upload_logo(e.target);
    })
   }}};

check_company();
const upload_logo=(env)=>{
  if(env.files[0].size>512000){
    var warning=document.getElementById("upload_notice");
    warning.style.display="block";
     warning.classList.add("fa","fa-warning");
     warning.innerHTML="Maximum Size :512 KB"
     var warning=document.getElementById("upload_notice");
   }
   else{
     var reader=new FileReader();
     reader.readAsDataURL(env.files[0])
     reader.onload=function(){
      localStorage.setItem("logo",reader.result)
      window.location=location.href;
     }}};
const show_logo=()=>{
if(localStorage.getItem("logo")!=null){
  var fa_home=document.getElementById("fa_home");
  fa_home.style.backgroundImage=`url(${localStorage.getItem("logo")})`;
  fa_home.style.backgroundSize="40px 40px";
  fa_home.style.backgroundRepeat="no-repeat";
  fa_home.style.backgroundColor="transparent";
  fa_home.className="fa ";}};
show_logo();
