function display_profile() {
  var user_mail = sessionStorage.getItem("user_mail");
  var logo = document.getElementById("dp");
  var image_url = localStorage.getItem(`${user_mail}image_url`);
  var logo_div = document.getElementById("logo_div");
  var logo_url = localStorage.getItem("logo");
  var local_storage = localStorage.getItem("Company_details")
  var local_data = JSON.parse(local_storage);
  var name_div = document.getElementById("name_div");
  if (image_url != null) {
    logo.style.backgroundImage = `url(${image_url})`;
    logo.style.backgroundSize = "cover";
  }

  if (logo_url != null) {
    logo_div.style.backgroundImage = `url(${logo_url})`;
    logo_div.style.backgroundSize = "cover";
  }
  if (local_storage != null && local_data.cmp_name != null) {
    name_div.innerHTML = local_data.cmp_name.toUpperCase();
  }
};
display_profile();

function unit_of_measurement() {
  var unit_btn = document.getElementById("measurement_btn");
  var pri_cntnr = document.getElementById("measurement");
  var sec_cntnr = document.getElementById("measure_click");
  var close = document.getElementById("measure_close");
  var form = document.getElementById("form");
  unit_btn.onclick = function () {
    this.style.transform = "rotateX(180deg)";
    this.style.transition = "1s";
    sec_cntnr.style.display = "block";
    setTimeout(() => {
      sec_cntnr.style.transform = "rotateX(-180deg)";
      sec_cntnr.style.transition = "1s";
      pri_cntnr.style.display = "none";
      close.onclick = function () {
        unit_btn.className = "animated flipInX";
        unit_btn.innerHTML = '<div id="measurement"><i class="fa fa-balance-scale" aria-hidden="true" id="fa-balance-scale"></i><span>Measurement Unit</span></div>';
        setTimeout(() => {
          window.location = location.href;
        }, 10)
      }
      form.onsubmit = function () {
        var symbol = document.getElementById("symbol");
        var formal_name = document.getElementById("fullname");
        var unit_obj = { symbol: symbol.value, formal_name: formal_name.value, }
        var unit_details = JSON.stringify(unit_obj);
        localStorage.setItem("unit_measurement_" + symbol.value, unit_details);
      }
    }, 500)
  }
}
unit_of_measurement();
var all_voucher_no = 1;
function open_sales() {
  var sales_voucher = document.getElementById("sales_btn");
  var hdn_dv = document.getElementById("bill")
  var close = document.getElementById("close_button");
  sales_voucher.onclick = () => {
    hdn_dv.style.display = "block";
    document.getElementById("manage_section").style.display="none";
    close.onclick = () => {
      hdn_dv.style.animationName = "up";
      setTimeout(() => {
        hdn_dv.style.display = "none";
        hdn_dv.style.animationName = "down";
      }, 1000)
      document.getElementById("manage_section").style.display="block";
    }
    let keys = [];
    for (let j = 0; j < localStorage.length; j++) {
      keys.push(localStorage.key(j));
    }
    keys.sort();
    var voucher_no = document.getElementById("voucher_number");
    for (let j = 0; j < keys.length; j++) {
      var local_key = keys[j];
      if (local_key.match("voucher_no")) {
        var find = local_key.split("_");
        all_voucher_no = parseInt(find[2]);
        all_voucher_no++;
        voucher_no.innerHTML = "Voucher No: " + all_voucher_no;
      }
      else if (local_key.match("voucher_no") == null) {
        voucher_no.innerHTML = "Voucher No: " + all_voucher_no;
      }
    }
  }
}
open_sales();
function voucher_logo() {
  var logo = document.getElementById("cmpny_logo");
  var logo_url = localStorage.getItem("logo");
  var cmpny_detail_div = document.getElementById("cmpny_details");
  if (logo_url != null) {
    logo.src = logo_url;

  }
  if (localStorage.getItem("Company_details") != null) {
    var cmpny_data = localStorage.getItem("Company_details");
    var cmpny_details = JSON.parse(cmpny_data);
    var hone = document.createElement("h1");
    var addr = document.createElement("p");
    var tel = document.createElement("h5");
    cmpny_detail_div.appendChild(hone);
    cmpny_detail_div.appendChild(addr);
    cmpny_detail_div.appendChild(tel);
    hone.appendChild(document.createTextNode(cmpny_details.mailing_name));
    addr.appendChild(document.createTextNode(cmpny_details.address));
    tel.appendChild(document.createTextNode(cmpny_details.phone));
  }
}
voucher_logo();

function tax_show() {
  for (let i = 0; i < localStorage.length; i++) {
    var tax_name = localStorage.key(i);
    if (tax_name.indexOf("tax") != -1) {
      var tax_th = document.getElementById("tax_th");
      var tax_data = localStorage.getItem(tax_name);
      var tax_details = JSON.parse(tax_data);
      tax_th.innerHTML += tax_details.tax_name + " (" + tax_details.tax_percentage + ") <br>";
    }
  }

}
tax_show();

var store_subtotal, tax = [],store_total, store_paid, store_due, all_voucher_number,tax_qty="";

