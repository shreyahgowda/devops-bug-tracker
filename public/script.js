let selectedRole = "";

function selectRole(role){

    selectedRole = role;

    document.getElementById("roleSelection")
    .style.display = "none";

    document.getElementById("loginForm")
    .style.display = "block";

    document.getElementById("roleTitle")
    .innerText =
    role.toUpperCase() + " LOGIN";

}

async function login(){

    const username =
    document.getElementById("username")
    .value;

    const password =
    document.getElementById("password")
    .value;

    const response =
    await fetch("/login",{

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:JSON.stringify({
            username,
            password
        })

    });

    const data =
    await response.json();

    if(response.ok){

        localStorage.setItem(
            "username",
            data.username
        );

        localStorage.setItem(
            "role",
            data.role
        );

        if(data.role !== selectedRole){

            document.getElementById(
                "message"
            ).innerText =
            "Wrong role selected";

            return;
        }

        if(data.role === "admin"){
            window.location =
            "admin.html";
        }

        else if(data.role === "employee"){
            window.location =
            "employee.html";
        }

        else if(data.role === "developer"){
            window.location =
            "developer.html";
        }

    }
    else{

        document.getElementById(
            "message"
        ).innerText =
        data.message;

    }

}

function goBack(){

    document.getElementById(
        "loginForm"
    ).style.display = "none";

    document.getElementById(
        "roleSelection"
    ).style.display = "block";

    document.getElementById(
        "message"
    ).innerText = "";

    document.getElementById(
        "username"
    ).value = "";

    document.getElementById(
        "password"
    ).value = "";

}
