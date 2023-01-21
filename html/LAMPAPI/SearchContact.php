<?php
	$inData = getRequestInfo();
	
	$search = "%" . $inData["search"] . "%";
	$userId = $inData["userID"];
    $offset = $inData["offset"];
    $count = $inData["count"];

    $results = array();

	$searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone, ID FROM Contacts WHERE FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ? AND UserID=? LIMIT ?,?");
        $stmt->bind_param("ssssiii", $search, $search, $search, $search, $userId, $offset, $count);
        $stmt->execute();
        $result = $stmt->get_result();

        while($row = $result->fetch_assoc())
		{
			$searchCount++;
			$results[] = array("FirstName" => $row["FirstName"], "LastName" => $row["LastName"], "Email" => $row["Email"], "Phone" => $row["Phone"], "ID" => $row["ID"]);
		}

        if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $results );
		}
        
        $stmt->close();
		$conn->close();
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
