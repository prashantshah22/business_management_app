function display_profile() {
    var user_mail = sessionStorage.getItem("user_mail");
    var logo = document.getElementById("dp");
    var image_url = localStorage.getItem(`${user_mail}image_url`);

     if (image_url != null) {
        logo.style.backgroundImage = `url(${image_url})`;
        logo.style.backgroundSize = "cover";
      }


}
display_profile();

document.getElementById("submit").addEventListener("click",(e)=>{
    e.preventDefault();
     var name=document.getElementById("name");
     var pnum=document.getElementById("pnum");
     var snum=document.getElementById("snum");

     if(pnum.value.length!=0&&name.value.length!=0&&snum.value.length!=0){
        if(isNaN(pnum.value) ||pnum.value.length!=10){
            pnum.style.backgroundColor="red";
            name.disabled=true;
            snum.disabled=true;
            pnum.addEventListener("click",()=>{
                name.disabled=false;
                snum.disabled=false;
                pnum.style.backgroundColor="white";
                pnum.value="";
             })
        }
        else{
            if(isNaN(snum.value) || snum.value.length!=10){
                snum.style.backgroundColor="red";
                name.disabled=true;
                pnum.disabled=true;
                snum.addEventListener("click",()=>{
                    name.disabled=false;
                    pnum.disabled=false;
                    snum.style.backgroundColor="white";
                    snum.value="";
                 })
            }
            else{
                var user={
                    fullname:name.value.toUpperCase(),
                    pnum:pnum.value,
                    snum:snum.value
                }
                var user_detail=JSON.stringify(user);
                localStorage.setItem(`${user.fullname} contact`,user_detail);
                document.getElementById("form").reset();
                window.location=location.href;
            }
        }

     }

     else{
        alert("Please fill all the fields");
     }
})
function show_contact_list(){
    for(let i=0;i<localStorage.length;i++){
        var keys=localStorage.key(i);
        if(keys.match("contact")){
            var json_data=JSON.parse(localStorage.getItem(keys));
            var container=document.getElementById("inside_contacts");
            var fieldset=document.createElement("fieldset");
            var legend=document.createElement("legend");
            var ol=document.createElement("ol");
            var li_one=document.createElement("li");
            var li_two=document.createElement("li");
            var trash=document.createElement("i");
            var edit=document.createElement("i");
            var save=document.createElement("i");
            var saved=document.createElement("span");
            container.appendChild(fieldset);
            fieldset.appendChild(legend);
            fieldset.appendChild(ol);
            ol.appendChild(li_one);
            ol.appendChild(li_two);
            ol.appendChild(trash);
            ol.appendChild(edit);
            ol.appendChild(save);
            ol.appendChild(saved);
            saved.innerHTML="SAVED";
            legend.appendChild(document.createTextNode(json_data.fullname));
            li_one.appendChild(document.createTextNode(json_data.pnum));
            li_two.appendChild(document.createTextNode(json_data.snum));
            trash.setAttribute("class","fa fa-trash");
            trash.setAttribute("id","trash");
            edit.setAttribute("class","fa fa-pencil-square-o");
            edit.setAttribute("id","edit");
            save.setAttribute("class","fa fa-floppy-o");
            save.setAttribute("id","save");
            saved.setAttribute("id","saved");
            delete_contacts(keys,trash);
            edit_contact(keys,edit,save,saved);
        }
    }
}
show_contact_list();

function edit_contact(keys,edit_icon,save_icon,saved){
    edit_icon.addEventListener("click",(e)=>{
        save_icon.style.visibility="visible";
        var fieldset=e.target.parentNode.parentNode;
        var legend=fieldset.getElementsByTagName("legend");
        legend[0].setAttribute("contenteditable","true");
        legend[0].setAttribute("spellcheck", "false");
        legend[0].focus();
        var li=e.target.parentNode.getElementsByTagName("li");
        for(let i=0;i<li.length;i++){
            li[i].setAttribute("contenteditable","true");
        }
        var recent_legend;
        var current_legend_data;
        legend[0].addEventListener("click",(e)=>{
            recent_legend=e.target.innerHTML;
        });
        legend[0].addEventListener("blur",(e)=>{
            current_legend_data=e.target.innerHTML.toUpperCase();
        });
        var recent_number=[];
        var current_number=[];
        li[0].addEventListener("click",(e)=>{
            recent_number[0]=e.target.innerHTML;
        })
        li[1].addEventListener("click",(e)=>{
            recent_number[1]=e.target.innerHTML;
        })
        li[0].addEventListener("blur",(e)=>{
            current_number[0]=e.target.innerHTML;
        })
        li[1].addEventListener("blur",(e)=>{
            current_number[1]=e.target.innerHTML;
        })
        save_icon.addEventListener("click",()=>{
            var edit_data={
                fullname:current_legend_data.toUpperCase()==undefined?legend.innerHTML:current_legend_data.toUpperCase(),
                pnum:current_number[0]==undefined?li[0].innerHTML:current_number[0],
                snum:current_number[1]==undefined?li[1].innerHTML:current_number[1]
            }
            var json_data=JSON.stringify(edit_data);
            var local_storage_data=localStorage.getItem(keys);
            localStorage.setItem(keys,local_storage_data.replace(local_storage_data,json_data));
            saved.style.visibility="visible";
            save_icon.style.visibility="hidden";
            setTimeout(()=>{
                saved.style.visibility="hidden";
                window.location=location.href;
                
            },1000)
        })
    })
}

