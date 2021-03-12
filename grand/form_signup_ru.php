<?php
//$requiredFields = ['user_name', 'city', 'school', 'class_number', 'class_letter', 'phone_mother', 'phone_user', 'day'];
$requiredFields = ['user_name', 'phone_mother'];
$otherFields = [];
checkOrRedirect($requiredFields, 'http://' . $host . '/sign-up-ru.html');

// Variables for SMS-gateway
$sms = 'Ваши данные принято. В ближайшее время наш менеджер свяжется с Вами, чтобы подобрать для Вас расписание.';
$sms_phone = $_POST['phone_mother'];

// Add SMS-gateway lib
require_once 'smsc_api.php';

// Sending SMS
list($sms_id, $sms_cnt, $cost, $balance) = send_sms($sms_phone, $sms);
if (!isset($cost)) {
/*    echo('Error from SMS-gateway !!!! >>>' . $sms_phone);
	die('');*/
}

/*
$tpl = <<<EOL
Прізвище, ім'я, по батькові учня: {user_name}
Місто: {city}
Школа: {school}
Клас: {class_number}
Буква: {class_letter}
Телефони: м{phone_mother}, о{phone_user}
Бажані дні: {day}
EOL;
*/

$tpl = <<<EOL
Прізвище, ім'я, по батькові учня: {user_name}
Телефони: м{phone_mother}
EOL;

$msg = fillTemplate(nl2br($tpl), array_merge($requiredFields, $otherFields));

$subject = 'Анкета запису на курси';
send_mail($config['email']['noreply'], $config['email']['signup'], $subject, $msg);
require_once "1c_new_student.php";
header('Location: http://' . $host . '/sign-up-success-ru.html');
die('');