var voucher_date;
function show_date() {
  var date_show = document.getElementById("date");
  var date = new Date();
  var current_date = date.toLocaleDateString();
  date_show.innerHTML = current_date;
  voucher_date = current_date;
};
show_date();
function tax_data() {
  var tax_btn = document.getElementById("tax_btn");
  var tax_inpt_div = document.getElementById("tax_hidden_div");
  var fa_close = document.getElementById("tax_close_fa");
  tax_btn.onclick = function () {
    tax_inpt_div.style.display = "block";
    document.getElementById("manage_section").style.display="none";
    fa_close.onclick = function () {
      tax_inpt_div.style.animationName = "tax_down";
      setTimeout(() => {
        tax_inpt_div.style.display = "none";
        tax_inpt_div.style.animationName = "tax_up";
        document.getElementById("manage_section").style.display="block";
      }, 1000)
    }
  }

  var tax_name_input = document.getElementById("tax_name_inpt");
  var tax_per_inpt = document.getElementById("tax_per_inpt");
  var tax_form = document.getElementById("tax_form");

  tax_name_input.onchange = function () {
    if (tax_name_input.value.indexOf("tax") != -1) {
      tax_per_inpt.oninput = () => {
        if (tax_per_inpt.value.charAt(0).indexOf("%") == -1) {
          tax_form.onsubmit = () => {
            if (tax_per_inpt.value.indexOf("%") != -1) {
              var regexp = /[^%0-9]+/;
              var check = tax_per_inpt.value.match(regexp);
              if (check == null) {
                var sales_tax_data = {
                  tax_name: tax_name_input.value,
                  tax_percentage: tax_per_inpt.value
                }
                var sales_tax_details = JSON.stringify(sales_tax_data);
                localStorage.setItem(tax_name_input.value, sales_tax_details);
              }
              else {
                alert("should have number and % only ");
                return false;
              }

            }
            else {
              alert("must include %");
              return false;
            }
          }
        }
        else {
          tax_per_inpt.classList.add("animated", "infinite", "pulse");
          tax_per_inpt.value = "% in at 1st not allowed";
          tax_per_inpt.style.color = "red";
          tax_per_inpt.style.borderColor = "red";
          tax_per_inpt.onclick = function () {
            tax_per_inpt.classList.remove("animated", "infinite", "pulse");
            tax_per_inpt.value = "";
            tax_per_inpt.style.color = "inherit";
            tax_per_inpt.style.borderColor = "inherit";
          }
        }
      }

    }
    else {
      tax_name_input.classList.add("animated", "infinite", "pulse");
      tax_name_input.value = "must add tax word";
      tax_name_input.style.color = "red";
      tax_name_input.style.borderColor = "red";
      tax_name_input.onclick = function () {
        tax_name_input.classList.remove("animated", "infinite", "pulse");
        tax_name_input.value = "";
        tax_name_input.style.color = "inherit";
        tax_name_input.style.borderColor = "inherit";
      }
    }
  }
}
tax_data();



const manage_tax = () => {
  var select_tax = document.getElementById("tax_select");
  let all_keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    all_keys.push(localStorage.key(i));
  }
  all_keys.sort();
  for (let i = 0; i < all_keys.length; i++) {
    var keys = all_keys[i];
    if (keys.match("tax")!=null) {
      document.getElementById("show_tax").style.visibility="visible";
      var options = document.createElement("option");
      options.append(document.createTextNode(keys));
      select_tax.appendChild(options);
    }
  }

  //open tax menu for edit
  select_tax.onchange = (e) => {
    var reserve = e.target.value;
    document.getElementById("tax_btn").click();
    var tax_icon=document.getElementById("fa_cal");
    tax_icon.className="fa fa-trash";
    tax_icon.onclick=function(){
      localStorage.removeItem(reserve);
      window.location=location.href;
    }
  
    e.target.onclick = () => {
      document.getElementById("tax_btn").click();
    }
    var tax_string = localStorage.getItem(e.target.value);
    var tax_details = JSON.parse(tax_string);
    document.getElementById("tax_name_inpt").value = tax_details.tax_name;
    document.getElementById("tax_per_inpt").value = tax_details.tax_percentage;
    var submit_btn = document.getElementById("tax_submit");
    submit_btn.onclick = () => {
      var tax_name = document.getElementById("tax_name_inpt").value;
      var tax_percentage = document.getElementById("tax_per_inpt").value;
      if (tax_name == reserve) {
        var tax_data = {
          tax_name: tax_name,
          tax_percentage: tax_percentage
        }
        var tax_details = JSON.stringify(tax_data);
        localStorage.setItem(tax_name, tax_details);
      }
      else {
        localStorage.removeItem(reserve);
        var tax_data = {
          tax_name: tax_name,
          tax_percentage: tax_percentage
        }
        var tax_details = JSON.stringify(tax_data);
        localStorage.setItem(tax_name, tax_details);
      }
    }

  }
}
manage_tax();

//hiding main section
window.onload=()=>{
  hide_main_sec();
}
function hide_main_sec(){

  for(let i=0;i<localStorage.length;i++){
    var all_keys=localStorage.key(i);
    if(all_keys.match("tax")!=null || all_keys.match("voucher_no")!=null){
      document.getElementById("manage_section").style.display="block";
      break;
    }
    else{
      document.getElementById("manage_section").style.display="none";
    }
  }
}

document.getElementById("shut_down").addEventListener("click",()=>{
  window.location="../business.html";
})