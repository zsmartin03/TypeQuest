let spriteAnimation = {};
let player = {};
let hp = 100;
let msPerFrame = 7;

const hpBar = createHPBar();

let attackInterval;

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
];

const monsters = [
  {
    type: "Skeleton",
    walkColSize: 4,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 5, time: 5000 },
    requiredWords: 5,
  },
  {
    type: "Goblin",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 2, time: 2000 },
    requiredWords: 3,
  },
  {
    type: "Mushroom",
    walkColSize: 8,
    idleColSize: 4,
    hitColSize: 4,
    deathColSize: 4,
    attackColSize: 9,
    attack: { dmg: 2, time: 2000 },
    requiredWords: 2,
  },
];

let currentMonster = monsters[Math.floor(Math.random() * monsters.length)];

function getRandomWords(numWords) {
  const selectedWords = [];

  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    selectedWords.push(wordsArray[randomIndex]);
  }

  return selectedWords;
}

let words = getRandomWords(currentMonster.requiredWords);
let currentWord = words[0];
let currentInputIndex = 0;
let wordsTyped = 0;

function createParallaxLayer(imageSrc, speed, canvasWidth, canvasHeight) {
  const layer = {
    image: new Image(),
    speed: speed,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    x1: 0,
    x2: canvasWidth,
    isMoving: true,
  };

  layer.image.src = imageSrc;

  layer.update = function () {
    if (this.isMoving) {
      this.x1 -= this.speed;
      this.x2 -= this.speed;

      if (this.x1 <= -this.canvasWidth) this.x1 = this.canvasWidth - 2;
      if (this.x2 <= -this.canvasWidth) this.x2 = this.canvasWidth - 2;
    }
  };

  layer.draw = function (ctx) {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    if (this.image.complete) {
      ctx.drawImage(
        this.image,
        this.x1,
        0,
        this.canvasWidth + 1,
        this.canvasHeight,
      );
      ctx.drawImage(
        this.image,
        this.x2,
        0,
        this.canvasWidth + 1,
        this.canvasHeight,
      );
    }
  };

  return layer;
}

function createNewMonster() {
  currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
  words = getRandomWords(currentMonster.requiredWords);

  spriteAnimation = createSpriteAnimation({
    canvas: spriteAnimation.canvas,
    scale: 5,
    monster: currentMonster,
    onWalkComplete: spriteAnimation.onWalkComplete,
    onStateChange: spriteAnimation.onStateChange,
  });

  initiateAttackSequence();
}

let attackInProgress = false;

