<?php
 include "dbconfig.php";

 header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
 
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
 // Obtener el JSON recibido en la variable $Received_JSON.
 $Received_JSON = file_get_contents('php://input');
 
 // decodifica el JSON recibido y lo almacena en la variable $obj.
 $obj = json_decode($Received_JSON,true);
 
 // Rellena el nombre de usuario de la matriz JSON $ obj y almacénelo en la variable $ user_name.
 $user_NroPlaca = $obj['user_placa'];
 
 // Rellene el correo electrónico del usuario desde la matriz JSON $ obj y almacénelo en la variable $ user_email.
 $user_Marca = $obj['user_marca'];
 
 $user_Valor = $obj['user_valor'];
 
 $CheckSQL = "SELECT * FROM vehiculo WHERE Nroplaca='$user_NroPlaca'";
 
 $check = mysqli_fetch_array(mysqli_query($con,$CheckSQL));
 
if(isset($check))
{
 
	 $Duplicate_email = 'El Numero de placa ya existe, intente nuevamente con otra placa.';
	 
	 // Convirtiendo el mensaje a formato JSON.
	 $Duplicate_email_Json = json_encode($Duplicate_email);
	 
	 echo $Duplicate_email_Json ; 
 
 }
 else
 {
 
 	// Crear una consulta SQL e insertar el registro en la tabla de la base de datos MySQL si la dosis de correo electrónico no existe en la base de datos.
 	$Sql_Query = "insert into vehiculo (Nroplaca,Marca,Valor) values ('$user_NroPlaca','$user_Marca','$user_Valor')";
 
 
	 if(mysqli_query($con,$Sql_Query))
	 {
	 
		 $MSG = 'Vehiculo registrado correctamente...' ;
		 
		 // convirtiendo el mensaje en formato JSON.
		 $json = json_encode($MSG);
		 
		 echo $json ;
	 
	 }
	 else
	 {
	 
	 	echo 'Inténtelo de nuevo';
	 
	 }
	 }
 mysqli_close($con);
?>