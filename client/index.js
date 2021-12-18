const username = document.getElementById("Username");
const password = document.getElementById("Password");
const usernameoutput = document.getElementById("usernameoutput");
const passwordoutput = document.getElementById("passwordoutput");

const pattern = /\W/;

const blankFailString = "Username cannot be blank";
const patternFailString = "Username contains invalid characters";

$("#Username").change(function() {
    validateInputs();
});
$("#Password").change(function() {
    validateInputs();
});

//makes sure the inputs aren't valid or contain invalid characters
function validateInputs() {
    let succeed = true;

    if (username.value == "") {
        succeed = false;
        usernameoutput.value = blankFailString;
        usernameoutput.hidden = false;
    } else if (pattern.test(username.value)) {
        succeed = false;
        usernameoutput.value = patternFailString;
        usernameoutput.hidden = false;
    } else {
        usernameoutput.hidden = true;
    }

    if (password.value == "") {
        succeed = false;
        passwordoutput.hidden = false;
    } else {
        passwordoutput.hidden = true;
    }

    return succeed;
}

// eslint-disable-next-line no-unused-vars
function submitLogin() {
    if (validateInputs()) {
        $.post("/login",
            { "username": username.value, "password": password.value},
            // eslint-disable-next-line no-unused-vars
            function (data, status, _jqxHR) {
                console.log(`Status: ${status} Data: ${data}`);
            }).done(function() {console.log("Request Completed"); })
            .fail(function(_jqxHR, _settings, ex) { console.error(`Failed ${ex}`); });
    }
    else {
        return;
    }
}