function initiateAttackSequence() {
  if (attackInterval) clearInterval(attackInterval);

  attackInterval = setInterval(() => {
    spriteAnimation.changeState("attack");
    attackInProgress = true;
  }, currentMonster.attack.time);
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
      offsetY: 15,
    },
    state: "hidden",
    stateTime: 0,
    walkDuration: 750,
    cycleStartTime: 0,
    onStateChange: options.onStateChange || (() => {}),
    onWalkComplete: options.onWalkComplete || (() => {}),
  };

  animation.walk.image.src = `sprites/${animation.monsterType}/Walk.png`;
  animation.idle.image.src = `sprites/${animation.monsterType}/Idle.png`;
  animation.hit.image.src = `sprites/${animation.monsterType}/Take_Hit.png`;
  animation.death.image.src = `sprites/${animation.monsterType}/Death.png`;
  animation.attack.image.src = `sprites/${animation.monsterType}/Attack.png`;

  animation.currentImage = animation.walk.image;
  animation.spriteWidth = animation.currentImage.width / animation.cols;
  animation.spriteHeight = animation.currentImage.height;

  animation.update = function (currentTime) {
    if (!animation.cycleStartTime) {
      animation.cycleStartTime = currentTime;
    }

    const cycleTime = currentTime - animation.cycleStartTime;

    this.framesDrawn++;
    if (this.framesDrawn >= msPerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.cols;
      this.framesDrawn = 0;
    }

    if (animation.state === "death") {
      if (animation.currentFrame === animation.cols - 1) {
        this.reset();
        this.changeState("hidden");
        createNewMonster();
      }
    } else if (animation.state === "attack") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle");
        player.changeState("hit");
        this.refresh();
      }
    } else if (animation.state === "hit") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle");
      }
    } else if (cycleTime < 500) {
      this.position.x = 1.2;
      this.changeState("hidden");
    } else if (cycleTime < 1250) {
      this.changeState("walk");
      const walkProgress = (cycleTime - 500) / animation.walkDuration;
      animation.position.x = 1.2 - 0.3 * walkProgress;
    } else if (cycleTime < 2000) {
      let previousState = this.state;
      this.changeState("idle");
      animation.position.x = 0.9;
      if (previousState !== this.state) {
        animation.onWalkComplete();
      }
    }
  };

  animation.draw = function () {
    if (animation.state === "hidden") return;

    const srcX = this.currentFrame * this.spriteWidth;
    const srcY = 0;
    const destWidth = this.spriteWidth * this.scale;
    const destHeight = this.spriteHeight * this.scale;

    let destX = this.canvas.width * this.position.x - destWidth;
    const destY =
      this.canvas.height * this.position.y - destHeight - this.position.offsetY;

    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(
      this.currentImage,
      srcX,
      srcY,
      this.spriteWidth,
      this.spriteHeight,
      -destX - destWidth,
      destY,
      destWidth,
      destHeight,
    );
    this.ctx.restore();
  };

  animation.reset = function () {
    this.framesDrawn = 0;
    this.currentFrame = 0;
    this.cycleStartTime = 0;
  };

  animation.refresh = function () {
    this.framesDrawn = 0;
    this.currentFrame = 0;
  };

  animation.changeState = function (state) {
    if (this.state === state) return;

    this.state = state;
    switch (state) {
      case "walk":
        this.currentImage = this.walk.image;
        this.cols = this.walk.cols;
        break;
      case "idle":
        this.currentImage = this.idle.image;
        this.cols = this.idle.cols;
        if (attackInProgress) {
          hp -= currentMonster.attack.dmg;

          hpBar.updateHP(hp);
          console.log(`Attacked! HP remaining: ${hp}`);
          attackInProgress = false;

          if (hp <= 0) {
            hp = 100;
            console.log("Game Over!");
            clearInterval(attackInterval);
          }
        }
        break;
      case "hit":
        this.currentImage = this.hit.image;
        this.cols = this.hit.cols;
        if (attackInProgress) {
          attackInProgress = false;
        }
        this.refresh();
        break;
      case "death":
        this.currentImage = this.death.image;
        this.cols = this.death.cols;
        if (attackInProgress) {
          attackInProgress = false;
        }
        clearInterval(attackInterval);
        this.reset();
        break;
      case "attack":
        this.currentImage = this.attack.image;
        this.cols = this.attack.cols;
        this.refresh();
        break;
      case "hidden":
        this.currentImage = this.walk.image;
        this.cols = this.walk.cols;
        break;
    }

    this.spriteWidth = this.currentImage.width / this.cols;
    this.spriteHeight = this.currentImage.height;

    this.onStateChange(this.state);
  };

  return animation;
}

