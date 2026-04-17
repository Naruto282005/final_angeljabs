import { Head, Link, router } from '@inertiajs/react';

export default function AdminOrdersIndex({ auth, orders }) {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/coffee-bg.jpg')",
            }}
        >
            <Head title="Admin Orders" />

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
                <h1 className="text-5xl font-bold">Admin Order Management</h1>
                <Link
                    href={route('admin.dashboard')}
                    className="text-sm underline mt-2 inline-block"
                >
                    ← Back to dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="bg-white/95 rounded shadow p-6">
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
                                            {order.payment_method === 'cod'
                                                ? 'Cash on Delivery'
                                                : 'Bank Transfer'}
                                        </td>
                                        <td className="py-2">{order.status}</td>
                                        <td className="py-2">{order.created_at}</td>
                                        <td className="py-2">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="px-3 py-1 border rounded bg-white"
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
                                className={`px-3 py-1 border rounded ${
                                    link.active ? 'bg-black text-white' : 'bg-white'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
