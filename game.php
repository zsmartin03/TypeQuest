<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeQuest</title>
    <link href="gameStyles.css" rel="stylesheet" />
    <link
      href="https://db.onlinewebfonts.com/c/6faad1789bcbd321a458c14d0735d976?family=Alagard"
      rel="stylesheet"
    />
  </head>
  <body>
    <canvas id="parallaxCanvas"></canvas>
    <div id="hpContainer">
      <div id="borderContainer">
        <div id="hpValue"></div>
        <div id="hpBar">
          <div class="scanlines"></div>
        </div>
      </div>
    </div>
    <div id="wordContainer"></div>
    <div id="pointsContainer">
      <div id="pointsBorderContainer">
        <div id="pointsValue">Points: 0</div>
        <div class="scanlines"></div>
      </div>
    </div>

    
    <input type="hidden" id="userId" value="<?php echo $_SESSION['user_id']; ?>">
    <script>
    async function saveScore(score) {
        try {
            const response = await fetch('save_score.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    score: score
                })
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to save score');
            }
            return data;
        } catch (error) {
            console.error('Error saving score:', error);
            return null;
        }
    }
    </script>
    <script src="gameScript.js"></script>
  </body>
</html>
