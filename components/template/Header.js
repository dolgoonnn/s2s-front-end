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
    console.log('🚀 ~ file: Header.js:14 ~ Header ~ data:', data);

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
            key: '/myTeaching',

            label: <Link href="/myTeaching">Миний хичээлүүд</Link>,
        },
        {
            key: '/myRequests',

            label: <Link href="/myRequests">Явуулсан хүсэлтүүд </Link>,
        },

        {
            key: 'logout',
            label: 'Гарах',

            onClick: handleSignOut,
        },
    ];

    const notifMenu = [];

    // Iterate through the rows array and push each object to notifMenu array
    data?.learnReqNotifs?.rows.forEach((learnReqNotif) => {
        notifMenu.push({
            key: `/teaching/${learnReqNotif?.teachingId}`, // Use a unique key for each element
            label: (
                <Link href={`/teaching/${learnReqNotif?.teachingId}`}>
                    Таны явуулсан хүсэлт баталгаажлаа
                </Link>
            ), // Update the label as needed
        });
    });
    data?.teachinNotifs?.rows.forEach((learnReqNotif) => {
        notifMenu.push({
            key: `/teaching/${learnReqNotif?.teachingId}`, // Use a unique key for each element
            label: (
                <Link href={`/teaching/${learnReqNotif?.teachingId}`}>
                    Шинэ хүсэлт ирсэн байна
                </Link>
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
                                {/* <li>
                                    <Link
                                        href="/login"
                                        className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                                    >
                                        Нэвтрэх
                                    </Link>
                                </li> */}
                                <li>
                                    <Link
                                        href="/login"
                                        className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
                                    >
                                        Нэвтрэх
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
