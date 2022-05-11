<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(\App\Models\Room::class)->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(\App\Models\User::class)->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');

            $table->date('reservation_date');
            $table->time('start_time')->default(now())->nullable();
            $table->time('end_time')->default(now())->nullable();
            $table->boolean('is_confirmed')->default(false);
            $table->boolean('is_cancelled')->default(false);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookings');
    }
};
