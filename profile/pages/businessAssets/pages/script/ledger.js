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
            document.getElementById(id_value).style.display="block";
            this.classList.add("active");
        }
    }
}
tabs();

window.onload=function(){
    document.getElementById("default").click();
}
