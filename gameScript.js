let spriteAnimation = {}
let player = {}
let msPerFrame = 15
let points = 0
let pointsDisplay = null

let attackInterval = 0
let attackInProgress = false

const wordsArray = [
  "the",
  "of",
  "to",
  "and",
  "a",
  "in",
  "is",
  "it",
  "you",
  "that",
  "he",
  "was",
  "for",
  "on",
  "are",
  "with",
  "as",
  "I",
  "his",
  "they",
  "be",
  "at",
  "one",
  "have",
  "this",
  "from",
  "or",
  "had",
  "by",
  "hot",
  "but",
  "some",
  "what",
  "there",
  "we",
  "can",
  "out",
  "other",
  "were",
  "all",
  "your",
  "when",
  "up",
  "use",
  "word",
  "how",
  "said",
  "an",
  "each",
  "she",
  "which",
  "do",
  "their",
  "time",
  "if",
  "will",
  "way",
  "about",
  "many",
  "then",
  "them",
  "would",
  "write",
  "like",
  "so",
  "these",
  "her",
  "long",
  "make",
  "thing",
  "see",
  "him",
  "two",
  "has",
  "look",
  "more",
  "day",
  "could",
  "go",
  "come",
  "did",
  "my",
  "sound",
  "no",
  "most",
  "number",
  "who",
  "over",
  "know",
  "water",
  "than",
  "call",
  "first",
  "people",
  "may",
  "down",
  "side",
  "been",
  "now",
  "find",
  "any",
  "new",
  "work",
  "part",
  "take",
  "get",
  "place",
  "made",
  "live",
  "where",
  "after",
  "back",
  "little",
  "only",
  "round",
  "man",
  "year",
  "came",
  "show",
  "every",
  "good",
  "me",
  "give",
  "our",
  "under",
  "name",
  "very",
  "through",
  "just",
  "form",
  "much",
  "great",
  "think",
  "say",
  "help",
  "low",
  "line",
  "before",
  "turn",
  "cause",
  "same",
  "mean",
  "differ",
  "move",
  "right",
  "boy",
  "old",
  "too",
  "does",
  "tell",
  "sentence",
  "set",
  "three",
  "want",
  "air",
  "well",
  "also",
  "play",
  "small",
  "end",
  "put",
  "home",
  "read",
  "hand",
  "port",
  "large",
  "spell",
  "add",
  "even",
  "land",
  "here",
  "must",
  "big",
  "high",
  "such",
  "follow",
  "act",
  "why",
  "ask",
  "men",
  "change",
  "went",
  "light",
  "kind",
  "off",
  "need",
  "house",
  "picture",
  "try",
  "us",
  "again",
  "animal",
  "point",
  "mother",
  "world",
  "near",
  "build",
  "self",
  "earth",
  "father",
  "head",
  "stand",
  "own",
  "page",
  "should",
  "country",
  "found",
  "answer",
  "school",
  "grow",
  "study",
  "still",
  "learn",
  "plant",
  "cover",
  "food",
  "sun",
  "four",
  "thought",
  "let",
  "keep",
  "eye",
  "never",
  "last",
  "door",
  "between",
  "city",
  "tree",
  "cross",
  "since",
  "hard",
  "start",
  "might",
  "story",
  "saw",
  "far",
  "sea",
  "draw",
  "left",
  "late",
  "run",
  "don't",
  "while",
  "press",
  "close",
  "night",
  "real",
  "life",
  "few",
  "stop",
  "open",
  "seem",
  "together",
  "next",
  "white",
  "children",
  "begin",
  "got",
  "walk",
  "example",
  "ease",
  "paper",
  "often",
  "always",
  "music",
  "those",
  "both",
  "mark",
  "book",
  "letter",
  "until",
  "mile",
  "river",
  "car",
  "feet",
  "care",
  "second",
  "group",
  "carry",
  "took",
  "rain",
  "eat",
  "room",
  "friend",
  "began",
  "idea",
  "fish",
  "mountain",
  "north",
  "once",
  "base",
  "hear",
  "horse",
  "cut",
  "sure",
  "watch",
  "color",
  "face",
  "wood",
  "main",
  "enough",
  "plain",
  "girl",
  "usual",
  "young",
  "ready",
  "above",
  "ever",
  "red",
  "list",
  "though",
  "feel",
  "talk",
  "bird",
  "soon",
  "body",
  "dog",
  "family",
  "direct",
  "pose",
  "leave",
  "song",
  "measure",
  "state",
  "product",
  "black",
  "short",
  "numeral",
  "class",
  "wind",
  "question",
  "happen",
  "complete",
  "ship",
  "area",
  "half",
  "rock",
  "order",
  "fire",
  "south",
  "problem",
  "piece",
  "told",
  "knew",
  "pass",
  "farm",
  "top",
  "whole",
  "king",
  "size",
  "heard",
  "best",
  "hour",
  "better",
  "TRUE",
  "during",
  "hundred",
  "am",
  "remember",
  "step",
  "early",
  "hold",
  "west",
  "ground",
  "interest",
  "reach",
  "fast",
  "five",
  "sing",
  "listen",
  "six",
  "table",
  "travel",
  "less",
  "morning",
  "ten",
  "simple",
  "several",
  "vowel",
  "toward",
  "war",
  "lay",
  "against",
  "pattern",
  "slow",
  "center",
  "love",
  "person",
  "money",
  "serve",
  "appear",
  "road",
  "map",
  "science",
  "rule",
  "govern",
  "pull",
  "cold",
  "notice",
  "voice",
  "fall",
  "power",
  "town",
  "fine",
  "certain",
  "fly",
  "unit",
  "lead",
  "cry",
  "dark",
  "machine",
  "note",
  "wait",
  "plan",
  "figure",
  "star",
  "box",
  "noun",
  "field",
  "rest",
  "correct",
  "able",
  "pound",
  "done",
  "beauty",
  "drive",
  "stood",
  "contain",
  "front",
  "teach",
  "week",
  "final",
  "gave",
  "green",
  "oh",
  "quick",
  "develop",
  "sleep",
  "warm",
  "free",
  "minute",
  "strong",
  "special",
  "mind",
  "behind",
  "clear",
  "tail",
  "produce",
  "fact",
  "street",
  "inch",
  "lot",
  "nothing",
  "course",
  "stay",
  "wheel",
  "full",
  "force",
  "blue",
  "object",
  "decide",
  "surface",
  "deep",
  "moon",
  "island",
  "foot",
  "yet",
  "busy",
  "test",
  "record",
  "boat",
  "common",
  "gold",
  "possible",
  "plane",
  "age",
  "dry",
  "wonder",
  "laugh",
  "thousand",
  "ago",
  "ran",
  "check",
  "game",
  "shape",
  "yes",
  "hot",
  "miss",
  "brought",
  "heat",
  "snow",
  "bed",
  "bring",
  "sit",
  "perhaps",
  "fill",
  "east",
  "weight",
  "language",
  "among",
]