const currentPlayer = {
  type: "Knight",
  walk: {
    image: new Image(),
    cols: 8,
  },
  walkColSize: 8,
  idleColSize: 7,
  hitColSize: 4,
  deathColSize: 12,
  attackColSize: 7,
};

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
    attack: {
      image: new Image(),
      cols: options.character.attackColSize,
    },
    currentImage: null,
    cols: options.character.walkColSize || 4,
    scale: options.scale || 4,
    canvas: options.canvas,
    ctx: options.canvas.getContext("2d"),
    type: "Knight",
    currentFrame: 0,
    framesDrawn: 0,
    position: {
      x: 0.3,
      y: 1,
      offsetY: 125,
    },
    state: "walk",
    stateTime: 0,
    onStateChange: options.onStateChange || (() => {}),
  };

  animation.walk.image.src = `sprites/${animation.type}/Run.png`;
  animation.idle.image.src = `sprites/${animation.type}/Idle.png`;
  animation.hit.image.src = `sprites/${animation.type}/Take_Hit.png`;
  animation.death.image.src = `sprites/${animation.type}/Death.png`;
  animation.attack.image.src = `sprites/${animation.type}/Attack.png`;

  animation.currentImage = animation.walk.image;
  animation.walk.image.onload = function () {
    animation.spriteWidth = animation.currentImage.width / animation.cols;
    animation.spriteHeight = animation.currentImage.height;
  };

  animation.update = function () {
    this.framesDrawn++;
    if (this.framesDrawn >= msPerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.cols;
      this.framesDrawn = 0;
    }

    if (animation.state === "death") {
      if (animation.currentFrame === animation.cols - 1) {
        this.reset();
        this.changeState("hidden");
      }
    } else if (animation.state === "attack") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle");
        this.refresh();
      }
    } else if (animation.state === "hit") {
      if (animation.currentFrame === animation.cols - 1) {
        this.changeState("idle");
      }
    }
  };

  animation.draw = function () {
    if (animation.state === "hidden") return;

    const srcX = this.currentFrame * this.spriteWidth;
    const srcY = 0;
    const destWidth = this.spriteWidth * this.scale;
    const destHeight = this.spriteHeight * this.scale;

    const destX = this.canvas.width * this.position.x - destWidth;
    const destY =
      this.canvas.height * this.position.y - destHeight - this.position.offsetY;

    this.ctx.drawImage(
      this.currentImage,
      srcX,
      srcY,
      this.spriteWidth,
      this.spriteHeight,
      destX,
      destY,
      destWidth,
      destHeight,
    );
  };

  animation.reset = function () {
    this.framesDrawn = 0;
    this.currentFrame = 0;
    this.cycleStartTime = 0;
  };

  animation.refresh = function () {
    this.framesDrawn = 0;
    this.currentFrame = 0;
  };

  animation.changeState = function (state) {
    if (this.state === state) return;

    this.state = state;
    switch (state) {
      case "walk":
        this.currentImage = this.walk.image;
        this.cols = this.walk.cols;
        break;
      case "idle":
        this.currentImage = this.idle.image;
        this.cols = this.idle.cols;
        break;
      case "hit":
        this.currentImage = this.hit.image;
        this.cols = this.hit.cols;
        this.refresh();
        break;
      case "death":
        this.currentImage = this.death.image;
        this.cols = this.death.cols;
        this.reset();
        break;
      case "attack":
        this.currentImage = this.attack.image;
        this.cols = this.attack.cols;
        this.refresh();
        break;
      case "hidden":
        this.currentImage = this.walk.image;
        this.cols = this.walk.cols;
        break;
    }

    this.spriteWidth = this.currentImage.width / this.cols;
    this.spriteHeight = this.currentImage.height;

    this.onStateChange(this.state);
  };

  return animation;
}

function createWordDisplay() {
  const wordDisplay = document.createElement("div");
  wordDisplay.id = "wordDisplay";
  wordDisplay.style.position = "absolute";
  wordDisplay.style.transform = "translateX(-50%)";
  wordDisplay.style.fontFamily = "Alagard";
  wordDisplay.style.fontSize = "34px";
  wordDisplay.style.color = "#ECD9B9";
  wordDisplay.style.backgroundColor = "#1c1714";
  wordDisplay.style.padding = "8px 16px";
  wordDisplay.style.boxShadow = `
    0px 0px 0px 2px #3d3327,   /* Outer layer for the pixelated effect */
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327,
    -4px -4px 0px 2px #27221b, /* Inner layer with slightly lighter dark brown */
    4px -4px 0px 2px #27221b,
    -4px 4px 0px 2px #27221b,
    4px 4px 0px 2px #27221b
  `;
  wordDisplay.style.textShadow = `
    2px 2px 0 #000,
    -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000
  `;

  // scanlines effect for more pixelated look
  const scanlines = document.createElement("div");
  scanlines.style.position = "absolute";
  scanlines.style.top = "0";
  scanlines.style.left = "0";
  scanlines.style.width = "100%";
  scanlines.style.height = "100%";
  scanlines.style.backgroundImage = `
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 50%,
      transparent 100%
    )
  `;
  scanlines.style.backgroundSize = "100% 4px";
  scanlines.style.pointerEvents = "none";

  //container for the letters to layer them above the scanlines
  const letterContainer = document.createElement("div");
  letterContainer.style.position = "relative";
  letterContainer.style.zIndex = "1";

  // letter spans with appropriate styling
  currentWord.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    charSpan.style.position = "relative";
    charSpan.style.transition = "all 0.2s ease";
    charSpan.style.margin = "0 2px";
    letterContainer.appendChild(charSpan);
  });

  wordDisplay.appendChild(scanlines);
  wordDisplay.appendChild(letterContainer);

  const wordContainer = document.getElementById("wordContainer");
  wordContainer.appendChild(wordDisplay);

  // position the word display above the monster
  /*const monsterX = 0.18 * spriteAnimation.canvas.width;
  const monsterY = 1.18 * spriteAnimation.canvas.height;

  wordDisplay.style.left = `${monsterX}px`;
  wordDisplay.style.top = `${
    monsterY - spriteAnimation.spriteHeight * spriteAnimation.scale - 40
  }px`;
  */
}

