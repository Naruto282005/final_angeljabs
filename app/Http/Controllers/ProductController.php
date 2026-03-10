<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();
        $category = $request->string('category')->toString();
        $sort = $request->string('sort')->toString(); // price_asc / price_desc

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

        $products = $query->paginate(8)->withQueryString();

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
            'product' => $product,
        ]);
    }
}