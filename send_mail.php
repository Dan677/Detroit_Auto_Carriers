<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Adresa unde vrei să primești mailul
    $to = "adresa_ta@mail.com";  

    // Preluăm și curățăm datele din formular
    $email   = htmlspecialchars($_POST['email']);
    $phone   = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $speed   = htmlspecialchars($_POST['speed']);
    $message = htmlspecialchars($_POST['message']);

    // Subiectul emailului
    $subject = "New Service Request from $email";

    // Conținutul emailului
    $body = "
You have received a new request:\n\n
Email: $email\n
Phone: $phone\n
Service: $service\n
Speed: $speed\n
Message:\n$message
";

    // Header (cine a trimis)
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Trimiterea emailului
    if (mail($to, $subject, $body, $headers)) {
        echo "✅ Thank you! Your request has been sent.";
    } else {
        echo "❌ Sorry, there was an error sending your request.";
    }
}