<?php
	$inData = getRequestInfo();
	
	$search = "%" . $inData["search"] . "%";
	$userId = $inData["userID"];
    $offset = $inData["offset"];
    $count = $inData["count"];

    $results = array();

	$searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error ) {
		returnWithError( $conn->connect_error );
	} else {
		try {
        	$stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone, ID FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ? AND UserID=? LIMIT ?,?");
        	$stmt->bind_param("ssssiii", $search, $search, $search, $search, $userId, $offset, $count);
        	if(!$stmt->execute()) {
				throw new Exception($stmt->error);
			} else {
        		$result = $stmt->get_result();

        		while($row = $result->fetch_assoc()) {
					$searchCount++;
					$results[] = array("firstName" => $row["FirstName"], "lastName" => $row["LastName"], "email" => $row["Email"], "phone" => $row["Phone"], "ID" => $row["ID"]);
				}

        		if ( $searchCount == 0 ) {
					returnWithError( "No Records Found" );
				} else {
					returnWithInfo( $results );
				}
			
        		$stmt->close();
				$conn->close();
			}
		} catch (Exception $e) {
			returnWithError($e->getMessaage());
		}
    }

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo json_encode($obj);
	}
	
	function returnWithError( $err )
	{
		$retValue = array("error" => $err);
		sendResultInfoAsJson( $retValue );
	}

    function returnWithInfo( $results )
	{
		$retValue = array("results" => $results, "error" => "");
		sendResultInfoAsJson( $retValue );
	}
	
?>
