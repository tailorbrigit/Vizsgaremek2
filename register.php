<?php
    session_start();
    $name = "";
    $email = "";
    $password = "";
    $confirm_password = "";

    $error = array(); 

    if(isset($_POST['submit'])){
        require_once 'php/server.php';


        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $name = ($_POST['name']);
        $email = ($_POST['email']);
        $password = ($_POST['password']);
        $confirm_password = ($_POST['confirm_password']);

        if ($password != $confirm_password) {
            array_push($error,"A két jelszó nem egyezik meg!\n");
        }

        //Multiuser kiszűrése 
	    $user_check_query = "SELECT * FROM users WHERE email='$email' OR name='$name' LIMIT 1";
	    $result = mysqli_query($db, $user_check_query);
	    $user = mysqli_fetch_assoc($result);
  
        //Szűrés kezelése
		if ($user['name'] == $name) {
			array_push($error,"Ez a Név már létezik!\n");
        }

		if ($user['email'] == $email) {
			array_push($error,"Ez az E-mail cím már létezik!");
		}

        if (count($error) == 0) {	
            $hashpass = password_hash($password,PASSWORD_DEFAULT);//jelszó kódolása
            $insert = "INSERT INTO users (`name`, `email`, `password`) VALUES ('$name', '$email', '$hashpass')";
            mysqli_query($db, $insert);
		    $_SESSION['name'] = $name;

            header('location: index.html');
        }
        
        else {
            echo '<script>alert('.json_encode($error).'); window.location.href = "register.html";</script>';
            exit();
        }
        }
    }
?>