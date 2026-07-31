<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    // Read form data
    $name = $_POST['name'] ?? '';
    $department = $_POST['department'] ?? '';
    $company = $_POST['company'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $state = $_POST['state'] ?? '';
    $email = $_POST['email'] ?? '';
    $products = $_POST['products'] ?? [];
    $contactTime = $_POST['best_contact_time'] ?? '';
    $demoTime = $_POST['demo_time'] ?? '';
    $comments = $_POST['comments'] ?? '';

    $contactTimeFormatted = '';
    $demoTimeFormatted = '';

    if (!empty($contactTime)) {
        $contactTimeFormatted = (new DateTime($contactTime))
            ->format('m/d/Y h:i A');
    }

    if (!empty($demoTime)) {
        $demoTimeFormatted = (new DateTime($demoTime))
            ->format('m/d/Y h:i A');
    }

    // Load HTML template
    $template = file_get_contents('emailTemplate.html');

    // Replace placeholders
    $template = str_replace('{{name}}', htmlspecialchars($name), $template);
    $template = str_replace('{{company}}', htmlspecialchars($company), $template);
    $template = str_replace('{{phone}}', htmlspecialchars($phone), $template);
    $template = str_replace('{{state}}', htmlspecialchars($state), $template);
    $template = str_replace('{{email}}', htmlspecialchars($email), $template);
    $template = str_replace('{{department}}', htmlspecialchars($department), $template);
    $template = str_replace('{{products}}', htmlspecialchars(implode(', ', $products)), $template);
    $template = str_replace('{{best_contact_time}}', htmlspecialchars($contactTimeFormatted), $template);
    $template = str_replace('{{demo_time}}', htmlspecialchars($demoTimeFormatted), $template);
    $template = str_replace('{{comments}}', nl2br(htmlspecialchars($comments)), $template);

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
        $mail->setFrom('arbinbighero6@gmail.com', 'Website Demo Request');

        // Recipient
        $mail->addAddress('arbinbighero6@gmail.com');

        // Email
        $mail->isHTML(true);
        $mail->Subject = 'New Product Demo Request';
        $mail->Body = $template;

        $mail->send();

        echo json_encode([
            'status' => 'success',
            'message' => 'Your demo request has been submitted successfully.'
        ]);

    } catch (Exception $e) {

        echo json_encode([
            'status' => 'error',
            'message' => $mail->ErrorInfo
        ]);

    }

?>