function updateWordDisplay() {
  const spans = document.querySelectorAll("#wordDisplay span");
  spans.forEach((span, index) => {
    if (index < currentInputIndex) {
      // completed letters
      span.style.color = "#4a9668";
      span.style.textShadow = `
        2px 2px 0 #1d3b2a,
        -2px 2px 0 #1d3b2a,
        2px -2px 0 #1d3b2a,
        -2px -2px 0 #1d3b2a
      `;
      span.style.transform = "translateY(-2px)";
    } else {
      // pending letters
      span.style.color = "#ECD9B9";
      span.style.textShadow = `
        2px 2px 0 #000,
        -2px 2px 0 #000,
        2px -2px 0 #000,
        -2px -2px 0 #000
      `;
      span.style.transform = "none";
    }
  });
}

function showNewWord() {
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  createWordDisplay();
}

function handleKeyPress(event) {
  const pressedKey = event.key;
  if (pressedKey === currentWord[currentInputIndex]) {
    currentInputIndex++;
    updateWordDisplay();

    if (currentInputIndex === currentWord.length) {
      currentInputIndex = 0;
      wordsTyped++;
      player.changeState("attack");

      if (wordsTyped === words.length) {
        spriteAnimation.changeState("death");
        wordsTyped = 0;
        currentInputIndex = 0;
        currentWord = words[wordsTyped];
        resetWordContainer();
        return;
      } else {
        currentWord = words[wordsTyped];
        showNewWord();
      }
      spriteAnimation.changeState("hit");
    }
  }
}

function resetWordContainer() {
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
}

