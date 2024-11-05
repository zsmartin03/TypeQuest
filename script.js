// Score management
class ScoreManager {
  constructor() {
    this.scores = this.loadScores();
  }

  loadScores() {
    const scores = localStorage.getItem("typequest-scores");
    return scores ? JSON.parse(scores) : [];
  }

  saveScore(username, score) {
    const newScore = {
      username,
      score,
      date: new Date().toISOString(),
    };
    this.scores.push(newScore);
    this.scores.sort((a, b) => b.score - a.score);
    this.scores = this.scores.slice(0, 10); // Keep only top 10
    localStorage.setItem("typequest-scores", JSON.stringify(this.scores));
    this.updateScoreboardDisplay();
  }

  updateScoreboardDisplay() {
    const tableBody = document.getElementById("scoreTableBody");
    tableBody.innerHTML = "";

    this.scores.forEach((score, index) => {
      const row = document.createElement("tr");
      const date = new Date(score.date);
      row.innerHTML = `
              <td>${index + 1}</td>
              <td>${score.username}</td>
              <td>${score.score}</td>
              <td>${date.toLocaleDateString()}</td>
            `;
      tableBody.appendChild(row);
    });
  }
}

// Initialize score manager
const scoreManager = new ScoreManager();
scoreManager.updateScoreboardDisplay();

// Username management
function checkUsername() {
  const username = localStorage.getItem("typequest-current-user");
  if (!username) {
    showUsernameModal();
  } else {
    document.getElementById("currentUsername").textContent = username;
  }
}

function showUsernameModal() {
  const modal = document.getElementById("usernameModal");
  modal.style.display = "flex";
  document.getElementById("usernameInput").value =
    localStorage.getItem("typequest-current-user") || "";
}

function setUsername() {
  const username = document.getElementById("usernameInput").value.trim();
  if (username) {
    localStorage.setItem("typequest-current-user", username);
    document.getElementById("currentUsername").textContent = username;
    document.getElementById("usernameModal").style.display = "none";
  }
}

function startGame() {
  const username = localStorage.getItem("typequest-current-user");
  if (username) {
    window.location.href = "game.html";
  } else {
    showUsernameModal();
  }
}

// Handle Enter key in username input
document.getElementById("usernameInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    setUsername();
  }
});

// Close modal if clicking outside
document.getElementById("usernameModal").addEventListener("click", (e) => {
  if (e.target.id === "usernameModal") {
    e.target.style.display = "none";
  }
});

// Example of how to save a score (call this from game.html when game ends)
function saveScore(score) {
  const username = localStorage.getItem("typequest-current-user");
  if (username) {
    scoreManager.saveScore(username, score);
  }
}

// Check username when page loads
document.addEventListener("DOMContentLoaded", checkUsername);