const backgroundLayers = [
  "backgrounds/sky.png",
  "backgrounds/graves.png",
  "backgrounds/back_trees.png",
  "backgrounds/wall.png",
  "backgrounds/ground.png",
]

const monsters = [
  {
    type: "Skeleton",
    walkColSize: 4,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 15, time: 2500 },
    requiredWords: 5,
    pointsWorth: 500,
  },
  {
    type: "Goblin",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 8, time: 1500 },
    requiredWords: 3,
    pointsWorth: 300,
  },
  {
    type: "Mushroom",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 2, time: 1500 },
    requiredWords: 2,
    pointsWorth: 200,
  },
]

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

function getCurrentUsername() {
  return localStorage.getItem("typequest-current-user") || "Guest"
}

function saveScore(score) {
  const username = getCurrentUsername()
  const currentDate = new Date().toISOString()

  let scores = JSON.parse(localStorage.getItem("typequest-scores") || "[]")

  scores.push({
    username,
    score,
    date: currentDate,
  })

  scores.sort((a, b) => b.score - a.score)

  localStorage.setItem("typequest-scores", JSON.stringify(scores))
}

function updatePoints(value) {
  points = value
  if (pointsDisplay) {
    pointsDisplay.textContent = `Points: ${points}`
  }
}

function showPointsGained(amount) {
  const pointsGained = document.createElement("div")
  pointsGained.style.position = "absolute"
  pointsGained.style.zIndex = "1000"
  pointsGained.style.right = "20px"
  pointsGained.style.top = "80px"
  pointsGained.style.color = "#4a9668"
  pointsGained.style.fontFamily = "Alagard"
  pointsGained.style.fontSize = "24px"
  pointsGained.style.textShadow = `
    2px 2px 0 #1d3b2a,
    -2px 2px 0 #1d3b2a,
    2px -2px 0 #1d3b2a,
    -2px -2px 0 #1d3b2a
  `
  pointsGained.textContent = `+${amount}`
  document.body.appendChild(pointsGained)

  let opacity = 1
  let top = 80
  const animate = () => {
    opacity -= 0.005
    top -= 0.25
    pointsGained.style.opacity = opacity
    pointsGained.style.top = `${top}px`

    if (opacity > 0) {
      requestAnimationFrame(animate)
    } else {
      pointsGained.remove()
    }
  }

  requestAnimationFrame(animate)
}

