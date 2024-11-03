let hp = 100

let attackInterval

const wordsArray = [
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
]

function getRandomWords(numWords) {
  const selectedWords = []

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    selectedWords.push(wordsArray[randomIndex])
  }

  return selectedWords
}

let words = getRandomWords(2)
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

const monsters = [
  {
    type: "Skeleton",
    walkColSize: 4,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 5, time: 5000 },
  },
  {
    type: "Goblin",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 2, time: 2000 },
  },
  {
    type: "Mushroom",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 2, time: 2000 },
  },
]

let currentMonster = monsters[Math.floor(Math.random() * monsters.length)]

function createNewMonster() {
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)]
  spriteAnimation = createSpriteAnimation({
    canvas: spriteAnimation.canvas,
    scale: 4,
    monster: currentMonster,
    onWalkComplete: spriteAnimation.onWalkComplete,
    onStateChange: spriteAnimation.onStateChange,
  })

  initiateAttackSequence()
}

function initiateAttackSequence() {
  if (attackInterval) clearInterval(attackInterval)

  attackInterval = setInterval(() => {
    spriteAnimation.changeState("attack")

    hp -= currentMonster.attack.dmg
    console.log(`Attacked! HP remaining: ${hp}`)

    if (hp <= 0) {
      hp = 100
      console.log("Game Over!")
      clearInterval(attackInterval)
    }
  }, currentMonster.attack.time)
}

function createSpriteAnimation(options) {
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
      offsetY: 50,
    },
    state: "hidden",
    stateTime: 0,
    walkDuration: 500,
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

    // Frame advancement logic
    this.framesDrawn++
    if (this.framesDrawn >= 15) {
      this.currentFrame = (this.currentFrame + 1) % this.cols
      this.framesDrawn = 0
    }

    // Death state: play death animation once
    if (animation.state === "death") {
      if (animation.currentFrame === animation.cols - 1) {
        this.reset()
        this.changeState("hidden")
        createNewMonster()
      }
    }
    // Attack state: play attack animation once
    else if (animation.state === "attack") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle") // Return to idle after attack
        this.refresh()
      }
    }
    // Hit state: play hit animation once and switch back to idle
    else if (animation.state === "hit") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle")
      }
    }
    // Walking state logic
    else if (cycleTime < 500) {
      this.position.x = 1.2
      this.changeState("hidden")
    } else if (cycleTime < 1000) {
      this.changeState("walk")
      const walkProgress = (cycleTime - 500) / animation.walkDuration
      animation.position.x = 1.2 - 0.3 * walkProgress
    }
    // Idle state logic
    else if (cycleTime < 2000) {
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
        break
      case "hit":
        this.currentImage = this.hit.image
        this.cols = this.hit.cols
        this.refresh()
        break
      case "death":
        this.currentImage = this.death.image
        this.cols = this.death.cols
        clearInterval(attackInterval)
        this.reset()
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

function createWordDisplay() {
  const wordDisplay = document.createElement("div")
  wordDisplay.id = "wordDisplay"
  wordDisplay.style.position = "absolute"
  wordDisplay.style.top = "20px"
  wordDisplay.style.left = "50%"
  wordDisplay.style.transform = "translateX(-50%)"
  wordDisplay.style.fontFamily = "MedievalSharp"
  wordDisplay.style.fontSize = "34px"
  wordDisplay.style.color = "white"
  wordDisplay.style.backgroundColor = "#27221b"
  wordDisplay.style.padding = "6px" // Adds space for the pixel effect
  wordDisplay.style.borderRadius = "2px"
  wordDisplay.style.boxShadow = `
    0px 0px 0px 2px #3d3327,   /* Outer layer for the pixelated effect */
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327,
    -4px -4px 0px 2px #1c1714, /* Inner layer with darker shade */
    4px -4px 0px 2px #1c1714,
    -4px 4px 0px 2px #1c1714,
    4px 4px 0px 2px #1c1714
  `

  currentWord.split("").forEach((char) => {
    const charSpan = document.createElement("span")
    charSpan.innerText = char
    charSpan.style.backgroundColor = "transparent"
    charSpan.style.transition = "background-color 0.1s"
    wordDisplay.appendChild(charSpan)
  })

  const wordContainer = document.getElementById("wordContainer")
  wordContainer.appendChild(wordDisplay)

  const monsterX = 0.25 * spriteAnimation.canvas.width
  const monsterY = 1.05 * spriteAnimation.canvas.height

  wordDisplay.style.left = `${monsterX - wordDisplay.offsetWidth / 2}px`
  wordDisplay.style.top = `${
    monsterY - spriteAnimation.spriteHeight * spriteAnimation.scale - 20
  }px` // 20px above the monster
}

function updateWordDisplay() {
  const spans = document.querySelectorAll("#wordDisplay span")
  spans.forEach((span, index) => {
    if (index < currentInputIndex) {
      span.style.backgroundColor = "green"
    } else {
      span.style.backgroundColor = "transparent"
    }
  })
}

function handleKeyPress(event) {
  const pressedKey = event.key
  if (pressedKey === currentWord[currentInputIndex]) {
    currentInputIndex++
    updateWordDisplay()

    if (currentInputIndex === currentWord.length) {
      currentInputIndex = 0 // Reset for next word
      wordsTyped++

      if (wordsTyped === words.length) {
        spriteAnimation.changeState("death")
        wordsTyped = 0
        currentInputIndex = 0
        loadRandomWords(2)
        currentWord = words[wordsTyped]
        resetWordContainer()
        return
      } else {
        currentWord = words[wordsTyped]
        showNewWord()
      }
      spriteAnimation.changeState("hit")
    }
  }
}

function resetWordContainer() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = ""
}

function showNewWord() {
  const wordContainer = document.getElementById("wordContainer")
  wordContainer.innerHTML = ""

  createWordDisplay()
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

  spriteAnimation = createSpriteAnimation({
    canvas: canvas,
    scale: 4,
    monster: currentMonster,
    onStateChange: (newState) => {
      if (newState === "idle") {
        layers.forEach((layer) => {
          layer.isMoving = false
        })
      } else if (newState === "hidden") {
        layers.forEach((layer) => {
          layer.isMoving = true
        })
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
  initiateAttackSequence()
  window.addEventListener("keypress", handleKeyPress)
})
