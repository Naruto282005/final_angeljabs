<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->delete();

        Product::insert([
            [
                'name' => 'Benguet Single Origin',
                'category' => 'Single Origin',
                'origin' => 'Benguet, PH',
                'description' => 'Bright acidity with citrus notes.',
                'price' => 250,
                'stock' => 30,
                'is_active' => true,
                'image' => 'images/products/Benguet.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bohol Pride Beans',
                'category' => 'Single Origin',
                'origin' => 'Bohol, PH',
                'description' => 'Balanced, great for everyday coffee.',
                'price' => 230,
                'stock' => 40,
                'is_active' => true,
                'image' => 'images/products/bohol.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sagada Arabica Beans',
                'category' => 'Arabica',
                'origin' => 'Sagada, Mountain Province',
                'description' => 'Fruity and slightly wine-like coffee with smooth finish and floral aroma.',
                'price' => 4800,
                'stock' => 85,
                'is_active' => true,
                'image' => 'images/products/Sagada.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kalinga Beans',
                'category' => 'Arabica',
                'origin' => 'Kalinga, PH',
                'description' => 'Bold and earthy coffee with strong aroma and medium acidity.',
                'price' => 90,
                'stock' => 15,
                'is_active' => true,
                'image' => 'images/products/Kalinga.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mt. Apo Arabica Beans',
                'category' => 'Arabica',
                'origin' => 'Mt. Apo, PH',
                'description' => 'Smooth and rich coffee grown in volcanic soil with balanced taste.',
                'price' => 460,
                'stock' => 85,
                'is_active' => true,
                'image' => 'images/products/Mt.apo.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Davao Arabica Beans',
                'category' => 'Arabica',
                'origin' => 'Davao, PH',
                'description' => 'Nutty and rich coffee with medium body and mild sweetness.',
                'price' => 390,
                'stock' => 120,
                'is_active' => true,
                'image' => 'images/products/Davao.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Batangas Barako Beans',
                'category' => 'Liberica',
                'origin' => 'Batangas, PH',
                'description' => 'Strong and bold coffee with intense aroma and smoky flavor.',
                'price' => 350,
                'stock' => 110,
                'is_active' => true,
                'image' => 'images/products/Batangas.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mindoro Coffee Beans',
                'category' => 'Liberica',
                'origin' => 'Mindoro, PH',
                'description' => 'Unique tropical flavor with heavy body and strong aroma.',
                'price' => 340,
                'stock' => 90,
                'is_active' => true,
                'image' => 'images/products/Mindoro.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bukidnon Robusta Beans',
                'category' => 'Robusta',
                'origin' => 'Bukidnon, PH',
                'description' => 'Strong, bitter coffee with high caffeine. Ideal for blends and budget drinks.',
                'price' => 280,
                'stock' => 150,
                'is_active' => true,
                'image' => 'images/products/Bukidnon.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
