import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Checkout({
    auth,
    cartItems,
    subtotal,
    shippingFee,
    total,
}) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: auth.user.name || "",
        phone: "",
        address: "",
        city: "",
        notes: "",
        payment_method: "cod",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("checkout.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Checkout" />

            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                    <form
                        onSubmit={submit}
                        className="space-y-4 bg-white p-6 rounded shadow"
                    >
                        <div>
                            <label className="block font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={(e) =>
                                    setData("customer_name", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.customer_name && (
                                <div className="text-red-500 text-sm">
                                    {errors.customer_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium">Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.phone && (
                                <div className="text-red-500 text-sm">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium">Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.address && (
                                <div className="text-red-500 text-sm">
                                    {errors.address}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium">City</label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.city && (
                                <div className="text-red-500 text-sm">
                                    {errors.city}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium">Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Payment Method
                            </label>
                            <select
                                value={data.payment_method}
                                onChange={(e) =>
                                    setData("payment_method", e.target.value)
                                }
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="cod">Cash on Delivery</option>
                                <option value="bank_transfer">
                                    Bank Transfer
                                </option>
                            </select>
                            {errors.payment_method && (
                                <div className="text-red-500 text-sm">
                                    {errors.payment_method}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gray-900 text-white px-4 py-2 rounded"
                        >
                            {processing ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </div>

                <div>
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {item.product.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Qty: {item.qty}
                                        </div>
                                    </div>
                                    <div>
                                        ₱
                                        {(
                                            Number(item.product.price) *
                                            Number(item.qty)
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₱{Number(subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span>₱{Number(shippingFee).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₱{Number(total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
