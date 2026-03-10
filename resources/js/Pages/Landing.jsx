import React from "react";
import { Link } from "@inertiajs/react";

export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* HERO (required) */}
            <header className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-16">
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
            </header>

            {/* FEATURED PRODUCTS (required) */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-semibold">Featured Beans</h2>
                    <Link href="/products" className="text-sm underline">
                        View all
                    </Link>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white border rounded-lg p-4">
                            <div className="h-28 bg-gray-100 rounded mb-4" />
                            <p className="font-medium">Single Origin Beans</p>
                            <p className="text-sm text-gray-600">Benguet, PH</p>
                            <p className="mt-2 font-semibold">₱250</p>
                            <Link
                                href="/products/1"
                                className="mt-3 inline-block text-sm underline"
                            >
                                View details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CATEGORY HIGHLIGHTS (required; still beans only) */}
            <section className="bg-white border-y">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-semibold">Categories</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-3">
                        {[
                            {
                                title: "Single Origin",
                                desc: "Unique flavor from one region.",
                            },
                            {
                                title: "Blends",
                                desc: "Balanced for daily brewing.",
                            },
                            {
                                title: "Decaf",
                                desc: "Coffee without caffeine.",
                            },
                        ].map((c) => (
                            <div
                                key={c.title}
                                className="border rounded-lg p-5 bg-gray-50"
                            >
                                <p className="font-semibold">{c.title}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {c.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA (required) */}
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
