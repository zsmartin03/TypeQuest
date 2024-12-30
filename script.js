function detectRefreshRate(callback) {
  let start, end
  let frameCount = 0
  function frame() {
    if (frameCount === 0) {
      start = performance.now()
    } else if (frameCount === 60) {
      end = performance.now()
      const fps = 1000 / ((end - start) / 60)
      callback(fps)
      return
    }
    frameCount++
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

function startGame() {
  localStorage.setItem("isAllowed", "true")
  window.location.href = "game.php"
}

function showAuthModal() {
  const modal = document.getElementById("authModal")
  modal.style.display = "flex"

  const urlParams = new URLSearchParams(window.location.search)
  const error = urlParams.get("error")

  const showRegister = [
    "passwords_dont_match",
    "username_taken",
    "registration_failed",
  ].includes(error)

  document.getElementById("loginForm").style.display = showRegister
    ? "none"
    : "block"
  document.getElementById("registerForm").style.display = showRegister
    ? "block"
    : "none"
}

document.addEventListener("DOMContentLoaded", () => {
  detectRefreshRate((fps) => {
    localStorage.setItem("refresh-rate", fps.toFixed(0))
  })

  const playBtn = document.getElementById("play-btn")
  if (playBtn) {
    playBtn.addEventListener("click", startGame)
  }

  const showRegisterLink = document.getElementById("showRegister")
  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("loginForm").style.display = "none"
      document.getElementById("registerForm").style.display = "block"
      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      window.history.replaceState({}, "", url)
    })
  }

  const showLoginLink = document.getElementById("showLogin")
  if (showLoginLink) {
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("loginForm").style.display = "block"
      document.getElementById("registerForm").style.display = "none"
      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      window.history.replaceState({}, "", url)
    })
  }

  const authModal = document.getElementById("authModal")
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      const isLoggedIn =
        document.querySelector(".username-display .username-text") !== null

      if (e.target === authModal && isLoggedIn) {
        authModal.style.display = "none"
      }
    })
  }

  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has("error")) {
    showAuthModal()
  }
})
