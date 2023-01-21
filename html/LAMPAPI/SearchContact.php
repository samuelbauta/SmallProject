<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phone = $inData["phone"];
	$userId = $inData["userID"];
    $lowerLim = $inData["lowerLim"];
    $upperLim = $inData["upperLim"];

    $fNameArr = "";
    $lNameArr = "";
    $emailArr = "";
    $phoneArr = "";
    $IDArr = "";

	$searchCount = 0;

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
        $stmt = $conn->prepare("SELECT FirstName, LastName, Email, Phone, ID FROM Contacts WHERE FirstName LIKE ? AND LastName LIKE ? AND Email LIKE ? AND Phone LIKE ? AND UserID=? LIMIT ?,?");
        $stmt->bind_param("ssssiii", $firstName, $lastName, $email, $phone, $userId, $lowerLim, $upperLim);
        $stmt->execute();
        $result = $stmt->get_result();

        while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
                $fNameArr .= ",";
                $lNameArr .= ",";
                $emailArr .= ",";
                $phoneArr .= ",";
                $IDArr .= ",";
			}
			$searchCount++;

            $fNameArr .= '"' . $row["FirstName"] . '"';
			$lNameArr .= '"' . $row["LastName"] . '"';
            $emailArr .= '"' . $row["Email"] . '"';
            $phoneArr .= '"' . $row["Phone"]. '"';
            $IDArr .= $row["ID"];
		}

        if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}

		else
		{
			returnWithInfo( $fNameArr, $lNameArr, $emailArr, $phoneArr, $IDArr);
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
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithInfo( $fNameArr, $lNameArr, $emailArr, $phoneArr, $IDArr)
	{
		$retValue = '{"firstName":[' . $fNameArr . '], "lastName":[' . $lNameArr . '], "email":[' . $emailArr . '], "phone":[' . $phoneArr . '], "ID":[' . $IDArr . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
