function tabs(){
    var vocher_page=document.getElementById("voucher_page");
    var btn=vocher_page.getElementsByTagName("button");
    var hide=document.getElementsByClassName("open");
    for(let i=0;i<btn.length;i++){
        btn[i].onclick=function (){
            for(let j=0;j<hide.length;j++){
                hide[j].style.display="none";
            }
            for(let j=0;j<btn.length;j++){
                btn[j].classList.remove("active");
            }
            var id_name=this.getAttribute("name");
            document.getElementById(id_name).style.display="block";
            this.classList.add("active");
        }
    }
    document.querySelector("[name=purchase]").click();
}
tabs();