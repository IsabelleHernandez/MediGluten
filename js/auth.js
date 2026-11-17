
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");

// Check if Supabase is connected
if (!window.db) {
    authMessage.textContent = "Connection error. Please check supabase.js.";
} else {

    // Check if user is already logged in
    async function checkExistingLogin() {
        const { data, error } = await window.db.auth.getSession();

        if (!error && data.session) {
            window.location.replace("home.html");
        }
    }

    checkExistingLogin();


    // LOGIN
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        authMessage.textContent = "Logging in...";

        const { error } = await window.db.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
        } else {
            window.location.href = "home.html";
        }
    });


    // CREATE ACCOUNT
    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        authMessage.textContent = "Creating your account...";

        const { data, error } = await window.db.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: window.location.origin + window.location.pathname
            }
        });

        if (error) {
            authMessage.textContent = error.message;
        } else if (data.session) {
            window.location.href = "home.html";
        } else {
            authMessage.textContent =
                "Account created! Check your email to confirm your account, then log in.";
        }
    });

}
