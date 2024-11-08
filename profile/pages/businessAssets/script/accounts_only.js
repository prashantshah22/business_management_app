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
      pri_cntnr.style.display = "none";
      sec_cntnr.style.transform = "rotateX(-180deg)";
      sec_cntnr.style.transition = "1s";
      close.onclick = function () {
        unit_btn.className = "animated flipInX";
        unit_btn.innerHTML = '<div id="measurement"><i class="fa fa-balance-scale" aria-hidden="true" id="fa-balance-scale"></i><span>Measurement Unit</span></div>';
        setTimeout(() => {
          window.location = location.href;
        }, 1000)
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
var all_voucher_no=1;
function open_sales() {
  var sales_voucher = document.getElementById("sales_btn");
  var hdn_dv = document.getElementById("bill")
  var close = document.getElementById("close_button");
  sales_voucher.onclick = () => {
    hdn_dv.style.display = "block";
    close.onclick = () => {
      hdn_dv.style.animationName = "up";
      setTimeout(() => {
        hdn_dv.style.display = "none";
        hdn_dv.style.animationName = "down";
      }, 1000)
    }
    let keys = [];
    for (let j = 0; j < localStorage.length; j++) {
      keys.push(localStorage.key(j));
    }
    keys.sort();
    var voucher_no=document.getElementById("voucher_number");
    for(let j=0;j<keys.length;j++){
      var local_key=keys[j];
      if(local_key.match("voucher_no")){
        var find=local_key.split("_");
        all_voucher_no=parseInt(find[2]);
        all_voucher_no++;
        console.log(j+" n "+local_key);
        voucher_no.innerHTML="Voucher No: "+all_voucher_no;
      }
      else if(local_key.match("voucher_no")==null){
        voucher_no.innerHTML="Voucher No: "+all_voucher_no;
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
      var tax_th_value = document.getElementById("tax_th_value");
      tax_th.innerHTML += tax_details.tax_name + " (" + tax_details.tax_percentage + ") <br>";
    }
  }

}
tax_show();

var store_subtotal,tax=[],store_total,store_paid,store_due,all_voucher_number;

function add_item() {
  var add_btn = document.getElementById("add_item");
  add_btn.onclick = () => {
    var table = document.getElementById("bill_fill_table");
    var trc = document.createElement("tr");
    trc.className = "tittle_input";
    table.appendChild(trc);
    var tha = document.createElement("td");
    var inpta = document.createElement("input");
    tha.appendChild(inpta);
    trc.appendChild(tha);
    inpta.setAttribute("class", "desc_inpt");
    inpta.setAttribute("type", "text");
    var thb = document.createElement("td");
    var inptb = document.createElement("input");
    trc.appendChild(thb);
    thb.appendChild(inptb);
    inptb.setAttribute("class", "price_inpt");
    inptb.setAttribute("type", "number");
    inptb.disabled = true;
    var thc = document.createElement("td");
    var inptc = document.createElement("input");
    inptc.setAttribute("class", "qty_inpt");
    inptc.setAttribute("type", "number");
    inptc.disabled = true;
    trc.appendChild(thc);
    thc.appendChild(inptc);
    var thd = document.createElement("td");
    var inptd = document.createElement("input");
    inptd.setAttribute("class", "amt_inpt");
    inptd.setAttribute("type", "number");
    trc.appendChild(thd);
    thd.appendChild(inptd);
    var the = document.createElement("td");
    var del_icon = document.createElement("i");
    the.className = "del";
    del_icon.setAttribute("class", "fa fa-trash-o");
    del_icon.setAttribute("aria-hidden", "true");
    trc.appendChild(the);
    the.appendChild(del_icon);
    del_icon.onclick = function () {
      var del_icon_td = this.parentElement.parentElement;
      del_icon_td.remove();
    }
    inptd.addEventListener("keydown", (event) => {
      event.preventDefault();
    });
    inptd.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    inpta.oninput = function () {
      this.onkeydown = function (event) {
        if (event.keyCode == 13) {
          var parent_item = this.parentElement;
          var tr_of_item = parent_item.parentElement;
          tr_of_item.getElementsByTagName("input")[1].focus();
        }
      }
      inptb.disabled = false;
      inptb.oninput = function () {
        this.onkeydown = function (event) {
          if (event.keyCode == 13) {
            var parent_item = this.parentElement;
            var tr_of_item = parent_item.parentElement;
            tr_of_item.getElementsByTagName("input")[2].focus();
          }
        }
        inptc.disabled = false;
        inptc.oninput = function amt_cal() {
          var sub_total = document.getElementById("sub_total");
          var amt = document.getElementsByClassName("amt_inpt");
          inptd.value = inptb.value * inptc.value;
          let prevamt = 0;
          for (let i = 0; i < amt.length; i++) {
            prevamt += Number(amt[i].value);
            sub_total.innerHTML = prevamt.toFixed(2);
            store_subtotal=prevamt.toFixed(2);
          }
          var reserve = 0;
          var tax_th_value = document.getElementById("tax_th_value");
          for (let i = 0; i < localStorage.length; i++) {
            var tax_name = localStorage.key(i);
            if (tax_name.indexOf("tax") != -1) {
              var tax_data = localStorage.getItem(tax_name);
              var tax_details = JSON.parse(tax_data);
              reserve += tax_details.tax_percentage + "<br>";
              tax_th_value.innerHTML = '<span id="span_percentage" style="display:none">' + reserve.replace(0, "") + '</span>';
            }
          }
          var split_num = document.getElementById("span_percentage").innerHTML;
          var final_num = split_num.split("%<br>");
          var total = document.getElementById("total")
          var dues = document.getElementById("dues");
          var paid = document.getElementById("paid");
          for (let i = 0; i < final_num.length - 1; i++) {
            var cal = (prevamt * final_num[i]) / 100;
            tax[i]=cal.toFixed(2);
            tax_th_value.innerHTML += cal.toFixed(2) + "<br>";
            prevamt += cal;
            total.innerHTML = prevamt.toFixed(2);
            store_total=prevamt.toFixed(2);
            dues.innerHTML = prevamt.toFixed(2);
          }
          paid.oninput = () => {
            store_paid=paid.value;;
            var left = prevamt - paid.value;
            dues.innerHTML = left.toFixed(2);
            store_due=left.toFixed(2);
          }
        }
      }
    }
  }
}
add_item();

var voucher_date;
function show_date() {
  var date_show = document.getElementById("date");
  var date = new Date();
  var current_date = date.toLocaleDateString();
  date_show.innerHTML = current_date;
  voucher_date=current_date;
};
show_date();
function tax_data() {
  var tax_btn = document.getElementById("tax_btn");
  var tax_inpt_div = document.getElementById("tax_hidden_div");
  var fa_close = document.getElementById("tax_close_fa");
  tax_btn.onclick = function () {
    tax_inpt_div.style.display = "block";
    fa_close.onclick = function () {
      tax_inpt_div.style.animationName = "tax_down";
      setTimeout(() => {
        tax_inpt_div.style.display = "none";
        tax_inpt_div.style.animationName = "tax_up";
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

function shift_focus() {
  var buyer_form = document.getElementById("buyer_form");
  var inpt = buyer_form.getElementsByTagName("input");
  inpt[0].onkeyup = function (event) {
    if (event.keyCode == 13) {
      inpt[1].focus();
    }
  }
  inpt[1].onkeyup = function (event) {
    if (event.keyCode == 13) {
      inpt[2].focus();
    }
  }
  inpt[2].onkeyup = function (event) {
    if (event.keyCode == 13) {
      inpt[3].focus();
    }
  }
  inpt[3].onkeyup = function (event) {
    if (event.keyCode == 13) {
      document.getElementById("add_item").click();
      var product_table = document.getElementById("bill_fill_table");
      product_table.getElementsByTagName("input")[0].focus();
    }
  }
}
shift_focus();


function get_bills() {
  var get_bill_btn = document.getElementById("get_bill");
  get_bill_btn.onclick = function () {
    var store_item=[],store_price=[],store_qty=[],store_amt=[];
    document.getElementById("close_button").style.display = "none";;
    document.getElementById("get_bill").style.display = "none";
    document.getElementById("add_item").style.display = "none";
    document.getElementById("tax").style.display = "none";
    document.body.style.color = "black";
    var sales_voucher_div = document.getElementById("bill");
    sales_voucher_div.style.width = "100%";
    sales_voucher_div.style.height = "100vh";
    sales_voucher_div.style.left = "0";
    sales_voucher_div.style.top = "0";
    var inpt = sales_voucher_div.getElementsByTagName("input");
    for (let i = 0; i < inpt.length; i++) {
      inpt[i].style.border = "none";
      inpt[i].style.background = "white";
    }
    var del_icon = document.getElementsByClassName("del");
    for (let i = 0; i < del_icon.length; i++) {
      del_icon[i].style.display = "none";
    }
    var buyer_name = document.getElementById("name").value;
    var buyer_mail = document.getElementById("mail").value;
    var buyer_address = document.getElementById("address").value;
    var buyer_phone = document.getElementById("phone").value;

    var product_des=document.getElementsByClassName("desc_inpt");
    for(let i=0;i<product_des.length;i++){
      store_item[i]=product_des[i].value;
    }
    var product_price=document.getElementsByClassName("price_inpt");
    for(let i=0;i<product_price.length;i++){
      store_price[i]=product_price[i].value;
    }
    var product_qty=document.getElementsByClassName("qty_inpt");
    for(let i=0;i<product_qty.length;i++){
      store_qty[i]=product_qty[i].value;
    }
    var product_amt=document.getElementsByClassName("amt_inpt");
    for(let i=0;i<product_amt.length;i++){
      store_amt[i]=product_amt[i].value;
    }
    var buyer_obj={
      buyer_name:buyer_name,
      buyer_mail:buyer_mail,
      buyer_address:buyer_address,
      buyer_phone:buyer_phone,
      store_item:store_item,
      store_price:store_price,
      store_qty:store_qty,
      store_amt:store_amt,
      store_subtotal:store_subtotal,
      store_tax:tax,
      store_total:store_total,
      store_paid:store_paid,
      store_due:store_due,
      store_date:voucher_date
    }
    var buyer_details=JSON.stringify(buyer_obj);
    localStorage.setItem("voucher_no_"+all_voucher_no,buyer_details);
  }

}
get_bills();


// search vouchervoucher
function search_voucher(){
  var search_field=document.getElementById("voucher_search_input");
  search_field.onkeyup=(e)=>{
    if(e.keyCode==13){
      var user_input=`voucher_no_${e.target.value}`;
      let keys = [];
      for (let j = 0; j < localStorage.length; j++) {
        keys.push(localStorage.key(j));
      }
      keys.sort();
      for(let i=0;i<keys.length;i++){
        var all_key=keys[i];
        if(all_key===user_input){
          var buyer_string=localStorage.getItem(all_key);
          var buyer_details=JSON.parse(buyer_string);
          document.getElementById("sales_btn").click();
          document.getElementById("voucher_number").innerHTML=`voucher no: ${e.target.value} `;
          document.getElementById("name").value=buyer_details.buyer_name;
          document.getElementById("mail").value=buyer_details.buyer_mail;
          document.getElementById("address").value=buyer_details.buyer_address;
          document.getElementById("phone").value=buyer_details.buyer_phone;
          var itemLength=buyer_details.store_item.length;
          var item=document.getElementsByClassName("desc_inpt");
          var price=document.getElementsByClassName("price_inpt");
          var qty=document.getElementsByClassName("qty_inpt");
          var amt=document.getElementsByClassName("amt_inpt");
          for(let i=0;i<itemLength;i++){
            document.getElementById("add_item").click();
            item[i].value=buyer_details.store_item[i];
            price[i].disabled=false;
            price[i].value=buyer_details.store_price[i];
            qty[i].disabled=false;
            qty[i].value=buyer_details.store_qty[i];
            amt[i].value=buyer_details.store_amt[i];
          }
          document.getElementById("sub_total").innerHTML=buyer_details.store_subtotal;
          var taxLength=buyer_details.store_tax.length;
          document.getElementById("tax_th_value").innerHTM="";
          for(let i=0;i<taxLength;i++){
            document.getElementById("tax_th_value").innerHTML+=buyer_details.store_tax[i]+"<br>";
          }
          document.getElementById("total").innerHTML=buyer_details.store_total;
          document.getElementById("paid").value=buyer_details.store_paid;
          document.getElementById("dues").innerHTML=buyer_details.store_due;

        }
      }
    }
  }
}
search_voucher();