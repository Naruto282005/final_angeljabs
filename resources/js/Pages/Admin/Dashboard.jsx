import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats, lowStockProducts }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-3">
                        <Link href={route('admin.products.index')} className="px-4 py-2 bg-black text-white rounded">
                            Manage Products
                        </Link>
                        <Link href={route('admin.orders.index')} className="px-4 py-2 border rounded">
                            Manage Orders
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <h2 className="text-2xl font-bold">₱{Number(stats.totalSales).toFixed(2)}</h2>
                    </div>

                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
                    </div>

                    <div className="bg-white rounded shadow p-5">
                        <p className="text-sm text-gray-500">Total Customers</p>
                        <h2 className="text-2xl font-bold">{stats.totalCustomers}</h2>
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
                                        <tr key={product.id} className="border-b">
                                            <td className="py-2">{product.name}</td>
                                            <td className="py-2">{product.category}</td>
                                            <td className="py-2">{product.stock}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}