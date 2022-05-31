Gruppe: Bottlenecks
Johannes Matus
Eugen Kudraschow
Daniel Vogel

Sommersemester 2022
Hochschule Hof
Praktikum SWE

Wichtige Commands:

composer install
copy .env.example to .env and change values
php artisan key:generate
php artisan migrate 
(php artisan db:seed)
php artisan migrate:fresh --seed


npm install
npm run dev --> Laravel Mix compiles resources/js/app.js

Während der Entwicklung:
npm run watch (damit man nach jeder Änderung nicht npm run dev ausführen muss)

php artisan serve --> (default port: 8000)


Vendor Extraction:

In webpack.mix.js :
.extract(['react']) hinzufügen
In welcome.blade.php hinzufügen:
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>