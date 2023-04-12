import React from 'react';
import Link from 'next/link';

import Header from '@components/template/Header';
import PageIllustration from '@components/template/PageIllustration';
import MainLayout from '@components/layout/MainLayout';
import FacebookButton from '@components/common/FacebookButton';

function SignIn() {
    return (
        <MainLayout>
            <div className="flex flex-col min-h-screen overflow-hidden">
                {/*  Site header */}
                <Header />

                {/*  Page content */}
                <main className="grow">
                    {/*  Page illustration */}
                    <div
                        className="relative max-w-6xl mx-auto h-0 pointer-events-none"
                        aria-hidden="true"
                    >
                        <PageIllustration />
                    </div>

                    <section className="relative">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                                {/* Page header */}
                                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                                    <h1 className="h1">Тавтай морил🙋‍♂️</h1>
                                </div>

                                {/* Form */}
                                <div className="max-w-sm mx-auto">
                                    <form>
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="w-full px-3">
                                                <FacebookButton />
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-gray-400 text-center mt-6">
                                        Бүртгэлгүй бол?{' '}
                                        <Link
                                            href="/signup"
                                            className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </MainLayout>
    );
}

export default SignIn;
