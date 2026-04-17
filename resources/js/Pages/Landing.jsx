import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Landing({ featuredProducts = [], categories = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/coffee-bg.jpg')",
            }}
        >
            <header
                className="border-b bg-cover bg-center bg-no-repeat"
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
            </header>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl  font-bold tracking-tight">

                    </h1>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100"
                        >
                            <span>🛒</span>
                            <span>Cart</span>
                        </Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenDropdown(!openDropdown)
                                    }
                                    className="inline-flex items-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100"
                                >
                                    <span>{user.name}</span>
                                    <svg
                                        className="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {openDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg z-50">
                                        <Link
                                            href={route("profile.edit")}
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 border rounded bg-white hover:bg-gray-100"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 rounded bg-black text-white"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-10 flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            BrewLocal — Specialty Coffee Beans Only
                        </h1>
                        <p className="mt-4 text-lg max-w-2xl">
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

                            {!user && (
                                <Link
                                    href="/register"
                                    className="px-5 py-3 rounded border border-gray-300"
                                >
                                    Create Account
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-semibold">Featured Beans</h2>
                    <Link href="/products" className="text-sm underline">
                        View all
                    </Link>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredProducts.length > 0
                        ? featuredProducts.map((product) => (
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
                        : [1, 2, 3, 4].map((i) => (
                              <div
                                  key={i}
                                  className="bg-white border rounded-lg p-4"
                              >
                                  <div className="h-28 bg-gray-100 rounded mb-4" />
                                  <p className="font-medium">
                                      Single Origin Beans
                                  </p>
                                  <p className="text-sm text-gray-600">
                                      Benguet, PH
                                  </p>
                                  <p className="mt-2 font-semibold">₱250.00</p>
                                  <Link
                                      href="/products"
                                      className="mt-3 inline-block text-sm underline"
                                  >
                                      View details
                                  </Link>
                              </div>
                          ))}
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
