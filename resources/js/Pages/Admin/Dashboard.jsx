import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, stats, lowStockProducts }) {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/coffee-bg.jpg')",
            }}
        >
            <Head title="Admin Dashboard" />

            <div
                className="bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/coffee-bg.jpg')",
                }}
            >
                <div className="max-w-5xl mx-auto px-4 py-9">
                    <div className="flex justify-center">
                        <div className="rounded-xl bg-black px-5 py-2">
                            <h1 className="text-5xl font-bold text-white">
                                BrewLocal
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
                        <Link
                            href="/"
                            className="text-sm underline mt-2 inline-block"
                        >
                            ← Back to home
                        </Link>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100"
                        >
                            <span>{auth.user.name}</span>
                            <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {openDropdown && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg z-50">
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-3">
                        <Link
                            href={route('admin.products.index')}
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Manage Products
                        </Link>
                        <Link
                            href={route('admin.orders.index')}
                            className="px-4 py-2 border rounded bg-white"
                        >
                            Manage Orders
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <h2 className="text-2xl font-bold">
                            ₱{Number(stats.totalSales).toFixed(2)}
                        </h2>
                    </div>

                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <h2 className="text-2xl font-bold">
                            {stats.totalOrders}
                        </h2>
                    </div>

                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">
                            Total Customers
                        </p>
                        <h2 className="text-2xl font-bold">
                            {stats.totalCustomers}
                        </h2>
                    </div>
                </div>

                <div className="bg-white rounded shadow p-5">
                    <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>

                    {lowStockProducts.length === 0 ? (
                        <p className="text-gray-600">No low-stock products.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="py-2">Product</th>
                                        <th className="py-2">Category</th>
                                        <th className="py-2">Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="border-b"
                                        >
                                            <td className="py-2">
                                                {product.name}
                                            </td>
                                            <td className="py-2">
                                                {product.category}
                                            </td>
                                            <td className="py-2">
                                                {product.stock}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
