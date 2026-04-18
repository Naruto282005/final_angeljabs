<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function imageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (Str::startsWith($path, ['http://', 'https://'])) {
            return $path;
        }

        // For seeded images stored inside public/images/...
        if (Str::startsWith($path, 'images/')) {
            return asset($path);
        }

        // For uploaded images stored in storage/app/public/...
        return asset('storage/' . $path);
    }

    public function landing()
    {
        $featuredProducts = Product::where('is_active', true)
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category,
                    'origin' => $product->origin,
                    'description' => $product->description,
                    'price' => $product->price,
                    'stock' => $product->stock,
                    'image' => $this->imageUrl($product->image),
                ];
            });

        return Inertia::render('Landing', [
            'featuredProducts' => $featuredProducts,
            'categories' => ['Single Origin', 'Blends', 'Decaf'],
        ]);
    }

    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $category = $request->string('category')->toString();
        $sort = $request->string('sort')->toString();

        $query = Product::query()->where('is_active', true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('origin', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->where('category', $category);
        }

        if ($sort === 'price_asc') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price_desc') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        $products = $query->paginate(8)->through(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'origin' => $product->origin,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'image' => $this->imageUrl($product->image),
            ];
        })->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'sort' => $sort,
            ],
            'categories' => ['Single Origin', 'Blends', 'Decaf'],
        ]);
    }

    public function show(Product $product)
    {
        abort_unless($product->is_active, 404);

        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'origin' => $product->origin,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'image' => $this->imageUrl($product->image),
            ],
        ]);
    }
}
