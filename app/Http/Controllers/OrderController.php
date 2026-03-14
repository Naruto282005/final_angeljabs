<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function show(Order $order)
    {
        if (auth()->id() !== $order->user_id) {
            abort(403);
        }

        $order->load('items');

        return Inertia::render('OrderConfirmation', [
            'order' => $order,
        ]);
    }
}
