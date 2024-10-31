var video = document.getElementById("video_player");
video.addEventListener("progress", (e) => {
    if (video.buffered.length > 0) {
        var bufferedEnd = video.buffered.end(0);
        if (video.duration > 0) {
            var percentage = (bufferedEnd / video.duration) * 100;
            document.getElementById("buffer_progress").style.width = percentage + "%";
        }
    }
});

document.getElementById("file_upload").addEventListener("change",(e)=>{
    var file_name=e.target.files[0];
    var fa=document.getElementById("fa-play");
    var video_name=document.getElementById("header-div_h1");
    var video_url=URL.createObjectURL(file_name);
    video.src=video_url;
    video.load();
    video.play();
    fa.className="fa fa-pause";
    video_name.innerHTML=e.target.files[0].name;
})

function show_poster(){
    var fa=document.getElementById("fa-play");
    var video_name=document.getElementById("header-div_h1");
    if(video.networkState==3){
        video.setAttribute("poster","images/a.jpg");
        video.onclick=()=>{
            var upload_btn=document.getElementById("file_upload");
            upload_btn.click();
            upload_btn.onchange=(e)=>{
                var file_name=e.target.files[0];
                var video_url=URL.createObjectURL(file_name);
                video.src=video_url;
                video.load();
                video.play();
                fa.className="fa fa-pause";
                video_name.innerHTML=e.target.files[0].name;
            }
        }
    }
};
show_poster();