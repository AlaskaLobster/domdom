<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\HocSinh; // Import the HocSinh model
use App\Models\Teacher; // Import the Teacher model

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Create 100 students
        HocSinh::factory()->count(100)->create();

        // Create 100 teachers
        Teacher::factory()->count(100)->create();

        // Optionally, you can seed a test user
        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }
    }
}