function delete_contacts(contact_key,trash_btn){
    trash_btn.addEventListener("click",(e)=>{
        var remove_parent =e.target.parentNode.parentNode;
        remove_parent.remove();
        var deleted_data=JSON.parse(localStorage.getItem(contact_key));
        var decoded_data={
            fullname:deleted_data.fullname, 
            pnum:deleted_data.pnum,     
            snum: deleted_data.snum,
        }
        document.cookie=`${decoded_data.fullname} contact=${JSON.stringify(decoded_data)}; max-age=2600000; path=/;`;
        localStorage.removeItem(contact_key);
        check_contact_list();
        window.location=location.href;
    })
}
window.onload=()=>{check_contact_list()};
function check_contact_list(){
    if(document.getElementById("inside_contacts").children.length==0){
        document.getElementById("contact_list_h").innerHTML="Contact List is Empty";
    }
}

document.getElementById("search").addEventListener("input",(e)=>{
    var legend=document.getElementById("inside_contacts").getElementsByTagName("legend");
    if(e.target.value.length!=0){
        for(let i=0;i<legend.length;i++){
            if(legend[i].innerHTML.toUpperCase().includes(e.target.value.toUpperCase())){
                legend[i].parentNode.style.display="block";
            }
            else{
                legend[i].parentNode.style.display="none";
            }
        }
    }
    else{
        for(let i=0;i<legend.length;i++){
            legend[i].parentNode.style.display="block";
        }
    }
});


function security(){
    var user_mail=sessionStorage.getItem("user_mail");
    if(user_mail==null){
    document.body.style.backgroundColor="black";
    document.body.innerHTML="<h1>Please Login</h1>";
    document.body.style.color="white";
    setTimeout(()=>{window.location.replace("../../index.html");},1000)  
}
}
security();

document.getElementById("restore_btn").addEventListener("click",()=>{
    document.getElementById("hidden").style.height="100vh";
    document.getElementById("hidden").style.transition="1s";
    document.getElementById("hidden").style.display="block";
    var restore_table=document.getElementById("table");

    if(document.cookie.length!=0){
        document.getElementById("deleted_h").innerHTML="Deleted Contacts";
        var device_cookie=document.cookie.split(";");
        for(let i=0;i<device_cookie.length;i++){
            var key_value=device_cookie[i].split("="); 
            for(let j=0;j<key_value.length;j++){
                if(key_value[j].indexOf("contact")==-1){
                    var extract=JSON.parse(key_value[j]);
                    var tr=document.createElement("tr");
                    var td_name=document.createElement("th");
                    var td_pnum=document.createElement("th");
                    var td_snum=document.createElement("th");
                    var td_restore=document.createElement("th");
                    var fafa_restore=document.createElement("I");
                    fafa_restore.setAttribute("class",'fa fa-refresh');
                    td_name.appendChild(document.createTextNode(extract.fullname));
                    td_pnum.appendChild(document.createTextNode(extract.pnum));
                    td_snum.appendChild(document.createTextNode(extract.snum));
                    td_restore.appendChild(fafa_restore);
                    tr.appendChild(td_name);
                    tr.appendChild(td_pnum);
                    tr.appendChild(td_snum);
                    tr.appendChild(td_restore);
                    restore_table.appendChild(tr);
                    fafa_restore.addEventListener("click",(e)=>{
                        var tr=e.target.parentNode.parentNode;
                        var th_all=tr.getElementsByTagName("th");
                        var restore_obj={
                            fullname: th_all[0].innerHTML.toUpperCase(),
                            pnum:th_all[1].innerHTML,
                            snum: th_all[2].innerHTML,
                        }
                        var ready_restore=JSON.stringify(restore_obj);
                        localStorage.setItem(`${restore_obj.fullname} contact`, ready_restore);
                        document.cookie=th_all[0].innerHTML.toUpperCase()+" contact=; max-age=0; path=/;";
                        tr.remove();
                        setTimeout(()=>{window.location=location.href;},500)
                    }) 
                }
            } 
        }
    }
    else{
        document.getElementById("deleted_h").innerHTML="No Any Deleted Contacts";
    }
})

document.getElementById("close_fa").addEventListener("click",(e)=>{
    e.target.parentNode.style.transition="1s";
    e.target.parentNode.style.height="0";
    setTimeout(()=>{
        e.target.parentNode.style.display="none"; 
    },1000)
})

document.getElementById("logout_btn").addEventListener("click",()=>{
    sessionStorage.clear();
    setTimeout(()=>{window.location.replace("../../index.html");},500)
});

