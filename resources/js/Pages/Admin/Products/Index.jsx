import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const emptyForm = {
    name: '',
    category: '',
    origin: '',
    description: '',
    image: null,
    price: '',
    stock: '',
};

export default function AdminProductsIndex({ auth, products }) {
    const { data, setData, post, processing, reset, errors } = useForm(emptyForm);
    const [editing, setEditing] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        if (editing) {
            router.post(
                route('admin.products.update', editing.id),
                {
                    _method: 'put',
                    ...data,
                    is_active: editing.is_active ? 1 : 0,
                },
                {
                    forceFormData: true,
                    onSuccess: () => {
                        setEditing(null);
                        reset();
                    },
                }
            );
            return;
        }

        post(route('admin.products.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const startEdit = (product) => {
        setEditing(product);
        setData({
            name: product.name ?? '',
            category: product.category ?? '',
            origin: product.origin ?? '',
            description: product.description ?? '',
            image: null,
            price: product.price ?? '',
            stock: product.stock ?? '',
        });
    };

    const cancelEdit = () => {
        setEditing(null);
        reset();
    };

    const deleteProduct = (id) => {
        if (confirm('Delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const toggleProduct = (id) => {
        router.patch(route('admin.products.toggle', id));
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/coffee-bg.jpg')",
            }}
        >
            <Head title="Admin Products" />

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

            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-5xl font-bold">Admin Product Management</h1>
                <Link
                    href={route('admin.dashboard')}
                    className="text-sm underline mt-2 inline-block"
                >
                    ← Back to dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="bg-white/95 rounded shadow p-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editing ? 'Edit Product' : 'Add Product'}
                    </h2>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block mb-1">Category</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            />
                            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                        </div>

                        <div>
                            <label className="block mb-1">Origin</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={data.origin}
                                onChange={(e) => setData('origin', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Price</label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block mb-1">Stock</label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                            />
                            {errors.stock && <div className="text-red-500 text-sm">{errors.stock}</div>}
                        </div>

                        <div>
                            <label className="block mb-1">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1">Description</label>
                            <textarea
                                className="w-full border rounded px-3 py-2"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2 flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-black text-white rounded"
                            >
                                {editing ? 'Update Product' : 'Add Product'}
                            </button>

                            {editing && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="bg-white/95 rounded shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Product List</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="py-2">Image</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Price</th>
                                    <th className="py-2">Stock</th>
                                    <th className="py-2">Status</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => (
                                    <tr key={product.id} className="border-b">
                                        <td className="py-2">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded border"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-100 rounded border" />
                                            )}
                                        </td>
                                        <td className="py-2">{product.name}</td>
                                        <td className="py-2">{product.category}</td>
                                        <td className="py-2">₱{Number(product.price).toFixed(2)}</td>
                                        <td className="py-2">{product.stock}</td>
                                        <td className="py-2">
                                            {product.is_active ? 'Available' : 'Unavailable'}
                                        </td>
                                        <td className="py-2">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => startEdit(product)}
                                                    className="px-3 py-1 border rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => toggleProduct(product.id)}
                                                    className="px-3 py-1 border rounded"
                                                >
                                                    Toggle
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex gap-2">
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 border rounded ${link.active ? 'bg-black text-white' : 'bg-white'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
