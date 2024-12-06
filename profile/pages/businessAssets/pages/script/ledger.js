const tabs=()=>{
    var tab_list=document.getElementById("options_div");
    var btn=tab_list.getElementsByTagName("button"); 
    var hide=document.getElementsByClassName("open"); 
    for(let i=0;i<btn.length;i++){
        btn[i].onclick=function(){
            for(let j=0;j<hide.length;j++){
                hide[j].style.display="none";
            }
            for(let j=0;j<btn.length;j++){
                btn[j].classList.remove("active");
            }
           var id_value=this.innerHTML.trim().toLowerCase();
           var show_elements=document.getElementById(id_value);
            show_elements.style.display="block";
            var input_field=show_elements.getElementsByTagName("input");
            input_field[0].focus();
            this.classList.add("active");
        }
    }
}
tabs();

window.onload=function(){
    document.getElementById("default").click();
}


const update_cr_dr=()=>{
var groups=document.getElementById("group");
var cr_dr=document.getElementById("mode");
groups.onchange=(e)=>{
    var acc=e.target.value;
    switch(acc){
        case "Capital account":cr_dr.value="Cr";
        break;
        case "Sales account":cr_dr.value="Cr";
        break;
        case "Purchase account":cr_dr.value="Dr";
        break;
        case "Sundry creditors":cr_dr.value="Cr";
        break;
        case "Sundry debitors":cr_dr.value="Dr";
        break;
        default:cr_dr.value=""
    }
}
}
update_cr_dr();

// create form
const create_submit=()=>{
    var create_form=document.getElementById("create-form");
    create_form.onsubmit=()=>{
     var group=document.getElementById("group");
     var submit=document.getElementById("")
     if(group.value!="Select group"){
        var ledger_name=document.getElementById("ledger-name").value;
        var balance=document.getElementById("balance").value;
        var mode=document.getElementById("mode").value;
        var mailing_name=document.getElementById("mailing-name").value;
        var address=document.getElementById("address").value;
        var ledger_objects={
            ledger_name:ledger_name,
            group:group.value,
            balance:balance,
            mode:mode,
            mailing_name:mailing_name,
            address:address
        }
        var ledger_details=JSON.stringify(ledger_objects);
        localStorage.setItem("ledger_no_"+document.getElementById("ledger-no").innerHTML,ledger_details);
     }
     else{
        group.style.borderColor="red";
        group.classList.add("animate__animated","animate__shakeX");
        group.onclick=()=>{
        group.style.borderColor="";
        group.classList.remove("animate__animated","animate__shakeX");

        }
        return false;
     }
    }
}
create_submit();

const update_ledger_no=()=>{
    var allkeys=[];
    for(let i=0;i<localStorage.length;i++){
        allkeys.push(localStorage.key(i));
    }
    allkeys.sort();
    for(let i=0;i<allkeys.length;i++){
        var keys=allkeys[i];
        if(keys.match("ledger_no_")){
            var split_led=keys.split("_"); 
            document.getElementById("ledger-no").innerHTML=Number(split_led[2])+1;
        }
    }
}
update_ledger_no();

//total calculate

