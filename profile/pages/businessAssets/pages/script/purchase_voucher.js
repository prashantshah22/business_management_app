
function display_purchase_acc() {
    var input = document.getElementById("purchase_input");
    var hint = document.getElementById("purchase_hint");
    input.onclick = (e) => {
        hint.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            var all_keys = localStorage.key(i);
            if (all_keys.match("ledger_no")) {
                var data = localStorage.getItem(all_keys);
                var details = JSON.parse(data);
                if (details.group.match("Purchase account")) {
                    hint.style.display = "block";
                    hint.innerHTML += `<p class="hint_hover">${details.ledger_name}</p>`;
                    var hint_hover = document.getElementsByClassName("hint_hover");
                    for (let j = 0; j < hint_hover.length; j++) {
                        hint_hover[j].onmouseover = (e) => {
                            e.target.style.backgroundColor = "blue";
                            e.target.style.color = "white";
                            e.target.onclick = () => {
                                input.value = e.target.innerHTML;
                                input.focus();
                                hint.style.display = "none";
                            }
                        }
                        hint_hover[j].onmouseout = (e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "black";
                        }
                    }
                }
            }
        }

    }
    input.oninput = () => {
        var hint_hover = document.getElementsByClassName("hint_hover");
        for (let i = 0; i < hint_hover.length; i++) {
            if (hint_hover[i].innerHTML.toUpperCase().match(input.value.toUpperCase())) {
                hint_hover[i].style.display = "block";
            }
            else {
                hint_hover[i].style.display = "none";
            }
        }
    }

    input.onkeyup=function(event){
        if(event.keyCode==13){
            if(this.value.trim().length!=0){
                var hint_hover=document.getElementsByClassName("hint_hover");
                for(let i=0;i<hint_hover.length;i++){
                    if(this.value.toUpperCase()==hint_hover[i].innerHTML.toUpperCase()){
                        add_item();
                       document.getElementById("purchase_hint").style.display="none";
                    }
                }
            }
        }

    }
}
display_purchase_acc();

