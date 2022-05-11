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
        Schema::create('project_invites', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(\App\Models\Project::class)->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('invitor_user_id')->nullable();
            $table->foreign('invitor_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('invited_user_id')->nullable();
            $table->foreign('invited_user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->string('subject')->nullable();
            $table->string('message')->nullable();
            $table->boolean('accepted')->default(false);
            $table->boolean('declined')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_invites');
    }
};
