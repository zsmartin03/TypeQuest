<?php
include('db.php');
session_start();

$stmt = $pdo->query("
    SELECT users.username, scores.score, scores.create_at 
    FROM scores 
    JOIN users ON scores.user_id = users.id 
    ORDER BY scores.score DESC 
    LIMIT 10
");
$scores = $stmt->fetchAll(PDO::FETCH_ASSOC);


$error_message = isset($_GET['error']) ? $_GET['error'] : null;
$show_register = in_array($error_message, ['passwords_dont_match', 'username_taken', 'registration_failed']);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TypeQuest</title>
    <link href="styles.css" rel="stylesheet" />
    <link href="https://db.onlinewebfonts.com/c/6faad1789bcbd321a458c14d0735d976?family=Alagard" rel="stylesheet" />
</head>

<body>
    <div class="header">
        <div class="username-display">
            <?php if (isset($_SESSION['username'])): ?>
                <span class="username-text">Player: <?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <form method="post" action="logout.php">
                    <button type="submit" id="logout-btn">Logout</button>
                </form>
            <?php endif; ?>
        </div>

    </div>
    <div class="container">
        <h1 class="title">TypeQuest</h1>
        <div id="play-btn">PLAY</div>
        <div class="scoreboard">
            <h2>High Scores</h2>
            <table class="score-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="scoreTableBody">
                    <?php foreach ($scores as $index => $score): ?>
                        <tr>
                            <td><?php echo $index + 1; ?></td>
                            <td><?php echo htmlspecialchars($score['username']); ?></td>
                            <td><?php echo $score['score']; ?></td>
                            <td><?php echo date('Y-m-d', strtotime($score['create_at'])); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    <div id="authModal" class="modal" style="display: <?php echo isset($_SESSION['username']) ? 'none' : 'flex'; ?>;">
        <div class="modal-content">
            <div id="loginForm" style="display: <?php echo $show_register ? 'none' : 'block'; ?>">
                <h2>Login</h2>
                <form method="post" action="auth.php">
                    <input type="hidden" name="action" value="login">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <?php if ($error_message === 'invalid_credentials'): ?>
                        <div style="color: red; margin-top: 10px;">Invalid username or password.</div>
                    <?php elseif ($error_message === 'login_failed'): ?>
                        <div style="color: red; margin-top: 10px;">Login failed, please try again.</div>
                    <?php endif; ?>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <br />
                <p>Don't have an account? <a href="#" id="showRegister">Register</a></p>
            </div>
            <div id="registerForm" style="display: <?php echo $show_register ? 'block' : 'none'; ?>">
                <h2>Register</h2>
                <form method="post" action="auth.php">
                    <input type="hidden" name="action" value="register">
                    <input type="text" name="username" placeholder="Username" required>
                    <br />
                    <input type="password" name="password" placeholder="Password" required>
                    <input type="password" name="confirm_password" placeholder="Confirm Password" required>
                    <?php if ($error_message === 'passwords_dont_match'): ?>
                        <div style="color: red; margin-top: 10px;">Passwords do not match.</div>
                    <?php elseif ($error_message === 'username_taken'): ?>
                        <div style="color: red; margin-top: 10px;">Username is already taken.</div>
                    <?php elseif ($error_message === 'registration_failed'): ?>
                        <div style="color: red; margin-top: 10px;">Registration failed, please try again later.</div>
                    <?php endif; ?>
                    <br />
                    <button type="submit">Register</button>
                </form>
                <br />
                <p>Already have an account? <a href="#" id="showLogin">Login</a></p>
            </div>
        </div>

    </div> <a href="https://github.com/zsmartin03/TypeQuest" class="github-link">GitHub</a>
    <script src="script.js"></script>
</body>

</html>