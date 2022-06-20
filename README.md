<h2>Gruppe: Bottlenecks</h2>
Johannes Matus<br>
Eugen Kudraschow<br>
Daniel Vogel<br>
Dejan Fraas<br>
Sebastian Bär<br>
<br>
<h4>Sommersemester 2022</h4>
Hochschule Hof<br>
Praktikum SWE<br>
<br>
<h5>Projekt initialisieren/wichtige Kommandos:</h5>
(Composer und npm werden benötigt)
<br>
composer install<br>
copy .env.example to .env and change values<br>
php artisan key:generate<br>
php artisan migrate <br>
(php artisan db:seed)<br>
php artisan migrate:fresh --seed<br>


npm install<br>
npm run dev --> Laravel Mix compiles resources/js/app.js<br>

Während der Entwicklung:<br>
npm run watch (damit man nach jeder Änderung nicht npm run dev ausführen muss)<br>

php artisan serve --> (default port: 8000)<br>

    
 <h2>API-Dokumentation</h2>
 Die Endpoints der API sind im folgenden Dokument gesammelt:<br>
 https://docs.google.com/document/d/1jH1zM4QCywa6W4z18zDGRS3ocTh2uJP4FrJq91q7qUc/edit?usp=sharing