function showGameOver(finalScore) {
  const gameOverContainer = document.createElement("div")
  gameOverContainer.style.position = "fixed"
  gameOverContainer.style.top = "50%"
  gameOverContainer.style.left = "50%"
  gameOverContainer.style.transform = "translate(-50%, -50%)"
  gameOverContainer.style.backgroundColor = "#14110F" // Darker shade for the background
  gameOverContainer.style.padding = "20px 40px"
  gameOverContainer.style.textAlign = "center"
  gameOverContainer.style.fontFamily = "Alagard"
  gameOverContainer.style.zIndex = "2000"
  gameOverContainer.style.boxShadow = `
    0px 0px 0px 2px #3d3327,
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327,
    -4px -4px 0px 2px #27221b,
    4px -4px 0px 2px #27221b,
    -4px 4px 0px 2px #27221b,
    4px 4px 0px 2px #27221b
  `

  const gameOverTitle = document.createElement("h1")
  gameOverTitle.textContent = "Game Over"
  gameOverTitle.style.color = "#ed4c4a"
  gameOverTitle.style.fontSize = "48px"
  gameOverTitle.style.marginBottom = "20px"
  gameOverTitle.style.textShadow = `
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000
  `

  const scoreText = document.createElement("p")
  scoreText.textContent = `Final Score: ${finalScore}`
  scoreText.style.color = "#ECD9B9"
  scoreText.style.fontSize = "32px"
  scoreText.style.marginBottom = "20px"
  scoreText.style.textShadow = `
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000
  `

  const username = getCurrentUsername()
  const usernameText = document.createElement("p")
  usernameText.textContent = `Played as: ${username}`
  usernameText.style.color = "#ECD9B9"
  usernameText.style.fontSize = "24px"
  usernameText.style.marginBottom = "30px"
  usernameText.style.textShadow = `
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000
  `

  const playAgainButton = document.createElement("button")
  playAgainButton.textContent = "Play Again"
  playAgainButton.style.fontFamily = "Alagard"
  playAgainButton.style.fontSize = "24px"
  playAgainButton.style.padding = "10px 20px"
  playAgainButton.style.marginRight = "15px"
  playAgainButton.style.backgroundColor = "#4a9668"
  playAgainButton.style.color = "#ECD9B9"
  playAgainButton.style.border = "none"
  playAgainButton.style.cursor = "pointer"
  playAgainButton.style.textShadow = `
    2px 2px 0 #1d3b2a,
    -2px 2px 0 #1d3b2a,
    2px -2px 0 #1d3b2a,
    -2px -2px 0 #1d3b2a
  `
  playAgainButton.style.boxShadow = `
    0px 0px 0px 2px #3d3327,
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327
  `

  playAgainButton.addEventListener("mouseover", () => {
    playAgainButton.style.backgroundColor = "#5db37e"
  })

  playAgainButton.addEventListener("mouseout", () => {
    playAgainButton.style.backgroundColor = "#4a9668"
  })

  playAgainButton.addEventListener("click", () => {
    localStorage.setItem("isAllowed", "true")
    location.reload()
  })

  // Back Button
  const backButton = document.createElement("button")
  backButton.textContent = "Back to Menu"
  backButton.style.fontFamily = "Alagard"
  backButton.style.fontSize = "24px"
  backButton.style.padding = "10px 20px"
  backButton.style.marginLeft = "15px"
  backButton.style.backgroundColor = "#8b3c3a"
  backButton.style.color = "#ECD9B9"
  backButton.style.border = "none"
  backButton.style.cursor = "pointer"
  backButton.style.textShadow = `
    2px 2px 0 #4b1918,
    -2px 2px 0 #4b1918,
    2px -2px 0 #4b1918,
    -2px -2px 0 #4b1918
  `
  backButton.style.boxShadow = `
    0px 0px 0px 2px #3d3327,
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327
  `

  backButton.addEventListener("mouseover", () => {
    backButton.style.backgroundColor = "#a64c4a"
  })

  backButton.addEventListener("mouseout", () => {
    backButton.style.backgroundColor = "#8b3c3a"
  })

  backButton.addEventListener("click", () => {
    window.location.href = "index.html	"
  })

  const scanlines = document.createElement("div")
  scanlines.style.position = "absolute"
  scanlines.style.top = "0"
  scanlines.style.left = "0"
  scanlines.style.width = "100%"
  scanlines.style.height = "100%"
  scanlines.style.backgroundImage = `
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 50%,
      transparent 100%
    )
  `
  scanlines.style.backgroundSize = "100% 4px"
  scanlines.style.pointerEvents = "none"

  gameOverContainer.appendChild(gameOverTitle)
  gameOverContainer.appendChild(scoreText)
  gameOverContainer.appendChild(usernameText)
  gameOverContainer.appendChild(playAgainButton)
  gameOverContainer.appendChild(backButton) // Add the Back button
  gameOverContainer.appendChild(scanlines)
  document.body.appendChild(gameOverContainer)
}

