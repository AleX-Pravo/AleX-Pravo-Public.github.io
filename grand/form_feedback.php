<?php
$requiredFields = ['user_name', 'comment'];
checkOrRedirect($requiredFields, 'http://' . $host . '/add-feedback.html');

$tpl = <<<EOL
Прізвище та ім'я: {user_name}
Коментар: {comment}
EOL;

$msg = fillTemplate(nl2br($tpl), $requiredFields);

$files = [];
if (is_uploaded('photo')) {
    $files['attachment'] = [
        $_FILES['photo']['name'] => $_FILES['photo']['tmp_name'],
    ];
}

$subject = 'Новий відгук';
send_mail($config['email']['noreply'], $config['email']['feedback'], $subject, $msg, $files);

header('Location: http://' . $host . '/add-feedback-success.html');
die('');