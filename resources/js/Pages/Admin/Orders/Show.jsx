import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function AdminOrderShow({ auth, order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.orders.updateStatus', order.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Order ${order.order_number}`} />

            <div className="max-w-5xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Order Details</h1>
                    <Link href={route('admin.orders.index')} className="px-4 py-2 border rounded">
                        Back to Orders
                    </Link>
                </div>

                <div className="bg-white rounded shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p><strong>Order Number:</strong> {order.order_number}</p>
                            <p><strong>Customer:</strong> {order.customer_name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}, {order.city}</p>
                        </div>
                        <div>
                            <p><strong>Payment Method:</strong> {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</p>
                            <p><strong>Subtotal:</strong> ₱{Number(order.subtotal).toFixed(2)}</p>
                            <p><strong>Shipping Fee:</strong> ₱{Number(order.shipping_fee).toFixed(2)}</p>
                            <p><strong>Total:</strong> ₱{Number(order.total).toFixed(2)}</p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-3">Items</h2>
                    <div className="space-y-3 mb-6">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between border-b pb-2">
                                <div>
                                    <div className="font-medium">{item.product_name}</div>
                                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                </div>
                                <div>₱{Number(item.subtotal).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 md:items-end">
                        <div>
                            <label className="block mb-1 font-medium">Update Status</label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="border rounded px-3 py-2"
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Update Status
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}