let currentMonster = monsters[Math.floor(Math.random() * monsters.length)]

function getRandomWords(numWords) {
  const selectedWords = []

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    selectedWords.push(wordsArray[randomIndex])
  }

  return selectedWords
}

let words = getRandomWords(currentMonster.requiredWords)
let currentWord = words[0]
let currentInputIndex = 0
let wordsTyped = 0

function createParallaxLayer(imageSrc, speed, canvasWidth, canvasHeight) {
  const layer = {
    image: new Image(),
    speed: speed,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    x1: 0,
    x2: canvasWidth,
    isMoving: true,
  }

  layer.image.src = imageSrc

  layer.update = function () {
    if (this.isMoving) {
      this.x1 -= this.speed
      this.x2 -= this.speed

      if (this.x1 <= -this.canvasWidth) this.x1 = this.canvasWidth - 2
      if (this.x2 <= -this.canvasWidth) this.x2 = this.canvasWidth - 2
    }
  }

  layer.draw = function (ctx) {
    ctx.webkitImageSmoothingEnabled = false
    ctx.imageSmoothingEnabled = false

    if (this.image.complete) {
      ctx.drawImage(
        this.image,
        this.x1,
        0,
        this.canvasWidth + 1,
        this.canvasHeight
      )
      ctx.drawImage(
        this.image,
        this.x2,
        0,
        this.canvasWidth + 1,
        this.canvasHeight
      )
    }
  }

  return layer
}

function createNewMonster() {
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)]
  words = getRandomWords(currentMonster.requiredWords)

  monsterAnimation = createMonsterAnimation({
    canvas: monsterAnimation.canvas,
    scale: 5,
    monster: currentMonster,
    onWalkComplete: monsterAnimation.onWalkComplete,
    onStateChange: monsterAnimation.onStateChange,
  })

  initiateAttackSequence()
}

function initiateAttackSequence() {
  if (attackInterval) clearInterval(attackInterval)

  attackInterval = setInterval(() => {
    monsterAnimation.changeState("attack")
    attackInProgress = true
  }, currentMonster.attack.time)
}

