document.getElementById("fa_play").addEventListener('click',()=>{
    var dislay_side_bar=document.getElementsByClassName("left_side")[0];
    dislay_side_bar.style.display="block";
});

document.getElementById("left_side_close_fa").addEventListener('click',()=>{
    var dislay_side_bar=document.getElementsByClassName("left_side")[0];
    dislay_side_bar.style.display="none";
});


