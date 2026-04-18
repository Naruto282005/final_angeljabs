<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'sabillano057@gmail.com'],
            [
                'name' => 'admin',
                'password' => Hash::make('sabillano2023'),
                'is_admin' => 1,
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            ProductSeeder::class,
        ]);
    }
}
