<?php

require 'vendor/autoload.php'; // Composer سے انسٹال کی گئی لائبریری لوڈ کریں

use SendGrid\Mail\Mail;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "<pre>";
    print_r($_POST); // Check payload
    echo "</pre>";
} else {
    die("No POST data received.");
}
// SendGrid API Key

$email = new Mail();
$email->setFrom($_POST['email'], $_POST['name']); // 
$email->setSubject($_POST['subject']); //
$email->addTo('contact@example.com'); // 
$email->addContent("text/plain", $_POST['message']); // 
$email->addContent("text/html", "<p>" . nl2br($_POST['message']) . "</p>"); // 

$sendgrid = new \SendGrid($apiKey);

try {
    $response = $sendgrid->send($email);
    echo "Message sent successfully!";
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
?>
