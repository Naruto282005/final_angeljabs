import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword = true }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="coffee-login-page">
                <div className="coffee-login-overlay"></div>

                <div className="coffee-login-card">
                    {status && (
                        <div className="mb-3 text-[10px] text-green-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
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
                                autoFocus
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="coffee-input"
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-1 text-[10px]"
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-2">
                            <label className="flex items-center gap-2 text-[10px] text-[#5f5555]">
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[10px] text-[#5f5555] underline hover:text-black"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="coffee-login-button"
                            >
                                LOG IN
                            </button>
                        </div>

                        <div className="mt-3 text-center text-[10px] text-[#5f5555]">
                            Don&apos;t have an account?{' '}
                            <Link
                                href={route('register')}
                                className="underline hover:text-black"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
