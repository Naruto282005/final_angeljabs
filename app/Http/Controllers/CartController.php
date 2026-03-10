<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $items = CartItem::with('product')
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'qty' => $item->qty,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'price' => $item->product->price,
                        'stock' => $item->product->stock,
                    ],
                    'subtotal' => $item->qty * $item->product->price,
                ];
            });

        $subtotal = $items->sum('subtotal');
        $total = $subtotal;

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $request->validate([
            'qty' => ['required', 'integer', 'min:1'],
        ]);

        $qty = (int) $request->qty;

        if ($product->stock <= 0) {
            return back()->with('error', 'Out of stock.');
        }

        $item = CartItem::firstOrNew([
            'user_id' => $request->user()->id,
            'product_id' => $product->id,
        ]);

        $current = $item->exists ? $item->qty : 0;
        $item->qty = min($current + $qty, $product->stock);
        $item->save();

        return redirect('/cart');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $this->authorizeCartItem($request, $cartItem);

        $request->validate([
            'qty' => ['required', 'integer', 'min:1'],
        ]);

        $max = $cartItem->product->stock;
        $cartItem->qty = min((int) $request->qty, $max);
        $cartItem->save();

        return back();
    }

    public function remove(Request $request, CartItem $cartItem)
    {
        $this->authorizeCartItem($request, $cartItem);
        $cartItem->delete();

        return back();
    }

    private function authorizeCartItem(Request $request, CartItem $cartItem): void
    {
        abort_if($cartItem->user_id !== $request->user()->id, 403);
        $cartItem->loadMissing('product');
    }
}
