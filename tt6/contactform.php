<?php 
$to = '';
$subject = 'Message from Contact Demo ';
$body = filter_var($_POST['Message'], FILTER_SANITIZE_STRING);
if (mail ($to, $subject, $body)) {
echo "sent";
} else {
echo "fail";
}
?>
