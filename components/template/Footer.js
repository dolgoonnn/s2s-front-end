import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <footer aria-label="Site Footer" class="bg-gray-900">
            <div class="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
                {/* <div class="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
                    <a
                        class="inline-block rounded-full bg-teal-600 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
                        href="#MainContent"
                    >
                        <span class="sr-only">Back to top</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </a>
                </div> */}

                <div class="lg:flex lg:items-end lg:justify-between">
                    <div>
                        <div class="flex justify-center text-purple-600 lg:justify-start">
                            <Link
                                href="/"
                                className="flex gap-1  items-center text-xl"
                                aria-label="Cruip"
                            >
                                <svg
                                    className="w-8 h-8"
                                    viewBox="0 0 74 64"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.3228 21.3382L20.2313 16.7772L15.8169 9.1354H57.3331L36.5817 45.0903L32.1673 37.4352L24.2589 42.0096L36.5817 63.348L73.15 0H0L12.3228 21.3382Z"
                                        fill="#5D5DFF"
                                    />
                                </svg>
                                S2S.mn
                            </Link>
                        </div>

                        <p class="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
                            СЭЗИС-ийн оюутнууд бүтээв🥰
                        </p>
                    </div>

                    {/* <nav aria-label="Footer Nav" class="mt-12 lg:mt-0">
                        <ul class="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
                            <li>
                                <a
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                    href="/"
                                >
                                    About
                                </a>
                            </li>

                            <li>
                                <a
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                    href="/"
                                >
                                    Services
                                </a>
                            </li>

                            <li>
                                <a
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                    href="/"
                                >
                                    Projects
                                </a>
                            </li>

                            <li>
                                <a
                                    class="text-gray-700 transition hover:text-gray-700/75"
                                    href="/"
                                >
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav> */}
                </div>

                <p class="mt-12 text-center text-sm text-gray-500 lg:text-right">
                    Copyright &copy; 2022. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
