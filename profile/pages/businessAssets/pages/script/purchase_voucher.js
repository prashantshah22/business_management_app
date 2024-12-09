

const display_purchase_acc = () => {
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
const add_item=()=>{
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

const calculate_sub_total=()=>{
    var prev_amt=0;
    document.getElementById("sub_total").innerHTML="";
    var amt=document.getElementsByClassName("amt_input");
    for(let i=0;i<amt.length;i++){
        prev_amt+=Number(amt[i].value);
        document.getElementById("sub_total").innerHTML=`<p id="sub_total_amt">${prev_amt.toFixed(2)}</p>`;
    }
}


const set_Tax=()=>{
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

const read_tax_ls=()=>{
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


const calculate_tax = () => {
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


const calculate_total=()=>{
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


const paid=()=>{
    var paid =document.getElementById("paid_input");
    paid.oninput=function (){
        var total=Number(document.getElementById("total_cal").innerHTML);
        var dues=document.getElementById("dues");
        dues.innerHTML=`<p id="dues_cal">${(total-Number(this.value)).toFixed(2)}</p>`
    }
}


//arrow key functionality to select purchase account name
const arrow_fn=()=>{
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
        }
    }
    /////
    input.onkeyup=(e)=>{
        if(e.keyCode==38){
            if(sessionStorage.getItem("count")==null){
                hint_hover[hint_hover.length-1].style.backgroundColor="blue";
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
        }
    }
}
arrow_fn();