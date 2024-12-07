function unit_of_measurement() {
    var unit_btn = document.getElementById("measurement_btn");
    var pri_cntnr = document.getElementById("measurement");
    var sec_cntnr = document.getElementById("measure_click");
    var close = document.getElementById("measure_close");
    var form = document.getElementById("form");
    unit_btn.onclick = function () {
        this.style.transform = "rotateX(180deg)";
        this.style.transition = "1s";
        sec_cntnr.style.display = "block";
        setTimeout(() => {
            sec_cntnr.style.transform = "rotateX(-180deg)";
            sec_cntnr.style.transition = "1s";
            pri_cntnr.style.display = "none";
            close.onclick = function () {
                unit_btn.className = "animated flipInX";
                unit_btn.innerHTML = '<div id="measurement"><i class="fa fa-balance-scale" aria-hidden="true" id="fa-balance-scale"></i><span>Measurement Unit</span></div>';
                setTimeout(() => {
                    window.location = location.href;
                }, 10)
            }
            form.onsubmit = function () {
                var symbol = document.getElementById("symbol");
                var formal_name = document.getElementById("fullname");
                var unit_obj = { symbol: symbol.value.trim(), formal_name: formal_name.value.trim(), }
                var unit_details = JSON.stringify(unit_obj);
                if (!symbol.value.trim() || !formal_name.value.trim()) {
                    return;
                }
                localStorage.setItem("unit_measurement_" + symbol.value, unit_details);
            }
        }, 500)
    }
}
unit_of_measurement();

const show_edit_measurement = () => {
    var measure = document.getElementById("select_meaure");
    measure.onclick = () => {
        while (measure.children.length > 1) {
            measure.removeChild(measure.lastChild);
        }
        var keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key.match("unit_measurement_") != null) {
                var key_data = localStorage.getItem(key);
                var key_details = JSON.parse(key_data);
                var options = document.createElement("option");
                options.append(document.createTextNode(key_details.symbol));
                measure.append(options);
            }
        }
        measure.addEventListener("change",()=>{
            var data=localStorage.getItem("unit_measurement_"+measure.value);
            var details=JSON.parse(data);
            document.getElementById("measure_click").click();
            var inputa=document.getElementById("symbol");
            inputa.value=details.symbol;
            var store=inputa.value;
            document.getElementById("fullname").value=details.formal_name;
            document.getElementById("submit").style.display="none";
            document.getElementById("submit_btn").style.display="block";
            document.getElementById("submit_btn").onclick=()=>{
                if(inputa.value==store){
                    var object={
                        symbol:inputa.value,
                        formal_name:document.getElementById("fullname").value
                    }
                    var update=JSON.stringify(object);
                    localStorage.setItem("unit_measure_"+inputa.value,update);
                }
                else{
                    localStorage.removeItem("unit_measurement_"+store);
                    var object={
                        symbol:inputa.value,
                        formal_name:document.getElementById("fullname").value
                    }
                    var update=JSON.stringify(object);
                    localStorage.setItem("unit_measure_"+inputa.value,update);

                }
            }
        })


    }
}

show_edit_measurement();


const delete_measurement = () => {
    var measure = document.getElementById("delete_meaure");
    measure.onclick = () => {
        while (measure.children.length > 1) {
            measure.removeChild(measure.lastChild);
        }
        var keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            keys.push(localStorage.key(i));
        }
        keys.sort();
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key.match("unit_measurement_") != null) {
                var key_data = localStorage.getItem(key);
                var key_details = JSON.parse(key_data);
                var options = document.createElement("option");
                options.append(document.createTextNode(key_details.symbol));
                measure.append(options);
            }
        }
         measure.addEventListener("change",()=>{
            localStorage.removeItem("unit_measurement_"+measure.value);
        })
    }
}


delete_measurement();