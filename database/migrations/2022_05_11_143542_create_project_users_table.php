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
        Schema::create('project_users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Foreign keys
            $table->foreignIdFor(\App\Models\User::class)->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->foreignIdFor(\App\Models\Project::class)->nullable()->constrained()->onDelete('cascade')->onUpdate('cascade');

            // Columns
            $table->boolean('can_create_tasks')->default(false);
            $table->boolean('can_edit_tasks')->default(false);
            $table->boolean('can_create_announcements')->default(false);
            $table->boolean('can_create_tags')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_members');
    }
};
