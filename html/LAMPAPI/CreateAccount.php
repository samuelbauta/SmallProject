<?php
	$inData = getRequestInfo();
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		try {
			$stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
			$stmt->bind_param("ssss", $firstName,  $lastName,  $login, $password);
			if(!$stmt->execute()){
				throw new Exception($stmt->error);
			} else {
				$stmt->close();
				$conn->close();
				returnWithError("");
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
