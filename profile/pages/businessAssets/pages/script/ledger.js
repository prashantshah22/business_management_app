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