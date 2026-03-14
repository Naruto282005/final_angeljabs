<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalSales = Order::whereIn('status', ['Paid', 'Shipped', 'Completed'])->sum('total');
        $totalOrders = Order::count();
        $totalCustomers = User::where('is_admin', false)->count();
        $lowStockProducts = Product::where('stock', '<=', 5)->orderBy('stock')->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalSales' => $totalSales,
                'totalOrders' => $totalOrders,
                'totalCustomers' => $totalCustomers,
            ],
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}