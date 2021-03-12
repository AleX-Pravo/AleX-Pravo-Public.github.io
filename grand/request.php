<?php
define('DEFAULT_CHARSET', 'utf-8');
ini_set('default_charset', DEFAULT_CHARSET);
mb_internal_encoding(DEFAULT_CHARSET);

error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);
date_default_timezone_set("Europe/Kiev");

$config = include_once('config.php');
include_once('functions.php');

ini_set('sendmail_from', $config['email']['noreply']);
$host = $_SERVER['HTTP_HOST'];

$types = ['feedback', 'signup', 'feedback_ru', 'signup_ru', 'signup_index', 'signup_index_ru'];
if (isset($_POST['type']) && in_array($_POST['type'], $types, true)) {
    $_POST = array_map('out_text', $_POST);
    include_once(sprintf('form_%s.php', $_POST['type']));
}
