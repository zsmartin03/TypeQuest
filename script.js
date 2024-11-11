// Score management
class ScoreManager {
  constructor() {
    this.scores = this.loadScores()
  }

  loadScores() {
    const scores = localStorage.getItem("typequest-scores")
    return scores ? JSON.parse(scores) : []
  }

  updateScoreboardDisplay() {
    const tableBody = document.getElementById("scoreTableBody")
    tableBody.innerHTML = ""

    this.scores.forEach((score, index) => {
      const row = document.createElement("tr")
      const date = new Date(score.date)
      row.innerHTML = `
              <td>${index + 1}</td>
              <td>${score.username}</td>
              <td>${score.score}</td>
              <td>${date.toLocaleDateString()}</td>
            `
      tableBody.appendChild(row)
    })
  }
}

const scoreManager = new ScoreManager()
scoreManager.updateScoreboardDisplay()

function checkUsername() {
  const username = localStorage.getItem("typequest-current-user")
  if (!username) {
    showUsernameModal()
  } else {
    document.getElementById("currentUsername").textContent = username
  }
}

function showUsernameModal() {
  const modal = document.getElementById("usernameModal")
  modal.style.display = "flex"
  document.getElementById("usernameInput").value =
    localStorage.getItem("typequest-current-user") || ""
}

function startGame() {
  const username = localStorage.getItem("typequest-current-user")
  if (username) {
    window.location.href = "game.html"
  } else {
    showUsernameModal()
  }
}

function setUsername() {
  const username = document.getElementById("usernameInput").value.trim()
  if (username) {
    localStorage.setItem("typequest-current-user", username)
    document.getElementById("currentUsername").textContent = username
    document.getElementById("usernameModal").style.display = "none"
  }
}

// Example of how to save a score (call this from game.html when game ends)
function saveScore(score) {
  const username = localStorage.getItem("typequest-current-user")
  if (username) {
    scoreManager.saveScore(username, score)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUsername()

  detectRefreshRate((fps) => {
    localStorage.setItem("refresh-rate", fps.toFixed(0))
  })
})

document.getElementById("play-btn").addEventListener("click", startGame)

document
  .getElementById("change-username-btn")
  .addEventListener("click", showUsernameModal)

document.getElementById("usernameInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    setUsername()
  }
})

document
  .getElementById("set-username-btn")
  .addEventListener("click", setUsername)

document.getElementById("usernameModal").addEventListener("click", (e) => {
  if (e.target.id === "usernameModal") {
    e.target.style.display = "none"
  }
})

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
