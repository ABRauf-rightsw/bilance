<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data.
    $name = isset($_POST['name']) ? $_POST['name'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $subject = isset($_POST['subject']) ? $_POST['subject'] : "No subject";
    $message = isset($_POST['message']) ? $_POST['message'] : "";
    $date = isset($_POST['date']) ? $_POST['date'] : "";
    $time = isset($_POST['time']) ? $_POST['time'] : "";

 
    echo "<pre>Debug Data:\n";
    print_r($_POST); 
    echo "</pre>";

    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Date: $date at $time\n";
    $email_body .= "Message: $message\n";

    echo "<pre>Email Body:\n$email_body</pre>";


    $to = "itsabdulrauf@gmail.com";


    $headers = "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

   
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(array("status" => "success", "message" => "Email sent successfully."));
    } else {
        echo json_encode(array("status" => "error", "message" => "Failed to send email."));
    }
} else {

    echo json_encode(array("status" => "error", "message" => "Invalid request."));
}
?>
