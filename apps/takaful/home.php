<?php
require  "./vendor/autoload.php";
require  "./vendor/db/Database.php";

$base_uri ='https://paywithspectaapi.sterling.ng';
$url = "/api/Purchase/CreatePaymentUrl";
try{
$client = new \GuzzleHttp\Client([ 'base_uri' => $base_uri ]);
$response = $client->request('POST', $url, [
    "headers" => [
        "x-ApiKey" => "TEST_API_KEY",
    ],
    'json' => [
       'callBackUrl' => 'http://localhost/takaful/specta-callback.php',
       'reference' => 'ref',
	    "merchantId"=> "275659",
	    "description"=> "ABC",
	    "amount"=> "20000"
    ]
]);

if (200 == $response->getStatusCode()) {
        $response = $response->getBody();
        $arr_result = json_decode($response);
        echo($arr_result->result);
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
?>