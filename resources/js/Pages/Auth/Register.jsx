import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="coffee-login-page">
                <div className="coffee-login-overlay"></div>

                <div className="coffee-login-card">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="mb-1 block text-[10px] text-[#5f5555]"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                className="coffee-input"
                                required
                                autoFocus
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1 text-[10px]"
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="mb-1 block text-[10px] text-[#5f5555]"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                className="coffee-input"
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1 text-[10px]"
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="mb-1 block text-[10px] text-[#5f5555]"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="coffee-input"
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1 text-[10px]"
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1 block text-[10px] text-[#5f5555]"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                className="coffee-input"
                                required
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                            <Link
                                href={route('login')}
                                className="text-[10px] text-[#8c7f7f] hover:text-black"
                            >
                                Already registered?
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="coffee-login-button"
                            >
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
