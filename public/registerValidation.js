let pushHidden = document.getElementById("push-register")
let loadingEffect = document.getElementById("register-loader")
let registerText = document.getElementById("register-button-text")
let registerUsername = document.getElementById("register-username")
let registerPassword = document.getElementById("register-password")
let registerButton = document.getElementById("register-button")

function submitProcess(condition) {
  // check if it error or success
  if (condition == "add-success") {
    console.log("Success adding a data")
    pushHidden.classList.remove("hidden")
    pushHidden.classList.add("alert-success")
    pushHidden.innerHTML = "Registration Success !"
    loadingEffect.classList.remove("hidden")
    registerText.innerHTML = ""
    registerUsername.value = ""
    registerPassword.value = ""
    registerButton.disabled = true
    registerUsername.focus()

    setTimeout(() => {
      pushHidden.classList.add("hidden")
      loadingEffect.classList.add("hidden")
      registerText.innerHTML = "Register"
      registerButton.disabled = false
    }, 3000)
  } else if (condition == "field-empty") {
    console.log("Hey some field is empty")
    pushHidden.classList.remove("hidden")
    pushHidden.classList.add("alert-warning")
    pushHidden.innerHTML = "Input field cannot be empty !"
    loadingEffect.classList.remove("hidden")
    registerText.innerHTML = ""
    registerUsername.value = ""
    registerPassword.value = ""
    registerButton.disabled = true
    registerUsername.focus()

    setTimeout(() => {
      pushHidden.classList.add("hidden")
      loadingEffect.classList.add("hidden")
      registerText.innerHTML = "Register"
      registerButton.disabled = false
    }, 3000)
  } else if (condition == "user-min") {
    console.log("Username need to be at least 8 char")
    console.log("Success adding a data")
    pushHidden.classList.remove("hidden")
    pushHidden.classList.add("alert-secondary")
    pushHidden.innerHTML = "Username need to be at least 8 char !"
    loadingEffect.classList.remove("hidden")
    registerText.innerHTML = ""
    registerUsername.value = ""
    registerPassword.value = ""
    registerButton.disabled = true
    registerUsername.focus()

    setTimeout(() => {
      pushHidden.classList.add("hidden")
      loadingEffect.classList.add("hidden")
      registerText.innerHTML = "Register"
      registerButton.disabled = false
    }, 3000)
  } else if (condition == "pass-min") {
    console.log("Password need 12 char")
    pushHidden.classList.remove("hidden")
    pushHidden.classList.add("alert-secondary")
    pushHidden.innerHTML = "Password need at least 12 char !"
    loadingEffect.classList.remove("hidden")
    registerText.innerHTML = ""
    registerUsername.value = ""
    registerPassword.value = ""
    registerButton.disabled = true
    registerUsername.focus()

    setTimeout(() => {
      pushHidden.classList.add("hidden")
      loadingEffect.classList.add("hidden")
      registerText.innerHTML = "Register"
      registerButton.disabled = false
    }, 3000)
  } else if (condition == "add-failed") {
    console.log("Failed add data")
    pushHidden.classList.remove("hidden")
    pushHidden.classList.add("alert-danger")
    pushHidden.innerHTML = "Oops, something error. Try again later."
    loadingEffect.classList.remove("hidden")
    registerText.innerHTML = ""
    registerUsername.value = ""
    registerPassword.value = ""
    registerButton.disabled = true
    registerUsername.focus()

    setTimeout(() => {
      pushHidden.classList.add("hidden")
      loadingEffect.classList.add("hidden")
      registerText.innerHTML = "Register"
      registerButton.disabled = false
    }, 3000)
  }
}

document.getElementById('register-form').addEventListener("submit", (e) => {
  e.preventDefault()
  if (registerUsername.value == "" || registerPassword.value == "") {
    submitProcess("field-empty")
  } else if (registerUsername.value.length < 8) {
    submitProcess("user-min")
  } else if (registerPassword.value.length < 12) {
    submitProcess("pass-min")
  } else {
    axios.post('/register', { username: e.target.username.value, password: e.target.password.value })
      .then(() => {
        submitProcess("add-success")
      })
      .catch(() => {
        submitProcess("add-failed")
      })
  }
})