import React from "react";
import { Link, router } from "@inertiajs/react";

export default function CartIndex({ items, subtotal, total }) {
    const updateQty = (id, qty) => {
        router.patch(`/cart/${id}`, { qty }, { preserveScroll: true });
    };

    const removeItem = (id) => {
        router.delete(`/cart/${id}`, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <h1 className="text-3xl font-bold">Cart</h1>
                    <Link
                        href="/products"
                        className="text-sm underline mt-2 inline-block"
                    >
                        ← Continue shopping
                    </Link>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    {items.length === 0 ? (
                        <div className="bg-white border rounded-lg p-6">
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border rounded-lg p-4 flex gap-4"
                            >
                                <div className="w-20 h-20 bg-gray-100 rounded" />
                                <div className="flex-1">
                                    <p className="font-semibold">
                                        {item.product.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        ₱{item.product.price}
                                    </p>

                                    <div className="mt-3 flex items-center gap-3">
                                        <button
                                            className="w-9 h-9 border rounded font-bold"
                                            onClick={() =>
                                                updateQty(
                                                    item.id,
                                                    Math.max(1, item.qty - 1),
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <input
                                            className="w-16 border rounded px-2 py-2 text-center"
                                            value={item.qty}
                                            onChange={(e) =>
                                                updateQty(
                                                    item.id,
                                                    Number(e.target.value) || 1,
                                                )
                                            }
                                        />

                                        <button
                                            className="w-9 h-9 border rounded font-bold"
                                            onClick={() =>
                                                updateQty(item.id, item.qty + 1)
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            className="ml-auto text-sm underline"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">
                                        ₱{item.subtotal}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white border rounded-lg p-5 h-fit">
                    <h2 className="font-semibold text-lg">Order Summary</h2>
                    <div className="mt-4 text-sm space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₱{subtotal}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₱{total}</span>
                        </div>
                    </div>

                    <button
                        className={`mt-5 w-full px-5 py-3 rounded font-medium ${
                            items.length
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!items.length}
                        onClick={() => router.visit("/checkout")}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
