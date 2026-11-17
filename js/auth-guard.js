
// Hide the page while checking the login
document.body.style.visibility = "hidden";

async function checkLogin() {

    const { data, error } = await window.db.auth.getSession();

    if (error || !data.session) {

        window.location.replace("login.html");

    } else {

        document.body.style.visibility = "visible";

    }

}

checkLogin();
