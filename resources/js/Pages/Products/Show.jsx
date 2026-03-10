import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";

export default function Show({ product }) {
    const [qty, setQty] = useState(1);
    const maxQty = product.stock > 0 ? product.stock : 1;

    const dec = () => setQty((q) => Math.max(1, q - 1));
    const inc = () => setQty((q) => Math.min(maxQty, q + 1));

    const onQtyChange = (e) => {
        const value = Number(e.target.value);
        if (Number.isNaN(value)) return setQty(1);
        setQty(Math.max(1, Math.min(maxQty, value)));
    };

    const addToCart = () => {
        router.post(`/cart/add/${product.id}`, { qty });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <Link href="/products" className="text-sm underline">
                        ← Back to products
                    </Link>
                    <h1 className="text-3xl font-bold mt-3">{product.name}</h1>
                    <p className="text-gray-600 mt-1">{product.origin}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-2">
                {/* Image */}
                <div className="bg-white border rounded-lg p-4">
                    <div className="h-80 bg-gray-100 rounded" />
                    <p className="text-sm text-gray-500 mt-3">
                        *Image placeholder
                    </p>
                </div>

                {/* Details */}
                <div className="bg-white border rounded-lg p-6">
                    <p className="text-2xl font-bold">₱{product.price}</p>

                    <p className="mt-2 text-sm">
                        Stock:{" "}
                        <span
                            className={
                                product.stock <= 5
                                    ? "text-red-600 font-semibold"
                                    : "font-semibold"
                            }
                        >
                            {product.stock}
                        </span>
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        Category:{" "}
                        <span className="font-medium">{product.category}</span>
                    </p>

                    <div className="mt-6">
                        <h2 className="font-semibold">Description</h2>
                        <p className="text-gray-700 mt-2">
                            {product.description ||
                                "No description provided yet."}
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="mt-6">
                        <h2 className="font-semibold">Quantity</h2>
                        <div className="mt-2 flex items-center gap-3">
                            <button
                                className="w-10 h-10 border rounded font-bold"
                                onClick={dec}
                                disabled={product.stock <= 0}
                            >
                                −
                            </button>

                            <input
                                className="w-20 border rounded px-3 py-2 text-center"
                                value={qty}
                                onChange={onQtyChange}
                                disabled={product.stock <= 0}
                            />

                            <button
                                className="w-10 h-10 border rounded font-bold"
                                onClick={inc}
                                disabled={product.stock <= 0}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        className={`mt-6 w-full px-5 py-3 rounded font-medium ${
                            product.stock > 0
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={product.stock <= 0}
                        onClick={addToCart}
                    >
                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
        </div>
    );
}
