import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function AdminOrdersIndex({ auth, orders }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin Orders" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Admin Order Management</h1>
                    <Link href={route('admin.dashboard')} className="px-4 py-2 border rounded">
                        Back to Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded shadow p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-2">Order #</th>
                                    <th className="py-2">Customer</th>
                                    <th className="py-2">Total</th>
                                    <th className="py-2">Payment</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Date</th>
                                    <th className="py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="py-2">{order.order_number}</td>
                                        <td className="py-2">{order.customer_name}</td>
                                        <td className="py-2">₱{Number(order.total).toFixed(2)}</td>
                                        <td className="py-2">
                                            {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                                        </td>
                                        <td className="py-2">{order.status}</td>
                                        <td className="py-2">{order.created_at}</td>
                                        <td className="py-2">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="px-3 py-1 border rounded"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex gap-2">
                        {orders.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 border rounded ${link.active ? 'bg-black text-white' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}