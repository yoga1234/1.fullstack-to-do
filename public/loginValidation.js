let errorMessage = document.getElementById("error-message")
let flashMessage = document.getElementById("flash-message")
let formSubmit = document.getElementById("login-submit")

// flash error empty field
function fieldEmpty() {
  flashMessage.classList.remove("hidden")
  errorMessage.textContent = "Field cannot be empty!"
}

function dataFound() {
  console.log("Data is found")
}

// flash error for data not found
function dataEmpty() {
  console.log("Data not found")
}

// formSubmit.addEventListener("submit", (e) => {
//   e.preventDefault()

//   // check for the form value
//   if (e.target.username.value == "" || e.target.password.value == "") {
//     fieldEmpty()
//   } else {
//     axios.post('/', { username: e.target.username.value, password: e.target.password.value })
//       .then((req, res) => {
//         if (res.data == "Success") {
//           dataFound()
//         } else {
//           dataEmpty()
//         }
//       })
//       .catch(() => {
//         console.log("Data not found! catch")
//       })
//   }
// })