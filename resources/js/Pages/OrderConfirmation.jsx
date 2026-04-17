import { Head, Link } from "@inertiajs/react";

export default function OrderConfirmation({ auth, order }) {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/coffee-bg.jpg')",
            }}
        >
            <Head title="Order Confirmation" />

            <div
                className="bg-cover bg-center bg-no-repeat border-b"
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
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div className="mt-6">
                    <h2 className="text-3xl font-bold">
                        Order Confirmation
                    </h2>
                    <Link
                        href={route("products.index")}
                        className="text-sm underline mt-2 inline-block"
                    >
                        ← Continue shopping
                    </Link>
                </div>
            </div>
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white/95 rounded shadow p-6">
                    <h1 className="text-3xl font-bold mb-2">
                        Thank you for your order!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Your order has been placed successfully.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <p>
                                <strong>Order Number:</strong>{" "}
                                {order.order_number}
                            </p>
                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                                <strong>Payment Method:</strong>{" "}
                                {order.payment_method === "cod"
                                    ? "Cash on Delivery"
                                    : "Bank Transfer"}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Name:</strong> {order.customer_name}
                            </p>
                            <p>
                                <strong>Phone:</strong> {order.phone}
                            </p>
                            <p>
                                <strong>Address:</strong> {order.address},{" "}
                                {order.city}
                            </p>
                        </div>
                    </div>

                    <h2 className="text-xl font-bold mb-3">Order Summary</h2>

                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    <div className="font-medium">
                                        {item.product_name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </div>
                                </div>
                                <div>₱{Number(item.subtotal).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₱{Number(order.subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Fee</span>
                            <span>
                                ₱{Number(order.shipping_fee).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₱{Number(order.total).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Link
                            href={route("products.index")}
                            className="inline-block bg-gray-900 text-white px-4 py-2 rounded"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
