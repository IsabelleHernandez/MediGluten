
async function showUser() {

    const { data, error } = await window.db.auth.getUser();

    const message = document.getElementById("userEmail");

    if (error) {

        message.textContent = "Unable to load account information.";

    } else if (data.user) {

        message.textContent = "Logged in as: " + data.user.email;

    }

}

showUser();