function createMonsterAnimation(options) {
  const animation = {
    walk: {
      image: new Image(),
      cols: options.monster.walkColSize,
    },
    idle: {
      image: new Image(),
      cols: options.monster.idleColSize,
    },
    hit: {
      image: new Image(),
      cols: options.monster.hitColSize,
    },
    death: {
      image: new Image(),
      cols: options.monster.deathColSize,
    },
    attack: {
      image: new Image(),
      cols: options.monster.attackColSize,
    },
    currentImage: null,
    cols: options.monster.walkColSize || 4,
    scale: options.scale || 4,
    canvas: options.canvas,
    ctx: options.canvas.getContext("2d"),
    monsterType: options.monster.type,
    currentFrame: 0,
    framesDrawn: 0,
    position: {
      x: 1.2,
      y: 1,
      offsetY: 15,
    },
    state: "hidden",
    stateTime: 0,
    walkDuration: 750,
    cycleStartTime: 0,
    onStateChange: options.onStateChange || (() => {}),
    onWalkComplete: options.onWalkComplete || (() => {}),
  }

  animation.walk.image.src = `sprites/${animation.monsterType}/Walk.png`
  animation.idle.image.src = `sprites/${animation.monsterType}/Idle.png`
  animation.hit.image.src = `sprites/${animation.monsterType}/Take_Hit.png`
  animation.death.image.src = `sprites/${animation.monsterType}/Death.png`
  animation.attack.image.src = `sprites/${animation.monsterType}/Attack.png`

  animation.currentImage = animation.walk.image
  animation.spriteWidth = animation.currentImage.width / animation.cols
  animation.spriteHeight = animation.currentImage.height

  animation.update = function (currentTime) {
    if (!animation.cycleStartTime) {
      animation.cycleStartTime = currentTime
    }

    const cycleTime = currentTime - animation.cycleStartTime

    this.framesDrawn++
    if (this.framesDrawn >= msPerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.cols
      this.framesDrawn = 0
    }

    if (animation.state === "death") {
      if (animation.currentFrame === animation.cols - 1) {
        this.reset()
        this.changeState("hidden")
      }
    } else if (animation.state === "attack") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle")
        player.changeState("hit")
        this.refresh()
      }
    } else if (animation.state === "hit") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle")
      }
    } else if (cycleTime < 500) {
      this.position.x = 1.2
      this.changeState("hidden")
    } else if (cycleTime < 1250) {
      this.changeState("walk")
      if (player.state === "attack") {
        animation.cycleStartTime = currentTime
        return
      }
      const walkProgress = (cycleTime - 500) / animation.walkDuration
      animation.position.x = 1.2 - 0.3 * walkProgress
    } else if (cycleTime < 2000) {
      let previousState = this.state
      this.changeState("idle")
      animation.position.x = 0.9
      if (previousState !== this.state) {
        animation.onWalkComplete()
      }
    }
  }

  animation.draw = function () {
    if (animation.state === "hidden") return

    const srcX = this.currentFrame * this.spriteWidth
    const srcY = 0
    const destWidth = this.spriteWidth * this.scale
    const destHeight = this.spriteHeight * this.scale

    let destX = this.canvas.width * this.position.x - destWidth
    const destY =
      this.canvas.height * this.position.y - destHeight - this.position.offsetY

    this.ctx.save()
    this.ctx.scale(-1, 1)
    this.ctx.drawImage(
      this.currentImage,
      srcX,
      srcY,
      this.spriteWidth,
      this.spriteHeight,
      -destX - destWidth,
      destY,
      destWidth,
      destHeight
    )
    this.ctx.restore()
  }

  animation.reset = function () {
    this.framesDrawn = 0
    this.currentFrame = 0
    this.cycleStartTime = 0
  }

  animation.refresh = function () {
    this.framesDrawn = 0
    this.currentFrame = 0
  }

  animation.changeState = function (state) {
    if (this.state === state) return

    this.state = state
    switch (state) {
      case "walk":
        this.currentImage = this.walk.image
        this.cols = this.walk.cols
        break
      case "idle":
        this.currentImage = this.idle.image
        this.cols = this.idle.cols
        this.refresh()
        if (attackInProgress) {
          currentPlayer.hp -= currentMonster.attack.dmg

          updateHP(currentPlayer.hp)
          attackInProgress = false

          if (currentPlayer.hp <= 0) {
            saveScore(points)
            currentPlayer.hp = 100
            clearInterval(attackInterval)
            showGameOver(points)
            updatePoints(0)
          }
        }
        break
      case "hit":
        this.currentImage = this.hit.image
        this.cols = this.hit.cols
        if (attackInProgress) {
          attackInProgress = false
        }
        this.refresh()
        break
      case "death":
        this.currentImage = this.death.image
        this.cols = this.death.cols
        if (attackInProgress) {
          attackInProgress = false
        }
        clearInterval(attackInterval)
        this.reset()
        updatePoints(points + currentMonster.pointsWorth)
        showPointsGained(currentMonster.pointsWorth)
        break
      case "attack":
        this.currentImage = this.attack.image
        this.cols = this.attack.cols
        this.refresh()
        break
      case "hidden":
        this.currentImage = this.walk.image
        this.cols = this.walk.cols
        break
    }

    this.spriteWidth = this.currentImage.width / this.cols
    this.spriteHeight = this.currentImage.height

    this.onStateChange(this.state)
  }

  return animation
}

