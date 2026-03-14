import React from "react";
import { Link } from "@inertiajs/react";

export default function Landing({ featuredProducts = [], categories = [] }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">
                                BrewLocal — Specialty Coffee Beans Only
                            </h1>
                            <p className="mt-4 text-gray-600 max-w-2xl">
                                Shop single origin, blends, and decaf beans. Choose
                                roast level, grind option, and size.
                            </p>

                            <div className="mt-8 flex gap-3">
                                <Link
                                    href="/products"
                                    className="px-5 py-3 rounded bg-black text-white"
                                >
                                    Shop Beans
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-3 rounded border border-gray-300"
                                >
                                    Create Account
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
            </header>

            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-semibold">Featured Beans</h2>
                    <Link href="/products" className="text-sm underline">
                        View all
                    </Link>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white border rounded-lg p-4"
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-28 object-cover rounded mb-4"
                                    />
                                ) : (
                                    <div className="h-28 bg-gray-100 rounded mb-4" />
                                )}

                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">
                                    {product.origin}
                                </p>
                                <p className="mt-2 font-semibold">
                                    ₱{Number(product.price).toFixed(2)}
                                </p>

                                <Link
                                    href={`/products/${product.id}`}
                                    className="mt-3 inline-block text-sm underline"
                                >
                                    View details
                                </Link>
                            </div>
                        ))
                    ) : (
                        [1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-lg p-4"
                            >
                                <div className="h-28 bg-gray-100 rounded mb-4" />
                                <p className="font-medium">Single Origin Beans</p>
                                <p className="text-sm text-gray-600">Benguet, PH</p>
                                <p className="mt-2 font-semibold">₱250.00</p>
                                <Link
                                    href="/products"
                                    className="mt-3 inline-block text-sm underline"
                                >
                                    View details
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="bg-white border-y">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-semibold">Categories</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-3">
                        {(categories.length
                            ? categories
                            : ["Single Origin", "Blends", "Decaf"]
                        ).map((c) => (
                            <div
                                key={c}
                                className="border rounded-lg p-5 bg-gray-50"
                            >
                                <p className="font-semibold">{c}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {c === "Single Origin" &&
                                        "Unique flavor from one region."}
                                    {c === "Blends" &&
                                        "Balanced for daily brewing."}
                                    {c === "Decaf" &&
                                        "Coffee without caffeine."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-black text-white rounded-lg p-8 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-semibold">
                            Ready to brew?
                        </h3>
                        <p className="text-gray-200 mt-2">
                            Browse beans and order in minutes.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="px-5 py-3 rounded bg-white text-black font-medium"
                    >
                        Browse Products
                    </Link>
                </div>
            </section>
        </div>
    );
}