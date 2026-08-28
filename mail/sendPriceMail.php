<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

header('Content-Type: application/json');


// ==========================================
// READ FORM DATA
// ==========================================

$name         = trim($_POST['contact_name'] ?? '');
$company         = trim($_POST['corganization_name'] ?? '');
$phone         = trim($_POST['phone'] ?? '');
$organizations = $_POST['org'] ?? [];
$sizeOrg       = trim($_POST['size_org'] ?? '');
$noOrg         = trim($_POST['no_org'] ?? '');
$prod        = trim($_POST['prod'] ?? '');
$email         = trim($_POST['email'] ?? '');
$comments      = trim($_POST['comments'] ?? '');


// Make sure org is always an array
if (!is_array($organizations)) {
    $organizations = [$organizations];
}


// ==========================================
// BASIC SERVER-SIDE VALIDATION
// ==========================================

if (empty($organizations)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please select at least one organization type.'
    ]);
    exit;
}


if ($name === '') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter your name.'
    ]);
    exit;
}


if ($company === '') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter a company name.'
    ]);
    exit;
}


if ($prod === '') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter your average annual capital projects.'
    ]);
    exit;
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}



// ==========================================
// SANITIZE DATA FOR EMAIL
// ==========================================

$organizationsHtml = htmlspecialchars(
    implode(', ', $organizations),
    ENT_QUOTES,
    'UTF-8'
);

$sizeOrgHtml = htmlspecialchars(
    $sizeOrg,
    ENT_QUOTES,
    'UTF-8'
);

$noOrgHtml = htmlspecialchars(
    $noOrg,
    ENT_QUOTES,
    'UTF-8'
);

$prodHtml = htmlspecialchars(
    $prod,
    ENT_QUOTES,
    'UTF-8'
);

$emailHtml = htmlspecialchars(
    $email,
    ENT_QUOTES,
    'UTF-8'
);

$nameHtml = htmlspecialchars(
    $name,
    ENT_QUOTES,
    'UTF-8'
);
$phoneHtml = htmlspecialchars(
    $phone,
    ENT_QUOTES,
    'UTF-8'
);
$companyHtml = htmlspecialchars(
    $company,
    ENT_QUOTES,
    'UTF-8'
);

$commentsHtml = nl2br(
    htmlspecialchars(
        $comments,
        ENT_QUOTES,
        'UTF-8'
    )
);


// ==========================================
// LOAD EMAIL TEMPLATE
// ==========================================

$template = file_get_contents('emailPriceTemplate.html');

if ($template === false) {

    echo json_encode([
        'status' => 'error',
        'message' => 'Unable to load email template.'
    ]);

    exit;
}



    $template = str_replace('{{organizations}}',$organizationsHtml,$template);

    $template = str_replace('{{name}}',$nameHtml,$template);
    $template = str_replace('{{phone}}',$phoneHtml,$template);
    $template = str_replace('{{company}}',$companyHtml,$template);
    $template = str_replace('{{size_org}}',$sizeOrgHtml,$template);

    $template = str_replace(
        '{{no_org}}',
        $noOrgHtml,
        $template
    );

    $template = str_replace(
        '{{avg_cap}}',
        $prodHtml,
        $template
    );

    $template = str_replace(
        '{{email}}',
        $emailHtml,
        $template
    );

    $template = str_replace(
        '{{comments}}',
        $commentsHtml,
        $template
    );

    $mail = new PHPMailer(true);

    try {

        // SMTP
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
        $mail->Subject = 'New Quote Request';
        $mail->Body = $template;


        // Send
        $mail->send();


        echo json_encode([
            'status' => 'success',
            'message' => 'Thank you for contacting us.<br> A member of our team will get in touch with you within 24 hours on the next business day.'
        ]);
    } catch (Exception $e) {

        echo json_encode([
            'status' => 'error',
            'message' => 'Unable to send your request. Please try again later.'
        ]);
    }
?>