const currentPlayer = {
  type: "Knight",
  hp: 100,
  walk: {
    image: new Image(),
    cols: 8,
  },
  walkColSize: 8,
  idleColSize: 7,
  hitColSize: 4,
  deathColSize: 12,
  attackColSize: [7, 6, 7],
}

function createPlayerAnimation(options) {
  const animation = {
    walk: {
      image: new Image(),
      cols: options.character.walkColSize,
    },
    idle: {
      image: new Image(),
      cols: options.character.idleColSize,
    },
    hit: {
      image: new Image(),
      cols: options.character.hitColSize,
    },
    death: {
      image: new Image(),
      cols: options.character.deathColSize,
    },
    attack: [
      {
        image: new Image(),
        cols: options.character.attackColSize[0],
      },
      {
        image: new Image(),
        cols: options.character.attackColSize[1],
      },
      {
        image: new Image(),
        cols: options.character.attackColSize[2],
      },
    ],
    currentImage: null,
    cols: options.character.walkColSize || 4,
    scale: options.scale || 4,
    canvas: options.canvas,
    ctx: options.canvas.getContext("2d"),
    type: options.character.type,
    currentFrame: 0,
    framesDrawn: 0,
    position: {
      x: 0.3,
      y: 1,
      offsetY: 125,
    },
    state: "walk",
    stateTime: 0,
    attackCount: 0,
  }

  animation.walk.image.src = `sprites/${animation.type}/Run.png`
  animation.idle.image.src = `sprites/${animation.type}/Idle.png`
  animation.hit.image.src = `sprites/${animation.type}/Take_Hit.png`
  animation.death.image.src = `sprites/${animation.type}/Death.png`

  let attackAnimationArray = []
  for (let i = 0; i < options.character.attackColSize.length; i++) {
    attackAnimationArray.push({
      image: new Image(),
      cols: options.character.attackColSize[i],
    })
    attackAnimationArray[i].image.src = `sprites/${animation.type}/Attack_${
      i + 1
    }.png`
  }

  animation.attack = attackAnimationArray

  animation.currentImage = animation.walk.image
  animation.walk.image.onload = function () {
    animation.spriteWidth = animation.currentImage.width / animation.cols
    animation.spriteHeight = animation.currentImage.height
  }

  animation.update = function () {
    switch (animation.state) {
      case "death":
        if (this.currentFrame === this.cols - 1) {
          this.reset()
          this.changeState("hidden")
        }
        break
      case "attack":
        if (this.currentFrame === this.cols - 1) {
          this.refresh()
          this.changeState("idle")
        }
        break
      case "hit":
        if (this.currentFrame === this.cols - 1) {
          this.changeState("idle")
        }
        break
      default:
        break
    }
    this.framesDrawn++
    if (this.framesDrawn > msPerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.cols
      this.framesDrawn = 0
    }
  }

  animation.draw = function () {
    if (animation.state === "hidden") return

    const srcX = this.currentFrame * this.spriteWidth
    const srcY = 0
    const destWidth = this.spriteWidth * this.scale
    const destHeight = this.spriteHeight * this.scale

    const destX = this.canvas.width * this.position.x - destWidth
    const destY =
      this.canvas.height * this.position.y - destHeight - this.position.offsetY

    this.ctx.drawImage(
      this.currentImage,
      srcX,
      srcY,
      this.spriteWidth,
      this.spriteHeight,
      destX,
      destY,
      destWidth,
      destHeight
    )
  }

  animation.refresh = function () {
    this.framesDrawn = 0
    this.currentFrame = 0
  }

  animation.changeState = function (state) {
    if (this.state === state && state !== "attack") return

    switch (state) {
      case "walk":
        this.currentImage = this.walk.image
        this.cols = this.walk.cols
        break
      case "idle":
        this.currentImage = this.idle.image
        this.cols = this.idle.cols
        break
      case "hit":
        if (this.state !== "attack") {
          this.currentImage = this.hit.image
          this.cols = this.hit.cols
          this.refresh()
        }
        break
      case "death":
        this.currentImage = this.death.image
        this.cols = this.death.cols
        this.refresh()
        break
      case "attack":
        this.currentImage = this.attack[this.attackCount].image
        this.cols = this.attack[this.attackCount].cols
        this.refresh()
        this.attackCount = (this.attackCount + 1) % 3
        break
      case "hidden":
        this.currentImage = this.walk.image
        this.cols = this.walk.cols
        break
    }
    this.state = state

    this.spriteWidth = this.currentImage.width / this.cols
    this.spriteHeight = this.currentImage.height
  }

  return animation
}