// add item
function add_item(){
    var table_item=document.getElementById("table_item");
    document.getElementById("purchase_hint").style.display="none";
    var tr=document.createElement("tr");
    table_item.append(tr);
    var td_item=document.createElement("td");
    var td_qty=document.createElement("td");
    var td_rate=document.createElement("td");
    var td_sp=document.createElement("td");
    var td_per=document.createElement("td");
    var td_amt=document.createElement("td");
    var td_del=document.createElement("td");
    tr.append(td_item,td_qty,td_rate,td_sp,td_per,td_amt,td_del);
    var item_input=document.createElement("input");
    item_input.type="text";
    item_input.id="item_input";
    item_input.classList.add("item_input");
    item_input.placeholder="Item Description";
    td_item.append(item_input);
    var qty_input=document.createElement("input");
    qty_input.type="number";
    qty_input.id="qty_input";
    qty_input.classList.add("qty_input");
    qty_input.placeholder="0";
    td_qty.append(qty_input);
    var rate_input=document.createElement("input");
    rate_input.type="number";
    rate_input.id="rate_input";
    rate_input.placeholder="00.00";
    rate_input.classList.add("rate_input");
    td_rate.append(rate_input);
    var per_input=document.createElement("select");
    per_input.id="per_input";
    per_input.classList.add("per_input");
    var per_options=document.createElement("option");
    per_options.append(document.createTextNode("unit ?"));
    per_input.append(per_options);
    for(let i=0;i<localStorage.length;i++){
        var all_keys=localStorage.key(i);
        if(all_keys.match("unit_measure_")!=null){
            var key_data=localStorage.getItem(all_keys);
            var details=JSON.parse(key_data);
            var options=document.createElement("option");
            options.append(document.createTextNode(details.symbol));
            per_input.append(options);
        }
    }
    var sp_input=document.createElement("input");
    sp_input.type="number";
    sp_input.id="sp_input";
    sp_input.placeholder="00.00";
    sp_input.classList.add("sp_input");
    td_sp.append(sp_input);
    td_per.append(per_input);
    var amt_input=document.createElement("input");
    amt_input.type="number";
    amt_input.id="amt_input";
    amt_input.classList.add("amt_input");
    amt_input.placeholder="00.00";
    td_amt.append(amt_input);
    var delete_icon=document.createElement("I");
    delete_icon.id="del_icon";
    td_del.align="center";
    delete_icon.classList.add("fa","fa-trash");
    td_del.append(delete_icon);
    delete_icon.onclick=(e)=>{
        e.target.parentNode.parentNode.remove();
        calculate_sub_total();
        calculate_tax();
        calculate_total();
        if(table_item.getElementsByTagName("tr").length===1){
            // document.getElementById("sub_total_amt").innerHTML="";
            var tax_value= document.getElementById("tax_value");
            var tax_v_p=tax_value.getElementsByTagName("p");
            for(let k=0;k<tax_v_p.length;k++){
                tax_v_p[k].innerHTML="";  
            }
            document.getElementById("total_value").innerHTML="";
            document.getElementById("paid_input").value="";
            document.getElementById("dues").innerHTML="";
        }

    }
    qty_input.disabled=true;
    rate_input.disabled=true;
    amt_input.disabled=true;
    sp_input.disabled=true;
    item_input.oninput=function (){
        qty_input.disabled=false;
        qty_input.oninput=function(){
            rate_input.disabled=false;
            amt_input.value=(qty_input.value*rate_input.value).toFixed(2);
            rate_input.onkeyup=function(event){
                var keycode=String.fromCharCode(event.keyCode);
                var per_value=per_input.getElementsByTagName("option")
                for(let j=0;j<per_value.length;j++){
                    if(per_value[j].value.toUpperCase().charAt(0).match(keycode.toUpperCase())){
                        per_input.value=per_value[j].value;
                    }
                }
                sp_input.disabled=false;
                amt_input.disabled=false;
                amt_input.value=(qty_input.value*rate_input.value).toFixed(2);
                calculate_sub_total();
                calculate_tax();
                calculate_total();
                amt_input.onkeydown=()=>false;
                amt_input.oncontextmenu=()=>false;
            }
        }

    }

    var active_item=document.getElementsByClassName("item_input");
    active_item[active_item.length-1].focus();
    item_input.onkeyup=function(event){
        if(event.keyCode==13){
            qty_input.focus();
        }
    }
    qty_input.onkeyup=function(event){
        if(event.keyCode==13){
            rate_input.focus();
        }
    }
    rate_input.onkeydown=function(event){
        if(event.keyCode==13){
            sp_input.focus();
        }
    }
    sp_input.onkeydown=function(event){
        if(event.keyCode==13){
            per_input.focus();
            per_input.onchange=()=>{
                document.getElementById("add_btn").click();
            }
        }
    }


}
function call_add_item(){
    var add_item_btn=document.getElementById("add_btn");
    add_item_btn.onclick=()=>{
    add_item();}
}
call_add_item();

function calculate_sub_total(){
    var prev_amt=0;
    document.getElementById("sub_total").innerHTML="";
    var amt=document.getElementsByClassName("amt_input");
    for(let i=0;i<amt.length;i++){
        prev_amt+=Number(amt[i].value);
        document.getElementById("sub_total").innerHTML=`<p id="sub_total_amt">${prev_amt.toFixed(2)}</p>`;
    }
}


