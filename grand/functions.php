<?php
function fix_email_address($email)
{
    $email = str_replace(array('&lt;', '&gt;'), array('<', '>'), $email);
    if ($email and $a = strpos($email, '<') and strpos($email, '>', $a)) $email = "=?utf-8?B?" . base64_encode(trim(substr($email, 0, $a))) . "?= " . trim(substr($email, $a));
    return $email;
}


function send_mail($from, $to, $subject, $message, $files = array(), $options = array())
{
    $rn = chr(10);
    $boundary = '=' . md5(uniqid(time()));

    if (is_string($message)) $message = array(array('message' => $message, 'type' => 'html'));

    $body = '';
    for ($i = 0, $n = sizeof($message); $i < $n; $i++) {
        $body .=
            $rn . '--' . $boundary . $rn .
            'Content-Type: text/' . ($message[$i]['type']) . '; charset="utf-8";' . $rn .
            'Content-Transfer-Encoding: base64' . $rn .
            $rn . chunk_split(base64_encode($message[$i]['message'])) . $rn;
    }

    if (isset($files['attachment']) && sizeof($files['attachment'])) {
        foreach ($files['attachment'] as $name => $file) {
            if (is_readable($file) and $data = @file_get_contents($file)) {
                $body .=
                    '--' . $boundary . $rn .
                    'Content-Type: application/octet-stream; name="' . $name . '"' . $rn .
                    'Content-Disposition: attachment; filename="' . $name . '"' . $rn .
                    'Content-Transfer-Encoding: base64' . $rn . $rn .
                    chunk_split(base64_encode($data)) . $rn;
            }
        }
    }

    if (isset($files['img']) && sizeof($files['img'])) {
        foreach ($files['img'] as $key => $file) {
            if (is_readable($file) and $data = @file_get_contents($file)) {
                $info = getimagesize($file);
                if (!empty($info['mime']) && !empty($info[0]) && !empty($info[1])) {
                    $body .=
                        '--' . $boundary . $rn .
                        'Content-Type: ' . $info['mime'] . '; name="' . basename($file) . '"' . $rn .
                        'Content-Transfer-Encoding: base64' . $rn .
                        'Content-ID: <' . $key . '>' . $rn . $rn .
                        chunk_split(base64_encode($data)) . $rn;
                }
            }
        }
    }

    $body .= $rn;

    $headers =
        'From: ' . fix_email_address($from) . $rn .
        'MIME-Version: 1.0' . $rn .
        'Content-Type: multipart/' . (sizeof($message) > 1 ? 'alternative' : 'related') . '; boundary="' . $boundary . '"' . $rn .
        (sizeof($options) ? implode($rn, $options) : '');

    $subject = '=?utf-8?B?' . base64_encode($subject) . '?=';

    for ($i = 0, $to = explode(',', $to), $n = sizeof($to); $i < $n; $i++) {
        mail(fix_email_address($to[$i]), $subject, $body, $headers, '-f ' . ini_get('sendmail_from'));
    }

    return 1;
}


function out_text($x)
{
    if(is_string($x)) {
        return htmlentities($x, ENT_QUOTES);
    }

    return $x;
}



function get_host($u)
{
    $u = parse_url(trim($u));
    return preg_replace("/^www\./", "", trim($u['host'] ? $u['host'] : @array_shift(explode('/', $u['path'], 2))));
}


    function is_uploaded($name, $i = '')
    {
        return is_uploaded_file(!$i && is_array($_FILES[$name]['tmp_name']) && sizeof($_FILES[$name]['tmp_name']) ? $_FILES[$name]['tmp_name'][0] : ($i != '' ? $_FILES[$name]['tmp_name'][$i] : $_FILES[$name]['tmp_name']));
    }
    
function checkOrRedirect($fields, $redirectUrl) {
    foreach ($fields as $field) {
        if (empty($_POST[$field])) {
            header('Location: ' . $redirectUrl);
            die();
        }
    }
}

function fillTemplate($msg, $fields) {
    foreach ($fields as $field) {
        $post_field = is_array($_POST[$field]) ? implode($_POST[$field], ',') : $_POST[$field];
        $msg = str_replace('{' . $field . '}', $post_field ?? '-', $msg);
    }
    
    return $msg;
}