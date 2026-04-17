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
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.72)), url('/images/coffee-bg.jpg')",
            }}
        >
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
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-5xl  font-bold">Products</h1>
                        <p className=" mt-2">
                            Specialty Coffee Beans only — search, filter, sort.
                        </p>
                        <div className="mt-4">
                            <Link href="/" className="text-sm  underline">
                                ← Back to home
                            </Link>
                        </div>
                    </div>

                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100"
                    >
                        <span>🛒</span>
                        <span>Cart</span>
                    </Link>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-2">
                <div className="bg-white border rounded-lg p-4">
                    {product.image ? (
                        <>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-80 object-cover rounded"
                            />
                            <h2 className="mt-3 text-2xl font-bold">
                                {product.name}
                            </h2>
                        </>
                    ) : (
                        <>
                            <div className="h-80 bg-gray-100 rounded" />
                            <h2 className="mt-3 text-2xl font-bold">
                                {product.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-2">
                                *Image placeholder
                            </p>
                        </>
                    )}
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <p className="text-2xl font-bold">
                        ₱{Number(product.price).toFixed(2)}
                    </p>

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
