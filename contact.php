<?php
// Configuration des en-têtes pour éviter les problèmes de caractères
header('Content-Type: text/html; charset=utf-8');

// Récupération des données du formulaire
$nom = $_POST['nom'] ?? '';
$email = $_POST['email'] ?? '';
$telephone = $_POST['telephone'] ?? '';
$buildingType = $_POST['buildingType'] ?? '';
$surface = $_POST['surface'] ?? '';
$message = $_POST['message'] ?? '';
$estimatedPrice = $_POST['estimatedPrice'] ?? '';

// Validation des données
if (empty($nom) || empty($email) || empty($telephone) || empty($message) || empty($buildingType) || empty($surface)) {
    header('Location: contact.html?error=1');
    exit;
}

// Configuration de l'email
$to = "info@hmkenergy.be"; // Votre adresse email
$subject = "Nouvelle demande de contact - HMK ENERGY";

// Corps du message
$email_content = "Nouvelle demande de contact :\n\n";
$email_content .= "Nom : " . $nom . "\n";
$email_content .= "Email : " . $email . "\n";
$email_content .= "Téléphone : " . $telephone . "\n";
$email_content .= "Type de bâtiment : " . $buildingType . "\n";
$email_content .= "Surface : " . $surface . "\n";
$email_content .= "Prix estimé : " . $estimatedPrice . "\n\n";
$email_content .= "Message :\n" . $message . "\n";

// En-têtes de l'email
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Envoi de l'email
if (mail($to, $subject, $email_content, $headers)) {
    // Redirection vers la page de remerciement
    header('Location: merci.html');
} else {
    // En cas d'erreur
    header('Location: contact.html?error=2');
}
?> 