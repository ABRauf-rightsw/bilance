<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require 'PHPMailer/PHPMailerAutoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gamil.com';                // Set the SMTP server to send through (e.g., Gmail, SendGrid)
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'itsabdulrightsoft@gmail.com';           // SMTP username (your email address)
        $mail->Password = 'abdulrauf12345';               // SMTP password (your email password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;    // Enable TLS encryption
        $mail->Port = 587;                                    // TCP port to connect to

        // Recipients
        $mail->setFrom($email, $name);  // From: Contact form's sender
        $mail->addAddress('admin@bisonaliian.com', 'Admin');  // To: Your email address

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = "You have received a new booking request:<br><br>" .
                         "Name: $name<br>" .
                         "Email: $email<br>" .
                         "Message: $message<br>" .
                         "Date: $date<br>" .
                         "Time: $time";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Booking request sent successfully!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
}
?>
