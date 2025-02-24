window.onload = () => {
    let checks = [...document.querySelectorAll("input")];

    if (!localStorage.getItem("checks")){
        localStorage.setItem("checks", JSON.stringify(checks.map(x => false)));
    } else {
        let bool = JSON.parse(localStorage.getItem("checks"));
        for (let i=0; i<checks.length; i++){
            checks[i].checked = bool[i];
        }
    }

    checks.map(x => x.oninput = () => {
        localStorage.setItem("checks", JSON.stringify([...document.querySelectorAll("input")].map(x => x.checked ? true : false)));
    });

    if (!localStorage.getItem("streak")){
        localStorage.setItem("streak", '0');
    }
    if (!localStorage.getItem("last")){
        let today = new Date();
        localStorage.setItem("last", today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
    }
    if (!localStorage.getItem("fall")){
        localStorage.setItem("fall", "null");
    }

    let today = new Date();
    today = new Date(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
    let last = new Date(localStorage.getItem("last"));

    if (today.getDate() > last.getDate()){
        localStorage.setItem("last", today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());

        if (JSON.parse(localStorage.getItem("checks")).some(x => x === false)){
            localStorage.setItem("fall", today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
            localStorage.setItem("streak", '0');
        } else {
            localStorage.setItem("streak", parseInt(localStorage.getItem("streak"))+1);
        }

        localStorage.setItem("checks", JSON.stringify(checks.map(x => false)));
        let bool = JSON.parse(localStorage.getItem("checks"));
        for (let i=0; i<checks.length; i++){
            checks[i].checked = bool[i];
        }
    }

    streak.innerText = localStorage.getItem("streak");
    if (localStorage.getItem("fall") == "null"){
        fall.innerText = '-';
    } else {
        let data = new Date(localStorage.getItem("fall"));
        fall.innerText = (data.getDate() < 10 ? '0'+data.getDate() : data.getDate())+'/'+(data.getMonth()+1 < 10 ? '0'+(data.getMonth()+1) : data.getMonth()+1);
    }
}