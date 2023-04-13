import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '@lib/context';
import { Space, Avatar, Dropdown, Menu, Badge } from 'antd';
import ChevronDown from '@assets/svgs/bx-chevron-down.svg';
import { useRouter } from 'next/router';
import { useNotifications } from '@lib/service';

function Header() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { user, signOut } = useSession();
    const router = useRouter();
    const { data } = useNotifications();

    const trigger = useRef(null);
    const mobileNav = useRef(null);
    const handleSignOut = async (evt) => {
        await signOut();
        router.push('/login');
    };
    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!mobileNav.current || !trigger.current) return;
            if (
                !mobileNavOpen ||
                mobileNav.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!mobileNavOpen || keyCode !== 27) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    const profileMenu = [
        {
            key: '/profile',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            label: (
                <a
                    onClick={() =>
                        router.push({
                            pathname: '/profile/[id]',
                            query: {
                                id: user?.uuid,
                            },
                        })
                    }
                >
                    Профайл
                </a>
            ),
        },
        {
            key: '/editProfile',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                </svg>
            ),
            label: <Link href="/editProfile">Мэдээлэл өөрчлөх</Link>,
        },
        {
            key: '/tx',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                </svg>
            ),
            label: <Link href="/tx">Хийгдсэн гүйлгээнүүд </Link>,
        },
        {
            key: '/newJob',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            ),
            label: <Link href="/newJob">Шинэ ажлын байр </Link>,
        },
        {
            key: 'logout',
            label: 'Гарах',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                </svg>
            ),
            onClick: handleSignOut,
        },
    ];

    const notifMenu = [];

    // Iterate through the rows array and push each object to notifMenu array
    data?.learnReqNotifs?.rows.forEach((learnReqNotif) => {
        notifMenu.push({
            key: `/learnReqNotifs/${learnReqNotif.id}`, // Use a unique key for each element
            label: (
                <Link href={`/teaching/${learnReqNotif?.teaching?.id}`}>
                    Хичээлийн хүсэлт баталгаажлаа
                </Link>
            ), // Update the label as needed
        });
    });
    data?.teachinNotifs?.rows.forEach((learnReqNotif) => {
        notifMenu.push({
            key: `/learnReqNotifs/${learnReqNotif?.teaching?.id}`, // Use a unique key for each element
            label: (
                <Link href={`/teaching/${learnReqNotif.id}`}>Шинэ хүсэлт</Link>
            ), // Update the label as needed
        });
    });

    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
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

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop sign in links */}
                        {user ? (
                            <ul className="flex grow justify-end  flex-wrap items-center">
                                <Dropdown
                                    overlay={
                                        <Menu
                                            defaultSelectedKeys={[
                                                router.asPath,
                                            ]}
                                            items={profileMenu}
                                        />
                                    }
                                    placement="bottomRight"
                                    overlayClassName="hs-dropdown hs-dropdown-profile"
                                >
                                    <Space
                                        align="center"
                                        justify="center"
                                        className="py-1.5 pl-2 md:pl-5 "
                                    >
                                        <Avatar
                                            size={32}
                                            src={
                                                user?.profileImage ||
                                                'https://source.boringavatars.com/'
                                            }
                                        />
                                        <div className="hidden md:block">
                                            <ChevronDown />
                                        </div>
                                    </Space>
                                </Dropdown>
                                <Dropdown
                                    overlay={<Menu items={notifMenu} />}
                                    placement="bottomRight"
                                    overlayClassName="hs-dropdown hs-dropdown-profile"
                                >
                                    <Badge count={notifMenu?.length}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                            />
                                        </svg>
                                    </Badge>
                                </Dropdown>
                            </ul>
                        ) : (
                            <ul className="flex grow list-none justify-end flex-wrap items-center">
                                <li>
                                    <Link
                                        href="/login"
                                        className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                    >
                                        Нэвтрэх
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signup"
                                        className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                                    >
                                        Бүртгүүлэх
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>

                    {/* Mobile menu */}
                    <div className="md:hidden">
                        {/* Hamburger button */}
                        <button
                            ref={trigger}
                            className={`hamburger ${mobileNavOpen && 'active'}`}
                            aria-controls="mobile-nav"
                            aria-expanded={mobileNavOpen}
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                        >
                            <span className="sr-only">Menu</span>
                            <svg
                                className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect y="4" width="24" height="2" rx="1" />
                                <rect y="11" width="24" height="2" rx="1" />
                                <rect y="18" width="24" height="2" rx="1" />
                            </svg>
                        </button>

                        {/*Mobile navigation */}
                        <nav
                            id="mobile-nav"
                            ref={mobileNav}
                            className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
                            style={
                                mobileNavOpen
                                    ? {
                                          maxHeight:
                                              mobileNav.current.scrollHeight,
                                          opacity: 1,
                                      }
                                    : { maxHeight: 0, opacity: 0.8 }
                            }
                        >
                            <ul className="bg-gray-800 px-4 py-2">
                                <li>
                                    <Link
                                        href="/login"
                                        className="flex font-medium w-full text-purple-600 hover:text-gray-200 py-2 justify-center"
                                    >
                                        Sign in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/signup"
                                        className="font-medium w-full inline-flex items-center justify-center border border-transparent px-4 py-2 my-2 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out"
                                    >
                                        Sign up
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