function ParallaxScene() {
  const canvas = document.getElementById("parallaxCanvas");
  const ctx = canvas.getContext("2d");

  let layers = [
    createParallaxLayer(
      "backgrounds/sky.png",
      0.2,
      canvas.width,
      canvas.height,
    ),
    createParallaxLayer(
      "backgrounds/graves.png",
      0.5,
      canvas.width,
      canvas.height,
    ),
    createParallaxLayer(
      "backgrounds/back_trees.png",
      1,
      canvas.width,
      canvas.height,
    ),
    createParallaxLayer("backgrounds/wall.png", 2, canvas.width, canvas.height),
    createParallaxLayer(
      "backgrounds/ground.png",
      4,
      canvas.width,
      canvas.height,
    ),
  ];

  player = createPlayerAnimation({
    canvas: canvas,
    scale: 6,
    character: currentPlayer,
  });

  spriteAnimation = createSpriteAnimation({
    canvas: canvas,
    scale: 5,
    monster: currentMonster,
    onStateChange: (newState) => {
      if (newState === "idle") {
        player.changeState("idle");
        layers.forEach((layer) => {
          layer.isMoving = false;
        });
      } else if (newState === "hidden") {
        player.changeState("walk");
        layers.forEach((layer) => {
          layer.isMoving = true;
        });
      }
    },
    onWalkComplete: createWordDisplay,
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    layers.forEach((layer) => {
      layer.canvasWidth = canvas.width;
      layer.canvasHeight = canvas.height;
      layer.x1 = 0;
      layer.x2 = canvas.width;
    });
  }

  function animate(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    layers.forEach((layer) => {
      layer.update();
      layer.draw(ctx);
    });
    player.update(currentTime);
    player.draw();

    spriteAnimation.update(currentTime);
    spriteAnimation.draw();

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(animate);
}

function createHPBar() {
  const hpContainer = document.createElement("div");
  hpContainer.id = "hpContainer";
  hpContainer.style.position = "absolute";
  hpContainer.style.top = "20px";
  hpContainer.style.left = "20px";
  hpContainer.style.fontFamily = "Alagard";

  const borderContainer = document.createElement("div");
  borderContainer.style.width = "300px";
  borderContainer.style.height = "36px";
  borderContainer.style.position = "relative";
  borderContainer.style.backgroundColor = "#27221b";
  borderContainer.style.padding = "3px";
  borderContainer.style.boxShadow = `
    0px 0px 0px 2px #3d3327,   /* Outer layer for the pixelated effect */
    -2px -2px 0px 2px #3d3327,
    2px -2px 0px 2px #3d3327,
    -2px 2px 0px 2px #3d3327,
    2px 2px 0px 2px #3d3327,
    -4px -4px 0px 2px #1c1714, /* Inner layer with darker shade */
    4px -4px 0px 2px #1c1714,
    -4px 4px 0px 2px #1c1714,
    4px 4px 0px 2px #1c1714
  `;

  const hpBar = document.createElement("div");
  hpBar.id = "hpBar";
  hpBar.style.width = "100%";
  hpBar.style.height = "100%";
  hpBar.style.backgroundColor = "#a82f2c";
  hpBar.style.transition = "width 0.3s ease-in-out";
  hpBar.style.position = "relative";
  hpBar.style.backgroundImage = `
    linear-gradient(
      to bottom,
      #ed4c4a 0%,
      #a82f2c 50%,
      #8b1916 100%
    )
  `;

  const scanlines = document.createElement("div");
  scanlines.style.position = "absolute";
  scanlines.style.top = "0";
  scanlines.style.left = "0";
  scanlines.style.width = "100%";
  scanlines.style.height = "100%";
  scanlines.style.backgroundImage = `
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 50%,
      transparent 100%
    )
  `;
  scanlines.style.backgroundSize = "100% 4px";
  scanlines.style.pointerEvents = "none";

  const hpValue = document.createElement("div");
  hpValue.id = "hpValue";
  hpValue.style.position = "absolute";
  hpValue.style.width = "100%";
  hpValue.style.textAlign = "center";
  hpValue.style.color = "#ECD9B9";
  hpValue.style.fontSize = "32px";
  hpValue.style.fontFamily = "Alagard";
  hpValue.style.lineHeight = "46px";
  hpValue.style.textShadow = "2px 2px 0 #000";
  hpValue.style.zIndex = "1";

  hpBar.appendChild(scanlines);
  borderContainer.appendChild(hpBar);
  hpContainer.appendChild(hpValue);
  hpContainer.appendChild(borderContainer);
  document.body.appendChild(hpContainer);

  return {
    updateHP: function (currentHP, maxHP = 100) {
      const percentage = (currentHP / maxHP) * 100;
      hpBar.style.width = `${percentage}%`;
      hpValue.textContent = `${currentHP}/${maxHP}`;

      // change color based on HP level
      if (percentage <= 20) {
        hpBar.style.backgroundImage = `
          linear-gradient(
            to bottom,
            #ff3838 0%,
            #d41f1f 50%,
            #8b1916 100%
          )
        `;
      } else if (percentage <= 50) {
        hpBar.style.backgroundImage = `
          linear-gradient(
            to bottom,
            #ffa439 0%,
            #d45e1f 50%,
            #8b3916 100%
          )
        `;
      } else {
        hpBar.style.backgroundImage = `
          linear-gradient(
            to bottom,
            #ed4c4a 0%,
            #a82f2c 50%,
            #8b1916 100%
          )
        `;
      }
    },
  };
}

document.addEventListener("DOMContentLoaded", () => {
  ParallaxScene();
  initiateAttackSequence();
  window.addEventListener("keypress", handleKeyPress);

  let currentHP = hp;
  Object.defineProperty(window, "hp", {
    get: function () {
      return currentHP;
    },
    set: function (value) {
      currentHP = Math.max(0, Math.min(value, 100));
      hpBar.updateHP(currentHP);
      return currentHP;
    },
  });

  hpBar.updateHP(hp);
});