function set_Tax(){
    var tax_name=document.getElementById("tax_input");
    var tax_per=document.getElementById("tax_per");
    var tax_submit=document.getElementById("tax_form");
    tax_name.onchange=(e)=>{
        if(e.target.value.match(" tax")!=null){
            tax_per.oninput=()=>{
                if(tax_per.value.charAt(0).indexOf("%")==-1){
                    tax_submit.onsubmit=(e)=>{
                        if(tax_per.value.indexOf("%")!=-1){
                            const regexp = /[a-z!=@#+$_^&*({;:"'|\][?/<,.>})-]/i;
                            var check=tax_per.value.match(regexp);
                            if(check==null){
                                var tax_obj={
                                    tax_name:tax_name.value,
                                    tax_per:tax_per.value
                                }
                                var tax_data=JSON.stringify(tax_obj);
                                localStorage.setItem("ptax_"+tax_name.value,tax_data);
                            }
                            else{
                                alert("Only number and % allowed")
                                return false;
                            }
                        }
                        else{
                            alert("should have % in tax percentage")
                            return false;
                        }
                    }
                }
                else{
                    alert("% shouldnt be after tax percentage");
                    tax_per.value="";
                }
            }
        }
        else{
            alert("must have tax word in tax name");
        }
    }
}
set_Tax();

function read_tax_ls(){
    var keys=[];
    document.getElementById("tax_name").innerHTML="";
    for(let i=0;i<localStorage.length;i++){
        keys.push(localStorage.key(i));
    }
    keys.sort();
    for(let i=0;i<keys.length;i++){
        var all_keys=keys[i];
        if(all_keys.match("ptax_")!=null){
            var data=localStorage.getItem(all_keys);
            var details=JSON.parse(data);
            document.getElementById("tax_name").innerHTML+=`<p>${details.tax_name}&numsp;<span>${details.tax_per}</span></p>`;
        }
    }
}
read_tax_ls();

// const calculate_tax=()=>{
//     var sub_total_amt=Number(document.getElementById("sub_total_amt").innerHTML);
//     var tax_name=document.getElementById("tax_name");
//     document.getElementById("tax_value").innerHTML="";
//     var span=tax_name.getElementsByTagName("span");
//     for(let i=0;i<span.length;i++){
//         var num=span[i].innerHTML.replace("%","");
//         var cal=((sub_total_amt*num)/100).toFixed(2);
//         document.getElementById("tax_value").innerHTML+=`<p>${cal}</p>`;
//     }
// }


function calculate_tax(){
    var sub_total_amt_element = document.getElementById("sub_total_amt");
    if (sub_total_amt_element && sub_total_amt_element.innerHTML.trim() !== "") {
        var sub_total_amt = Number(sub_total_amt_element.innerHTML);
        var tax_name = document.getElementById("tax_name");
        document.getElementById("tax_value").innerHTML = "";
        var span = tax_name.getElementsByTagName("span");
        for (let i = 0; i < span.length; i++) {
            var num = span[i].innerHTML.replace("%", "");
            var cal = ((sub_total_amt * num) / 100).toFixed(2);
            document.getElementById("tax_value").innerHTML += `<p>${cal}</p>`;
        }
    } 
};


function calculate_total(){
    var sub_total_amt_element = document.getElementById("sub_total_amt");
    if (sub_total_amt_element && sub_total_amt_element.innerHTML.trim() !== ""){
    document.getElementById("total_value").innerHTML=" ";
    var sub_total_amt=Number(document.getElementById("sub_total_amt").innerHTML);
    var tax_name=document.getElementById("tax_name").innerHTML;
    if(tax_name.length!=0||tax_name!=""){
        var tax_value_td=document.getElementById("tax_value");
        var tax_value_p=tax_value_td.getElementsByTagName("p");
        for(let i=0;i<tax_value_p.length;i++){
            sub_total_amt+=Number(tax_value_p[i].innerHTML);
            document.getElementById("total_value").innerHTML=`<p id="total_cal">${sub_total_amt}</p>`;
            paid();
        }
    }
    else{
        document.getElementById("total_value").innerHTML=`<p id="total_cal">${sub_total_amt}</p>`;
        paid();
    }
}

}


function paid(){
    var paid =document.getElementById("paid_input");
    paid.oninput=function (){
        var total=Number(document.getElementById("total_cal").innerHTML);
        var dues=document.getElementById("dues");
        dues.innerHTML=`<p id="dues_cal">${(total-Number(this.value)).toFixed(2)}</p>`
    }
}


//arrow key functionality to select purchase account name
function arrow_fn(){
    var input=document.getElementById("purchase_input");
    var hint_hover=document.getElementsByClassName("hint_hover");
    sessionStorage.removeItem("count");
    input.onkeydown=(e)=>{
        if(e.keyCode==40){
            if(sessionStorage.getItem("count")==null){
                hint_hover[0].style.backgroundColor="blue";
                hint_hover[0].style.color="white";
                e.target.value=hint_hover[0].innerHTML;
                sessionStorage.setItem("count",0);
            }
            else{
                for(let i=0;i<hint_hover.length;i++){
                    hint_hover[i].style.backgroundColor="white";
                    hint_hover[i].style.color="black";
                }
                var current=Number(sessionStorage.getItem("count"))+1;
                if(hint_hover[current]!=undefined){
                    sessionStorage.setItem("count",current)
                    hint_hover[current].style.backgroundColor="blue";
                    hint_hover[current].style.color="white";
                    e.target.value=hint_hover[current].innerHTML;
                }
                else{
                    sessionStorage.removeItem("count");
                    hint_hover[0].style.backgroundColor="blue";
                    hint_hover[0].style.color="white";
                    e.target.value=hint_hover[0].innerHTML;

                }   
            }
        }
        else if(e.keyCode==13){
            sessionStorage.removeItem("count");
            document.getElementById("purchase_hint").style.display="none";
            add_item();
        }
    }
    // arrow up
    input.onkeyup=(e)=>{
        if(e.keyCode==38){
            if(sessionStorage.getItem("count")==null){
                hint_hover[hint_hover.length-1].style.backgroundColor="blue";
                hint_hover[hint_hover.length-1].style.color="white";
                e.target.value=hint_hover[hint_hover.length-1].innerHTML;
                sessionStorage.setItem("count",hint_hover.length-1);
            }
            else{
                for(let i=0;i<hint_hover.length;i++){
                    hint_hover[i].style.backgroundColor="white";
                    hint_hover[i].style.color="black";
                }
                var current=Number(sessionStorage.getItem("count"))-1;
                if(hint_hover[current]!=undefined){
                    sessionStorage.setItem("count",current)
                    hint_hover[current].style.backgroundColor="blue";
                    hint_hover[current].style.color="white";
                    e.target.value=hint_hover[current].innerHTML;
                }
                else{
                    sessionStorage.removeItem("count");
                    hint_hover[hint_hover.length-1].style.backgroundColor="blue";
                    hint_hover[hint_hover.length-1].style.color="white";
                    e.target.value=hint_hover[hint_hover.length-1].innerHTML;

                }   
            }
        }
        else if(e.keyCode==13){
            sessionStorage.removeItem("count");
            document.getElementById("purchase_hint").style.display="none";
            add_item();
        }
    }
}
arrow_fn();
function show_date(){
    var date=new Date();
    var date_td= document.getElementById("date_show");
    date_td.innerHTML=` <span id="date_span"><strong id="date_span_s">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</strong></span>`;
    var date_span=document.getElementById("date_span");
    date_span.style.cursor="pointer";
    date_span.onclick=()=>{
        date_span.innerHTML="";
        var input=document.createElement("input");
        input.type="date";
        date_td.append(input);
        input.onblur=(e)=>{
            e.target.remove();
            var s_date=new Date(e.target.value);
            date_span.innerHTML=`<strong id="date_span_s">${s_date.getDate()}/${s_date.getMonth()+1}/${s_date.getFullYear()}</strong>`;
            
        }
    }
}
show_date();

function show_voucher_no(){
    var voucher_no=document.querySelector("#voucher_no");
    var keys=[];
    for (let i=0;i<localStorage.length;i++){
        keys.push(localStorage.key(i));
    }
    keys.sort();
    var large_no=0;
    for(let i=0;i<keys.length;i++){
        var allkeys=keys[i];
        if(allkeys.match("purchase_voucher_")){
            var split_led=allkeys.split("_");
            // var num=Number(allkeys.replace("purchase_voucher_","")); 
        //    voucher_no.innerHTML+=Number(split_led[2])+1;
        if(parseInt(split_led[2])>large_no){
            large_no=parseInt(split_led[2])+1;
        }
        }
    }
    large_no>0?voucher_no.innerHTML=large_no:voucher_no.innerHTML=1;
    // voucher_no.innerHTML=large_no;
}
show_voucher_no();
function store_voucher(){
    var store_item=[],store_qty=[],store_rate=[],store_sales_price=[],store_per=[],store_amt=[],store_tax=[];
    var voucher_num=document.getElementById("voucher_no").innerHTML;
    var voucher_date=document.getElementById("date_span_s").innerHTML;
    var acc_name=document.getElementById("purchase_input").value;
    var item_des=document.getElementsByClassName("item_input");
    for(let i=0;i<item_des.length;i++){
        // store_item.push(item_des[i].value);
        store_item[i]=item_des[i].value;
    }
    var item_qty=document.getElementsByClassName("qty_input");
    for(let i=0;i<item_qty.length;i++){
        // store_qty.push(item_qty[i].value);
        store_qty[i]=item_qty[i].value;
    }
    var item_rate=document.getElementsByClassName("rate_input");
    for(let i=0;i<item_rate.length;i++){
        // store_rate.push(item_rate[i].value);
        store_rate[i]=item_rate[i].value;
    }
    var item_sales_price=document.getElementsByClassName("sp_input");
    for(let i=0;i<item_sales_price.length;i++){
        // store_sales_price.push(item_sales_price[i].value);
        store_sales_price[i]=item_sales_price[i].value;
    }
    var item_per=document.getElementsByClassName("per_input");
    for(let i=0;i<item_per.length;i++){
        // store_per.push(item_per[i].value);
        store_per[i]=item_per[i].value;
    }
    var item_amt=document.getElementsByClassName("amt_input");
    for(let i=0;i<item_amt.length;i++){
        // store_amt.push(item_amt[i].value);
        store_amt[i]=item_amt[i].value;
    }
    var supp_name=document.getElementById("supp_name_inpt").value;
    var supp_ph_no=document.getElementById("supp_no_inpt").value;
    var supp_address=document.getElementById("supp_address").value;
    var tax_value=document.getElementById("tax_value");
    var taxes=tax_value.getElementsByTagName("p");
    for(let i=0;i<taxes.length;i++){
        // store_tax.push(tax_value[i]);
        store_tax[i]=taxes[i].innerHTML;
    }
    var total=document.querySelector("#total_cal").innerHTML;
    var paid=document.querySelector("#paid_input").value;
    var dues=document.querySelector("#dues_cal").innerHTML;
    var sub_total=document.querySelector("#sub_total_amt").innerHTML;
    var object={
        voucher_num:voucher_num,
        voucher_date:voucher_date,
        acc_name:acc_name,
        store_item:store_item,
        store_qty:store_qty,
        store_rate:store_rate,
        store_sales_price:store_sales_price,
        store_per:store_per,
        store_amt:store_amt,
        sub_total:sub_total,
        tax:store_tax,
        supp_name:supp_name,
        supp_ph_no:supp_ph_no,
        supp_address:supp_address,
        total:total,
        paid:paid,
        dues:dues
    }
    var purchase_data=JSON.stringify(object);
    localStorage.setItem("purchase_voucher_"+voucher_num,purchase_data);
}

function store_now(){
    document.getElementById("save_btn").onclick=()=>{
        store_voucher();
        location.reload();
    }
}
store_now();