function createWordDisplay() {
  const wordDisplay = document.createElement("div")
  wordDisplay.id = "wordDisplay"

  // scanlines effect for more pixelated look
  const scanlines = document.createElement("div")
  scanlines.style.position = "absolute"
  scanlines.style.top = "0"
  scanlines.style.left = "0"
  scanlines.style.width = "100%"
  scanlines.style.height = "100%"
  scanlines.style.backgroundImage = `
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 50%,
      transparent 100%
    )
  `
  scanlines.style.backgroundSize = "100% 4px"
  scanlines.style.pointerEvents = "none"

  //container for the letters to layer them above the scanlines
  const letterContainer = document.createElement("div")
  letterContainer.style.position = "relative"
  letterContainer.style.zIndex = "1"

  // letter spans with appropriate styling
  currentWord.split("").forEach((char) => {
    const charSpan = document.createElement("span")
    charSpan.innerText = char
    charSpan.style.position = "relative"
    charSpan.style.transition = "all 0.2s ease"
    charSpan.style.margin = "0 2px"
    letterContainer.appendChild(charSpan)
  })

  wordDisplay.appendChild(scanlines)
  wordDisplay.appendChild(letterContainer)

  const wordContainer = document.getElementById("wordContainer")
  wordContainer.appendChild(wordDisplay)
}

function updateWordDisplay() {
  const spans = document.querySelectorAll("#wordDisplay span")
  spans.forEach((span, index) => {
    if (index < currentInputIndex) {
      // completed letters
      span.style.color = "#4a9668"
      span.style.textShadow = `
        2px 2px 0 #1d3b2a,
        -2px 2px 0 #1d3b2a,
        2px -2px 0 #1d3b2a,
        -2px -2px 0 #1d3b2a
      `
      span.style.transform = "translateY(-2px)"
    } else {
      // pending letters
      span.style.color = "#ECD9B9"
      span.style.textShadow = `
        2px 2px 0 #000,
        -2px 2px 0 #000,
        2px -2px 0 #000,
        -2px -2px 0 #000
      `
      span.style.transform = "none"
    }
  })
}

function showNewWord() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = ""
  createWordDisplay()
}

function handleKeyPress(event) {
  const pressedKey = event.key
  if (pressedKey === currentWord[currentInputIndex]) {
    currentInputIndex++
    updateWordDisplay()

    if (currentInputIndex === currentWord.length) {
      currentInputIndex = 0
      wordsTyped++
      player.changeState("attack")

      if (wordsTyped === words.length) {
        monsterAnimation.changeState("death")
        if (currentMonster.type === "Mushroom") {
          currentPlayer.hp = Math.min(currentPlayer.hp + 5, 100)
          updateHP(currentPlayer.hp)
          showHealingEffect()
        }
        wordsTyped = 0
        currentInputIndex = 0
        currentWord = words[wordsTyped]
        resetWordContainer()
        return
      } else {
        currentWord = words[wordsTyped]
        showNewWord()
      }
      monsterAnimation.changeState("hit")
    }
  }
}

function resetWordContainer() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = ""
}

