<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$org = $_POST['organization'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$text = $_POST['text'];

if ($_POST['audit'] === 'on') $audit = 'Аудит';
if ($_POST['assessment'] === 'on') $assessment = 'Оценка';
if ($_POST['outsource'] === 'on') $outsource = 'Аутсорсинг';
if ($_POST['learn'] === 'on') $learn = 'Обучение';
if ($_POST['consult'] === 'on') $consult = 'Консалтинг';
if ($_POST['other'] === 'on') $other = 'Прочее';

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
	$msg = "ok";
	$mail->isSMTP();
	$mail->CharSet = "UTF-8";
	$mail->SMTPAuth   = true;

	// Настройки вашей почты
	$mail->Host       = 'smtp.mail.ru'; // SMTP сервера GMAIL
	$mail->Username   = 'test@bsnsweb.ru'; // Логин на почте
	$mail->Password   = 'D7W6oFk@Ttam'; // Пароль на почте
	$mail->SMTPSecure = 'ssl';
	$mail->Port       = 465;
	$mail->setFrom('test@bsnsweb.ru', 'test'); // Адрес самой почты и имя отправителя

	// Получатель письма
	$mail->addAddress('latypov199619@gmail.com');
	// $mail->addAddress('youremail@gmail.com'); // Ещё один, если нужен

	// Прикрипление файлов к письму
	if (!empty($_FILES['myfile']['name'][0])) {
		for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
			$uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
			$filename = $_FILES['myfile']['name'][$ct];
			if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
				$mail->addAttachment($uploadfile, $filename);
			} else {
				$msg .= 'Неудалось прикрепить файл ' . $uploadfile;
			}
		}
	}

	// -----------------------
	// Само письмо
	// -----------------------
	$mail->isHTML(true);

	$mail->Subject = 'Запрос КП с сайта Sova';
	$mail->Body    = "<b>Имя:</b> $name <br><br>
        <b>Организация:</b> $org<br><br>
        <b>Телефон:</b> $tel<br><br>
        <b>Почта:</b> $email<br><br>
				<b>Интересующие услуги:</b> $audit $assessment $outsource $learn $consult $other<br><br>
        <b>Сообщение:</b><br>$text";


	// Проверяем отравленность сообщения
	if ($mail->send()) {
		echo "$msg";
	} else {
		echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
	}
} catch (Exception $e) {
	echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
