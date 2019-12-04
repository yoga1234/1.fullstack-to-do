let errorMessage = document.getElementById("error-message")
let flashMessage = document.getElementById("flash-message")

// flash error empty field
function fieldEmpty() {
  flashMessage.classList.remove("hidden")
  errorMessage.textContent = "Field cannot be empty!"
}

// flash error for data not found
function dataEmpty() {

}

document.getElementById("login-submit").addEventListener("submit", (e) => {
  e.preventDefault()

  // check for the form value
  if (e.target.username.value == "" || e.target.password.value == "") {
    fieldEmpty()
  } else {
    axios.post('/', { username: e.target.username.value, password: e.target.password.value })
      .then((res) => {
        if (res.data == "Success") {
          console.log("Data found!")
        } else {
          console.log("Data not found!")
        }
      })
      .catch(() => {
        console.log("Data not found!")
      })
  }
})