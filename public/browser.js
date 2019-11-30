let pushHidden = document.getElementById("push-register")

function removeHidden() {
  pushHidden.classList.remove("hidden")
  setTimeout(() => {
    pushHidden.classList.add("hidden")
  }, 3000)
}

document.getElementById('register-form').addEventListener("submit", (e) => {
  e.preventDefault()
  axios.post('/register', { username: e.target.username.value, password: e.target.password.value })
    .then(() => {
      removeHidden()
    })
    .catch(() => {
      console.log("Opps, something is error")
      alert("Something is error")
    })
})