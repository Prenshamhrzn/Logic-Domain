<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$email = trim($_POST['email'] ?? '');

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide a valid email address.'
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    $mail->Username = 'arbinbighero6@gmail.com';
        $mail->Password = 'hprpxahbchrgzssv';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Sender
    $mail->setFrom(
        'your-email@gmail.com',
        'Logic Domain Newsletter'
    );

    // Send notification to yourself
    $mail->addAddress('arbinbighero6@gmail.com');

    // Email
    $mail->isHTML(true);
    $mail->Subject = 'Logic Domain Newsletter';

    $mail->Body = htmlspecialchars($email) . ' has signed up for the newsletter.';

    $mail->send();

    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you for subscribing to our newsletter.'
    ]);

} catch (Exception $e) {

    echo json_encode([
        'status' => 'error',
        'message' => $mail->ErrorInfo
    ]);
}
?>