function showHealingEffect() {
  const healingEffect = document.createElement("div")
  healingEffect.style.position = "absolute"
  healingEffect.style.top = "50%"
  healingEffect.style.left = "50%"
  healingEffect.style.transform = "translate(-50%, -50%)"
  healingEffect.style.fontSize = "48px"
  healingEffect.style.fontFamily = "Alagard"
  healingEffect.style.color = "#4a9668"
  healingEffect.style.textShadow = `
    2px 2px 0 #1d3b2a,
    -2px 2px 0 #1d3b2a,
    2px -2px 0 #1d3b2a,
    -2px -2px 0 #1d3b2a
  `
  healingEffect.textContent = "+5 HP"

  document.body.appendChild(healingEffect)

  let opacity = 1
  let scale = 1

  const animate = () => {
    opacity -= 0.01
    scale += 0.01

    healingEffect.style.opacity = opacity
    healingEffect.style.transform = `translate(-50%, -50%) scale(${scale})`

    if (opacity > 0) {
      requestAnimationFrame(animate)
    } else {
      healingEffect.remove()
    }
  }

  requestAnimationFrame(animate)
}

function ParallaxScene() {
  const canvas = document.getElementById("parallaxCanvas")
  const ctx = canvas.getContext("2d")

  let layers = [
    createParallaxLayer(backgroundLayers[0], 0.2, canvas.width, canvas.height),
    createParallaxLayer(backgroundLayers[1], 0.5, canvas.width, canvas.height),
    createParallaxLayer(backgroundLayers[2], 1, canvas.width, canvas.height),
    createParallaxLayer(backgroundLayers[3], 2, canvas.width, canvas.height),
    createParallaxLayer(backgroundLayers[4], 4, canvas.width, canvas.height),
  ]

  player = createPlayerAnimation({
    canvas: canvas,
    scale: 6,
    character: currentPlayer,
  })

  monsterAnimation = createMonsterAnimation({
    canvas: canvas,
    scale: 5,
    monster: currentMonster,
    onStateChange: (newState) => {
      if (newState === "idle") {
        if (player.state === "walk") {
          player.changeState("idle")
          layers.forEach((layer) => {
            layer.isMoving = false
          })
        }
      } else if (newState === "hidden") {
        setTimeout(() => {
          player.changeState("walk")
          layers.forEach((layer) => {
            layer.isMoving = true
          })
          createNewMonster()
        }, 500)
      }
    },
    onWalkComplete: createWordDisplay,
  })

  function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    layers.forEach((layer) => {
      layer.canvasWidth = canvas.width
      layer.canvasHeight = canvas.height
      layer.x1 = 0
      layer.x2 = canvas.width
    })
  }

  function animate(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    layers.forEach((layer) => {
      layer.update()
      layer.draw(ctx)
    })
    player.update(currentTime)
    monsterAnimation.update(currentTime)
    player.draw()
    monsterAnimation.draw()

    requestAnimationFrame(animate)
  }

  window.addEventListener("resize", resize)
  resize()
  requestAnimationFrame(animate)
}

function updateHP(currentHP, maxHP = 100) {
  const hpBar = document.getElementById("hpBar")
  const hpValue = document.getElementById("hpValue")
  const percentage = (currentHP / maxHP) * 100
  hpBar.style.width = `${percentage}%`
  hpValue.textContent = `${currentHP}/${maxHP}`

  // change color based on HP level
  if (percentage <= 20) {
    hpBar.style.backgroundImage = `
      linear-gradient(
        to bottom,
        #ff3838 0%,
        #d41f1f 50%,
        #8b1916 100%
      )
    `
  } else if (percentage <= 50) {
    hpBar.style.backgroundImage = `
      linear-gradient(
        to bottom,
        #ffa439 0%,
        #d45e1f 50%,
        #8b3916 100%
      )
    `
  } else {
    hpBar.style.backgroundImage = `
      linear-gradient(
        to bottom,
        #ed4c4a 0%,
        #a82f2c 50%,
        #8b1916 100%
      )
    `
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("isAllowed") !== "true") {
    window.location.href = "index.html"
  }
  localStorage.setItem("isAllowed", "false")

  ParallaxScene()
  initiateAttackSequence()
  window.addEventListener("keypress", handleKeyPress)

  updateHP(currentPlayer.hp)
  pointsDisplay = document.getElementById("pointsValue")
  detectRefreshRate((fps) => {
    localStorage.setItem("refresh-rate", fps.toFixed(0))
  })
  msPerFrame = localStorage.getItem("refresh-rate") > 100 ? 15 : 7
})
