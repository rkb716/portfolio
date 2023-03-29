<?php
    if(!empty($_POST)) {
        $name = $_POST['name'];
        $visitor_email = $_POST['e-mail'];
        $message = $_POST['message'];
        $email_body = "New message from $name e-mail: $visitor_email with message: $message";
        $headers = "From: ryankbillings@gmail.com";
        mail('ryankbillings@gmail.com', 'Portfolio Query', $email_body, $headers);
    }
?>