import React from "react";
import { Link, router } from "@inertiajs/react";

export default function ProductsIndex({ products, filters, categories }) {
    function updateFilter(key, value) {
        router.get(
            "/products",
            { ...filters, [key]: value },
            { preserveState: true, replace: true },
        );
    }

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
            </div>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-5xl font-bold">Products</h1>
                        <p className=" mt-2">
                            Specialty Coffee Beans only — search, filter, sort.
                        </p>
                        <div className="mt-4">
                            <Link
                                href="/"
                                className="text-sm underline hover:text-gray-200"
                            >
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
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white border rounded-lg p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <input
                        value={filters.search ?? ""}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        placeholder="Search beans (name/origin)…"
                        className="w-full sm:w-80 border rounded px-3 py-2"
                    />

                    <div className="flex gap-3 flex-wrap">
                        <select
                            value={filters.category ?? ""}
                            onChange={(e) =>
                                updateFilter("category", e.target.value)
                            }
                            className="border rounded px-3 py-2"
                        >
                            <option value="">All categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filters.sort ?? ""}
                            onChange={(e) =>
                                updateFilter("sort", e.target.value)
                            }
                            className="border rounded px-3 py-2"
                        >
                            <option value="">Sort</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">
                                Price: High → Low
                            </option>
                        </select>

                        <button
                            onClick={() =>
                                router.get("/products", {}, { replace: true })
                            }
                            className="px-4 py-2 rounded bg-black text-white"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.data.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border rounded-lg p-4"
                        >
                            {p.image ? (
    <img
        src={`/${p.image}`}
        alt={p.name}
        onError={(e) => {
            console.log("Broken image:", p.image);
            e.currentTarget.src = "/images/coffee-bg.jpg";
        }}
        className="w-full h-28 object-cover rounded mb-4"
    />
) : (
    <div className="h-28 bg-gray-100 rounded mb-4" />
)}

                            <p className="font-semibold">{p.name}</p>
                            <p className="text-sm text-gray-600">{p.origin}</p>
                            <p className="text-sm text-gray-600">
                                Category: {p.category}
                            </p>
                            <p className="mt-2 font-bold">
                                ₱{Number(p.price).toFixed(2)}
                            </p>
                            <p className="text-sm mt-1">
                                Stock:{" "}
                                <span
                                    className={
                                        p.stock <= 5
                                            ? "text-red-600 font-semibold"
                                            : ""
                                    }
                                >
                                    {p.stock}
                                </span>
                            </p>

                            <Link
                                href={`/products/${p.id}`}
                                className="mt-3 inline-block text-sm underline"
                            >
                                View details
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                    {products.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-3 py-2 border rounded ${
                                link.active ? "bg-black text-white" : "bg-white"
                            } ${!link.url ? "opacity-40 cursor-not-allowed" : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
