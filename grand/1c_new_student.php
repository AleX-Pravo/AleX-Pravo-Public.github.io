<?php
    $endpoint = 'http://95.216.231.169:38572/base/hs/services/student';
    $headers = array(
        'Content-Type:application/json',
        'Authorization: Basic d2ViOk1odDRoSzI4'
    );

    $log = true;

    //$payload = $_POST;
    $json_array = [
        'name' => $_POST['user_name'],
        'city' => '',//$_POST['city'],
        'school' => '',//$_POST['school'],
        'class' => '',//$_POST['class_number'],
        'label' => '',//$_POST['class_letter'],
        'phone_mother' => $_POST['phone_mother'],
        'phone_student' => '',//$_POST['phone_user'],
    ];
	
	$days = [];
	
	/*
    
    foreach($_POST['day'] as $day){
        $days[]['day'] = $day;
    }
	*/
	
    $json_array['days'] = $days;
	
    $payload = json_encode($json_array, JSON_UNESCAPED_UNICODE);
    $payload = '['.$payload.']';
    //print_r($payload); exit;

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    //curl_setopt($ch, CURLOPT_HEADER, 1);
    //curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);

    if($log){
        ob_start();
            $date = date('Y-m-d H:i:s');
            echo "\n\n ========= $date =========== \n\n";
            print_r($payload);
            echo "\n\n";
            print_r(json_decode($payload));            
            print_r($response);
            echo "\n\n ===================== \n\n";
        $data = ob_get_clean();
        file_put_contents('1c.log', $data, FILE_APPEND);
    }