const total_Calculation=()=>{
    var allkeys=[];
    var credit=0,debit=0;
    for(let i=0;i<localStorage.length;i++){
        allkeys.push(localStorage.key(i));
    }
    allkeys.sort();
    for(let i=0;i<allkeys.length;i++){
        var keys=allkeys[i];
        if(keys.match("ledger_no_")){
            var ledger_exract=localStorage.getItem(keys);
            var ledger_data=JSON.parse(ledger_exract);
            if(ledger_data.mode.match("Cr")!=null){
                credit+=Number(ledger_data.balance);
                document.getElementById("credit").innerHTML=credit+"Cr";
            } 
            else if(ledger_data.mode.match("Dr")!=null){
                debit+=Number(ledger_data.balance);
                document.getElementById("debit").innerHTML=debit+"Dr";
            } 
            if(credit>debit){
                document.getElementById("dif").innerHTML=credit-debit+"Cr";
            }
            else{
                document.getElementById("dif").innerHTML=debit-credit+"Dr";
            }
        } 
    }
}
total_Calculation();
// Edit coding
const edit_ledger=()=>{
    var ledger_no=document.getElementById("edit-ledger");
    ledger_no.onkeyup=(e)=>{
        if(e.keyCode==13){
            if(ledger_no.value.length==0){
                return false;
            }
            else{
              if(localStorage.getItem("ledger_no_"+ledger_no.value)!=null){
                var ledger_obj=localStorage.getItem("ledger_no_"+ledger_no.value);
                document.getElementById("edit-table").style.display="block";
                document.getElementById("ledger-notice").innerHTML="";
                var ledger_data=JSON.parse(ledger_obj);
                if(ledger_data.delete_mod !="active"){
                document.getElementById("edit-lno").innerHTML=ledger_no.value;
                document.getElementById("edit-lname").innerHTML=ledger_data.ledger_name;
                document.getElementById("select-group").style.display="block";
                document.getElementById("select-group").value=ledger_data.group; 
                document.getElementById("edit-mname").innerHTML=ledger_data.mailing_name;
                document.getElementById("edit-balance").innerHTML=`<span id="update_balance">${ledger_data.balance}</span>`+" "+"<span id='current-mode'>"+ledger_data.mode+"</span>";
                document.getElementById("edit-address").innerHTML=ledger_data.address;
                document.getElementById("select-group").onchange=function(){
                    var acc=this.value;
                    var current_mode=document.getElementById("current-mode");
                    switch(acc){
                        case "Capital account":current_mode.innerHTML="Cr";
                        break;
                        case "Sales account":current_mode.innerHTML="Cr";
                        break;
                        case "Purchase account":current_mode.innerHTML="Dr";
                        break;
                        case "Sundry creditors":current_mode.innerHTML="Cr";
                        break;
                        case "Sundry debitors":current_mode.innerHTML="Dr";
                        break;
                        default:current_mode.innerHTML=""
                    }
                }
                document.getElementById("save").onclick=()=>{
                    var update_obj={
                        ledger_name:document.getElementById("edit-lname").innerHTML,
                        group:document.getElementById("select-group").value,
                        balance:document.getElementById("update_balance").innerHTML,
                        mode:document.getElementById("current-mode").innerHTML,
                        mailing_name:document.getElementById("edit-mname").innerHTML,
                        address:document.getElementById("edit-address").innerHTML
                    }
                    var update_data=JSON.stringify(update_obj);
                    localStorage.setItem(`ledger_no_${document.getElementById("edit-lno").innerHTML}`,update_data);
                }
                document.getElementById("delete").onclick=()=>{
                    var choice=confirm("Still Want to delete?");
                   if(choice==true){
                    var update_obj={
                        ledger_name:document.getElementById("edit-lname").innerHTML,
                        group:document.getElementById("select-group").value,
                        balance:document.getElementById("update_balance").innerHTML,
                        mode:document.getElementById("current-mode").innerHTML,
                        mailing_name:document.getElementById("edit-mname").innerHTML,
                        address:document.getElementById("edit-address").innerHTML,
                        delete_mod:"active"
                    }
                    var update_data=JSON.stringify(update_obj);
                    localStorage.setItem(`ledger_no_${document.getElementById("edit-lno").innerHTML}`,update_data);
                    window.location=location.href;
                   }
                }
                }
                else{
                    document.getElementById("edit-table").style.display="none";
                    document.getElementById("ledger-notice").innerHTML=`OOps Ledger is deleted <br><button id="restore" > Restore ledger</button>`;
                    document.getElementById("restore").onclick=()=>{
                        var task=localStorage.getItem(`ledger_no_${ledger_no.value}`)
                        localStorage.setItem(`ledger_no_${ledger_no.value}`,task.replace("active","deactive"));
                        window.location=location.href;
                    }
                }
              }
              else{
                document.getElementById("edit-table").style.display="none";
                document.getElementById("ledger-notice").innerHTML="not found";
                document.getElementById("edit-lno").innerHTML="";
                document.getElementById("edit-lname").innerHTML="";
                document.getElementById("edit-mname").innerHTML="";
                document.getElementById("edit-balance").innerHTML="";
                document.getElementById("edit-address").innerHTML="";
              }
            }
        }
    }
}
edit_ledger();

const search=()=>{
    var ledger_no=document.getElementById("search-field");
    ledger_no.onkeyup=(e)=>{
        if(e.keyCode==13){
            if(e.target.value.length==0){
                // return false;
                e.preventDefault();
            }
            else{
                var ledger_obj=localStorage.getItem("ledger_no_"+ledger_no.value);
                var ledger_data=JSON.parse(ledger_obj);
                if(localStorage.getItem("ledger_no_"+ledger_no.value)!=null&& ledger_data.delete_mod !="active"){
                    document.getElementById("search-table").style.display="block";
                    document.getElementById("search-notice").innerHTML="";
                    document.getElementById("s-ln").innerHTML=ledger_no.value;
                    document.getElementById("s-lname").innerHTML=ledger_data.ledger_name;
                    document.getElementById("s-group").style.display="block";
                    document.getElementById("s-group").innerHTML=ledger_data.group; 
                    document.getElementById("s-mname").innerHTML=ledger_data.mailing_name;
                    document.getElementById("s-balance").innerHTML=ledger_data.balance+" "+ ledger_data.mode;
                    document.getElementById("s-address").innerHTML=ledger_data.address; 
                }
                else{
                    document.getElementById("search-notice").innerHTML="<span id='no_ledger_span'> <i class='fa fa-ban'> </i>No any ledger found</span>";
                    document.getElementById("search-table").style.display="none";
                }
            }

        }
    }
}
search();




///////////////////////////////////////


