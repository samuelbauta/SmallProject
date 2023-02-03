<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phone = $inData["phone"];
    $userID = $inData["userID"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		try {
			$stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, Phone, UserID) VALUES (?, ?, ?, ?, ?)");
			$stmt->bind_param("ssssi", $firstName, $lastName, $email, $phone, $userID);
			if (!$stmt->execute()) {
				throw new Exception($stmt->error);
			} else {
				$autonumber = $conn->insert_id;
				$stmt->close();
				$conn->close();
				$retValue = '{"contactID":' . $autonumber . '}';
				sendResultInfoAsJson( $retValue );
				return;
			}
			} catch (Exception $e) {
				returnWithError($e->getMessage());
			}

    }

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
