var video = document.getElementById("video_player");
document.getElementById("fa-play").addEventListener("click", (e) => {
    if (e.target.className == "fa fa-play") {
        video.play();
        e.target.className = "fa fa-pause";
        e.target.title = "pausue";
    } else {
        video.pause();
        e.target.className = "fa fa-play";
        e.target.title = "play";
    }
});
video.addEventListener("timeupdate", (e) => {
    var progress = document.getElementById("progress");
    var time = (100 / e.target.duration) * e.target.currentTime;
    progress.style.width = `${time}%`;
    video.addEventListener("ended", () => {
        if (e.target.currentTime == e.target.duration) {
            document.getElementById("fa-play").className = "fa fa-play";
            document.getElementById("fa-play").title = "play";
        } else {
            document.getElementById("fa-play").className = "fa fa-pause";
            document.getElementById("fa-play").title = "pasue";
            video.play();
        }
    });
});

document.getElementById("fa-fullscreen").addEventListener("click", (e) => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    }
});

document.getElementById("fa-stop").addEventListener("click", (e) => {
    video.currentTime = 0;
    video.pause();
    document.getElementById("fa-play").className = "fa fa-play";
    document.getElementById("fa-play").title = "play";
});

document.getElementById("fa-repeat").addEventListener("click",()=>{
    video.currentTime=0;
    video.play();
    document.getElementById("fa-play").className="fa fa-pause";
    document.getElementById("fa-play").title="pause";
});
document.getElementById("fa-volume").addEventListener("click", (e) => {
    var volume_slider = document.getElementById("volume_control");
    var visibility_value = window.getComputedStyle(volume_slider).visibility;
    if (visibility_value == "hidden") {
        volume_slider.style.visibility = "visible";
        volume_slider.addEventListener("change", (env) => {
            video.volume = env.target.value;
            if (env.target.value == 0 || env.target.value <= 0) {
                document.getElementById("fa-volume").className = "fa fa-volume-off";
                document.getElementById("fa-volume").title = "muted";
            } else if (env.target.value >= 0.2 && env.target.value <= 0.6) {
                document.getElementById("fa-volume").className = "fa fa-volume-down";
                document.getElementById("fa-volume").title =env.target.value * 100 + "%";
            } else {
                document.getElementById("fa-volume").className = "fa fa-volume-up";
                document.getElementById("fa-volume").title =env.target.value * 100 + "%";
            }
        });
    } else {
        volume_slider.style.visibility = "hidden";
    }
});

document.getElementById("progress_bar").addEventListener("click", (e) => {
    var percentage = e.offsetX / e.target.offsetWidth;
    video.currentTime = percentage * video.duration;
});

document.getElementById("fa-download").addEventListener("click", () => {
    var video_src = document.getElementById("video_src").src;
    var anker_tag = document.createElement("a");
    anker_tag.href = video_src;
    anker_tag.download = video_src;
    document.body.appendChild(anker_tag);
    anker_tag.click();
});
document.getElementById("fa-setting").addEventListener("click", () => {
    var hidden_controls = document.getElementById("video_controls");
    if (hidden_controls.offsetHeight == 0) {
        hidden_controls.style.height = "230px";
        hidden_controls.style.top = "-230px";
        hidden_controls.style.animationName = "video_controls_animation_up";
        hidden_controls.style.display = "block";
    } else {
        hidden_controls.style.animationName = "video_controls_animation_down";
        setTimeout(() => {
            hidden_controls.style.display = "none";
        }, 500);
    }
    speed_control();
    reset_video_speed();
});
const speed_control = () => {
    document.getElementById("speed_selector").addEventListener("input", (e) => {
        video.playbackRate = e.target.value;
        document.getElementById("show_speed").innerHTML = e.target.value;
    });
};
const reset_video_speed = () => {
    document.getElementById("reset_speed").addEventListener("click", () => {
        video.playbackRate = 1;
        document.getElementById("show_speed").innerHTML = 1;
        document.getElementById("speed_selector").value = 1;
    });
};
document.getElementById("miniplayer_div").addEventListener("click", () => {
    var video = document.getElementById("video_player");
    const miniVideoPlayer = document.getElementById("mini_video_player_video");
    video.pause();
    var video_time = video.currentTime;
    document.getElementById("main_div").style.display = "none";
    var miniplayer = document.getElementById("mini_video_player");
    miniplayer.style.height = "265px";
    miniplayer.style.transition = "1s";
    miniplayer.style.display = "block";
    var hidden_controls=document.getElementById("video_controls");
    hidden_controls.style.height="0px";
    hidden_controls.style.display="none";
    miniVideoPlayer.load();
    var fa_play=document.getElementById("fa-play");
    if (fa_play.className === "fa fa-pause") {
        document.getElementById("mini_video_src").src = document.getElementById("video_src").src;
        miniVideoPlayer.currentTime = video_time;
        miniVideoPlayer.play();
        miniVideoPlayer.onmouseover = (e) => {
            e.target.controls = true;
        };
        close_mini_player();
    } else {
        document.getElementById("mini_video_src").src = document.getElementById("video_src").src;
        miniVideoPlayer.currentTime = video_time;
        miniVideoPlayer.pause();
        miniVideoPlayer.onmouseover = (e) => {
            e.target.controls = true;
        }; 
        close_mini_player();
    }

    function close_mini_player(){
        var close=document.getElementById("fa-close");
        miniVideoPlayer.onplaying=function(){
            close.addEventListener("click",(e)=>{
                miniVideoPlayer.pause();
                e.target.parentNode.style = "none";
                document.getElementById("main_div").style.display = "block";
                video.load();
                video.currentTime = document.getElementById("mini_video_player_video").currentTime;
                document.getElementById("video_src").src = document.getElementById("mini_video_src").src; 
                video.play();
                fa_play.className="fa fa-pause";
                fa_play.title="pause";
            })
        }
        miniVideoPlayer.onpause=function(){
            close.addEventListener("click",(e)=>{
                miniVideoPlayer.pause();
                e.target.parentNode.style = "none";
                document.getElementById("main_div").style.display = "block";
                video.load();
                video.currentTime = document.getElementById("mini_video_player_video").currentTime;
                document.getElementById("video_src").src = document.getElementById("mini_video_src").src; 
                video.pause();
                fa_play.className="fa fa-play";
                fa_play.title="play";
            })
        }
    }

});


