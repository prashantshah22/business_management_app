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

const show_logo = () => {
    const img_url = localStorage.getItem("logo");
    document.getElementById("cmpy_logo").style.backgroundSize = "cover";
    document.getElementById("cmpy_logo").style.backgroundImage = `url(${img_url})`;
};
show_logo();
const show_date = () => {
    var date = new Date();
    document.getElementById("date_show").innerHTML = `Date: <strong>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</strong>`;
    setInterval(() => {
        var date = new Date();
        document.getElementById("time_show").innerHTML = `Time: <strong>${date.toLocaleTimeString('en-US', { hour12: false })}</strong>`;
    }, 1000)
}
show_date();
document.getElementById("exit_li").addEventListener("click", () => {
    window.location = "../business.html"
});

function hover() {
    var sect = document.getElementById("sect");
    var li = sect.getElementsByTagName("LI");
    for (let i = 0; i < li.length; i++) {
        li[i].onmouseover = function () {
            this.style.transition = "1s";
            this.style.transform = "rotate(360deg)";
        }
        li[i].onmouseout = function () {
            this.style.transition = "1s";
            this.style.transform = "rotate(0deg)";
        }
    }
}
hover();
function open_html() {
    var ledger = document.getElementById("ledger_li");
    ledger.onclick = function () {
        window.location = "../businessAssets/pages/ledger.html"
    }
    var voucher=document.getElementById("voucher_li");
    voucher.onclick=()=>{
        window.location="../businessAssets/pages/voucher.html"
    }

}
open_html();
const update_default_ledger = () => {
    var cash_ledger = localStorage.getItem("cash_ledger");
    var profit_loss = localStorage.getItem("profit_loss_ledger");
    if (cash_ledger == null && profit_loss == null) {
        var cash_ledger_objects = {
            ledger_name: "Cash",
            group: "Cash in hand",
            balance: "",
            mode: ""
        }
        var cash_ledger_details = JSON.stringify(cash_ledger_objects);
        localStorage.setItem("cash_ledger", cash_ledger_details);
        var pf_ledger_objects = {
            ledger_name: "Profit & loss A/c",
            group: "Profit & loss A/c",
            balance: "",
            mode: ""
        }
        var pf_ledger_details = JSON.stringify(pf_ledger_objects);
        localStorage.setItem("profit_loss_ledger", pf_ledger_details);
    }
}
update_default_ledger();
const show_iframe = () => {
    document.getElementById("unit_of_measure_li").onclick = () => {
        var frame = document.getElementById("frame");
        frame.style.display = "block";
        frame.src = "pages/unit_measure.html"
        frame.onload = function () {
            var target = this.contentWindow.document.getElementById("comapny");
            frame.contentWindow.document.getElementById("measure_close").style.display="none";
            var close=document.createElement("I");
            close.classList.add("fa","fa-close");
            close.style.position="absolute";
            close.style.top="0";
            close.style.right="10px";
            close.style.fontSize="30px";
            target.append(close);
            close.onclick=()=>{
                frame.style.display="none";
                frame.src = "";

            }
        }
    }
}
show_iframe();