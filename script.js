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

// Return an array with a specified number of random words
function getRandomWords(numWords) {
  const selectedWords = []

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    selectedWords.push(wordsArray[randomIndex])
  }

  return selectedWords
}

let words = getRandomWords(5)
let currentWord = words[0] // The word to type (for testing purposes)
let currentInputIndex = 0 // Tracks the current character input index
let wordsTyped = 0

let spriteAnimation = {}

function loadRandomWords(wordCount) {
  words = getRandomWords(wordCount)
}

function createParallaxLayer(imageSrc, speed, canvasWidth, canvasHeight) {
  const layer = {
    image: new Image(),
    speed: speed,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    x1: 0,
    x2: canvasWidth,
    isMoving: true, // New property to control movement
  }

  layer.image.src = imageSrc

  layer.update = function () {
    if (this.isMoving) {
      // Only update position if moving
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

function createSpriteAnimation(options) {
  const animation = {
    walkImage: new Image(),
    idleImage: new Image(),
    deathImage: new Image(),
    currentImage: null,
    cols: options.cols || 4,
    scale: options.scale || 4,
    canvas: options.canvas,
    ctx: options.canvas.getContext("2d"),
    monsterType: options.monsterType,
    currentFrame: 0,
    framesDrawn: 0,
    position: {
      x: 1.2,
      y: 1,
      offsetY: 50,
    },
    state: "hidden",
    stateTime: 0,
    walkDuration: 500,
    cycleStartTime: 0,
    onStateChange: options.onStateChange || (() => {}), // Callback for state changes
    onWalkComplete: options.onWalkComplete || (() => {}), // Callback when walking is complete
  }

  animation.walkImage.src = `sprites/${animation.monsterType}/Walk.png`
  animation.idleImage.src = `sprites/${animation.monsterType}/Idle.png`
  animation.deathImage.src = `sprites/${animation.monsterType}/Death.png`
  animation.currentImage = animation.walkImage

  animation.walkImage.onload = () => {
    animation.spriteWidth = animation.walkImage.width / animation.cols
    animation.spriteHeight = animation.walkImage.height
  }

  animation.update = function (currentTime) {
    if (!animation.cycleStartTime) {
      animation.cycleStartTime = currentTime
    }

    const cycleTime = currentTime - animation.cycleStartTime
    const previousState = animation.state

    if (animation.state === "death") {
      animation.currentImage = animation.deathImage
      if (animation.currentFrame === animation.cols - 1) {
        animation.state = "hidden"
        animation.reset()
        animation.currentImage = animation.walkImage
      }
    } else if (cycleTime < 500) {
      animation.state = "hidden"
      animation.position.x = 1.2
    } else if (cycleTime < 1000) {
      animation.state = "walking"
      animation.currentImage = animation.walkImage
      const walkProgress = (cycleTime - 500) / animation.walkDuration
      animation.position.x = 1.2 - 0.3 * walkProgress
    } else if (cycleTime < 2000) {
      animation.state = "idle"
      animation.currentImage = animation.idleImage
      animation.position.x = 0.9
      if (previousState !== animation.state) {
        animation.onWalkComplete() // Call the callback to show words
      }
    }

    // Notify state change
    if (previousState !== animation.state) {
      animation.onStateChange(animation.state)
    }

    this.framesDrawn++
    if (this.framesDrawn >= 15) {
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
    animation.cycleStartTime = 0
  }

  return animation
}

function createWordDisplay() {
  const wordDisplay = document.createElement("div")
  wordDisplay.id = "wordDisplay"
  wordDisplay.style.position = "absolute"
  wordDisplay.style.top = "20px" // Adjust as needed
  wordDisplay.style.left = "50%"
  wordDisplay.style.transform = "translateX(-50%)"
  wordDisplay.style.fontSize = "24px" // Adjust as needed
  wordDisplay.style.color = "white" // Adjust color for visibility

  currentWord.split("").forEach((char) => {
    const charSpan = document.createElement("span")
    charSpan.innerText = char
    charSpan.style.backgroundColor = "transparent" // Initial background
    charSpan.style.transition = "background-color 0.3s" // Smooth transition
    wordDisplay.appendChild(charSpan)
  })

  const wordContainer = document.getElementById("wordContainer")
  wordContainer.appendChild(wordDisplay)
}

function updateWordDisplay() {
  const spans = document.querySelectorAll("#wordDisplay span")
  spans.forEach((span, index) => {
    if (index < currentInputIndex) {
      span.style.backgroundColor = "green" // Correctly typed character
    } else {
      span.style.backgroundColor = "transparent" // Reset color for untyped characters
    }
  })
}

function handleKeyPress(event) {
  const pressedKey = event.key
  if (pressedKey === currentWord[currentInputIndex]) {
    currentInputIndex++
    updateWordDisplay()

    // Check if the word is completely typed
    if (currentInputIndex === currentWord.length) {
      currentInputIndex = 0 // Reset for next word
      wordsTyped++

      if (wordsTyped === words.length) {
        spriteAnimation.state = "death"
        spriteAnimation.cycleStartTime = 0
        wordsTyped = 0
        currentInputIndex = 0
        loadRandomWords(5)
        currentWord = words[wordsTyped]
        resetWordContainer()
      } else {
        currentWord = words[wordsTyped]
        showNewWord()
      }
    }
  }
}

function resetWordContainer() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = "" // Clear the current display
}

function showNewWord() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = "" // Clear the current display

  createWordDisplay() // Recreate the display for the new word
}

function ParallaxScene() {
  const canvas = document.getElementById("parallaxCanvas")
  const ctx = canvas.getContext("2d")

  let layers = [
    createParallaxLayer(
      "backgrounds/sky.png",
      0.2,
      canvas.width,
      canvas.height
    ),
    createParallaxLayer(
      "backgrounds/graves.png",
      0.5,
      canvas.width,
      canvas.height
    ),
    createParallaxLayer(
      "backgrounds/back_trees.png",
      1,
      canvas.width,
      canvas.height
    ),
    createParallaxLayer("backgrounds/wall.png", 2, canvas.width, canvas.height),
    createParallaxLayer(
      "backgrounds/ground.png",
      4,
      canvas.width,
      canvas.height
    ),
  ]

  // Create sprite animation with state change handler
  spriteAnimation = createSpriteAnimation({
    canvas: canvas,
    cols: 4,
    scale: 4,
    monsterType: "Skeleton",
    onStateChange: (newState) => {
      // Stop parallax movement when skeleton enters idle state
      if (newState === "idle") {
        layers.forEach((layer) => {
          layer.isMoving = false
        })
      }
      // Resume parallax movement when skeleton is hidden (cycle restart)
      else if (newState === "hidden") {
        layers.forEach((layer) => {
          layer.isMoving = true
        })
      }
    },
    onWalkComplete: createWordDisplay, // Show words after walking, // Callback when walking is complete
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

    spriteAnimation.update(currentTime)
    spriteAnimation.draw()

    requestAnimationFrame(animate)
  }

  window.addEventListener("resize", resize)
  resize()
  requestAnimationFrame(animate)
}

document.addEventListener("DOMContentLoaded", () => {
  ParallaxScene()
  window.addEventListener("keypress", handleKeyPress) // Add the keypress event listener
})
