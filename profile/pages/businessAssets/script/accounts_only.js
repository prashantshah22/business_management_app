function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);
    var logo_div=document.getElementById("logo_div");
    var logo_url=localStorage.getItem("logo");
    var local_storage=localStorage.getItem("Company_details")
    var local_data=JSON.parse(local_storage);
    var name_div=document.getElementById("name_div");
     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }
      
      if(logo_url!=null){
        logo_div.style.backgroundImage=`url(${logo_url})`;
        logo_div.style.backgroundSize="cover";
      }
      if(local_storage!=null&&local_data.cmp_name!=null){
        name_div.innerHTML=local_data.cmp_name.toUpperCase();
      }
};
display_profile();

function unit_of_measurement(){
  var unit_btn=document.getElementById("measurement_btn");
  var pri_cntnr=document.getElementById("measurement");
  var sec_cntnr=document.getElementById("measure_click");
  var close=document.getElementById("measure_close");
  var form=document.getElementById("form");
  unit_btn.onclick=function(){
    this.style.transform = "rotateX(180deg)";
    this.style.transition = "1s";
    sec_cntnr.style.display="block";
    setTimeout(()=>{
      pri_cntnr.style.display = "none";
      sec_cntnr.style.transform = "rotateX(-180deg)";
      sec_cntnr.style.transition = "1s";
      close.onclick=function(){
      unit_btn.className = "animated flipInX";
      unit_btn.innerHTML='<div id="measurement"><i class="fa fa-balance-scale" aria-hidden="true" id="fa-balance-scale"></i><span>Measurement Unit</span></div>';
      setTimeout(()=>{
        window.location=location.href;
      },1000)
      }
      form.onsubmit=function(){
        var symbol=document.getElementById("symbol");
        var formal_name=document.getElementById("fullname");
        var unit_obj={symbol:symbol.value,formal_name:formal_name.value,}
        var unit_details=JSON.stringify(unit_obj);
        localStorage.setItem("unit_measurement_"+symbol.value,unit_details);
      }
    },500)
  }
}
unit_of_measurement();
 
function open_sales(){
  var sales_voucher=document.getElementById("sales_btn");
  var hdn_dv=document.getElementById("bill")
  var close=document.getElementById("close_button");
  sales_voucher.onclick=()=>{
    hdn_dv.style.display="block";
    close.onclick=()=>{
      hdn_dv.style.animationName="up";
      setTimeout(()=>{
        hdn_dv.style.display="none";
      },1000)
    }

  }
}
open_sales();
function voucher_logo(){
var logo=document.getElementById("cmpny_logo");
var logo_url=localStorage.getItem("logo");
var cmpny_detail_div=document.getElementById("cmpny_details");
  if(logo_url!=null){
    logo.style.backgroundImage=`url(${logo_url})`;
    logo.style.backgroundSize="100px 100px";
    logo.style.backgroundRepeat="no-repeat";
  }
  var cmpny_data=localStorage.getItem("Company_details");
  var cmpny_details=JSON.parse(cmpny_data);
   var hone=document.createElement("h1");
   var addr=document.createElement("p");
   var tel=document.createElement("h5");
   cmpny_detail_div.appendChild(hone);
   cmpny_detail_div.appendChild(addr);
   cmpny_detail_div.appendChild(tel);
   hone.appendChild(document.createTextNode(cmpny_details.mailing_name));
   addr.appendChild(document.createTextNode(cmpny_details.address));
   tel.appendChild(document.createTextNode(cmpny_details.phone));
}
voucher_logo();
function add_item(){
  var add_btn=document.getElementById("add_item");
  add_btn.onclick=()=>{
    var table=document.getElementById("bill_fill_table");
    var trc=document.createElement("tr");
    trc.setAttribute("class","tittle_input");
    table.appendChild(trc);
    var tha=document.createElement("th");
    var inpta=document.createElement("input");
    tha.appendChild(inpta);
    trc.appendChild(tha);
    inpta.setAttribute("class","desc_inpt");
    inpta.setAttribute("type","text");
    var thb=document.createElement("th");
    var inptb=document.createElement("input");
    trc.appendChild(thb);
    thb.appendChild(inptb);
    inptb.setAttribute("class","price_inpt");
    inptb.setAttribute("type","number");
    inptb.disabled=true;
    var thc=document.createElement("th");
    var inptc=document.createElement("input");
    inptc.setAttribute("class","qty_inpt");
    inptc.setAttribute("type","number");
    inptc.disabled=true;
    trc.appendChild(thc);
    thc.appendChild(inptc);
    var thd=document.createElement("th");
    var inptd=document.createElement("input");
    inptd.setAttribute("class","amt_inpt");
    inptd.setAttribute("type","number");
    trc.appendChild(thd);
    thd.appendChild(inptd);
    var the=document.createElement("th");
    var del_icon=document.createElement("i");
    del_icon.setAttribute("id","del");
    del_icon.setAttribute("class","fa fa-trash-o");
    del_icon.setAttribute("aria-hidden","true");
    trc.appendChild(the);
    the.appendChild(del_icon);
    del_icon.onclick=function(){
      var del_icon_td=this.parentElement.parentElement;
      del_icon_td.remove();
    }
    inptd.addEventListener("keydown",(event)=>{
      event.preventDefault();
    });
    inptd.addEventListener("contextmenu",(event)=>{
      event.preventDefault();
    });

    inpta.oninput=function(){
      inptb.disabled=false;
      inptb.oninput=function(){
        inptc.disabled=false;
        inptc.oninput=function amt_cal(){
          var sub_total=document.getElementById("sub_total");
           var amt=document.getElementsByClassName("amt_inpt");
           inptd.value=inptb.value*inptc.value;
           let prevamt=0;
          for(let i=0;i<amt.length;i++){
            prevamt+=Number(amt[i].value);
            sub_total.innerHTML=prevamt;
          }
        }
      }
    }

  }
}
add_item();