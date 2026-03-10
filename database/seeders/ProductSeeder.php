<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::truncate();

        Product::insert([
            [
                'name' => 'Benguet Single Origin',
                'category' => 'Single Origin',
                'origin' => 'Benguet, PH',
                'description' => 'Bright acidity with citrus notes.',
                'price' => 250,
                'stock' => 30,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bukidnon Single Origin',
                'category' => 'Single Origin',
                'origin' => 'Bukidnon, PH',
                'description' => 'Chocolatey and smooth body.',
                'price' => 260,
                'stock' => 20,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'House Blend (Daily Brew)',
                'category' => 'Blends',
                'origin' => 'Roaster Blend',
                'description' => 'Balanced, great for everyday coffee.',
                'price' => 240,
                'stock' => 40,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Espresso Blend (Dark)',
                'category' => 'Blends',
                'origin' => 'Roaster Blend',
                'description' => 'Strong and bold for espresso.',
                'price' => 270,
                'stock' => 25,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Decaf Medium Roast',
                'category' => 'Decaf',
                'origin' => 'Colombia (Decaf)',
                'description' => 'Smooth coffee without caffeine.',
                'price' => 280,
                'stock' => 15,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}