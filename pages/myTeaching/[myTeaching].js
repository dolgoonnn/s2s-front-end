import React from 'react';
import MainLayout from '@components/layout/MainLayout';
import Header from '@components/template/Header';
import PageIllustration from '@components/template/PageIllustration';
import { useRouter } from 'next/router';
import {
    useOneTeaching,
    useTeacherTeaching,
    getTeacherTeaching,
    createLearnRequest,
    getTeachingRequests,
} from '@lib/service';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Space, Popconfirm, notification } from 'antd';
import Link from 'next/link';
import AdCard from '@components/template/AdCard';
import DOMPurify from 'dompurify';
import { useSession } from '@lib/context';
import UserCard from '@components/template/userCard';

export default function Detail() {
    const [loading, setLoading] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [requests, setRequests] = useState([]);

    const router = useRouter();
    const { user } = useSession();
    const id = router.query.myTeaching;
    const { data: fetchedTeaching } = useOneTeaching(id);

    const { data: userTeaching } = useTeacherTeaching(
        fetchedTeaching?.teaching?.userId
    );

    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === 'success' ? 'Амжилттай' : 'Алдаа гарлаа',
            description: data,
        });
    };

    const confirmRequestSend = async () => {
        setLoading(true);
        const { data, status } = await createLearnRequest(id);

        if (status == 200) {
            openNotificationWithIcon('success', 'Амжилттай хүсэлтээ явууллаа');
            // mutateProjectComments(comment.id);
            setLoading(false);
            return;
        } else {
            openNotificationWithIcon('error', 'Failed to create request');
        }
    };
    const cancel = (e) => {};

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html),
        };
    }
    const fetchTeachingRequests = async (id) => {
        const data = await getTeachingRequests(id);

        setRequests(data);
    };

    useEffect(() => {
        if (id) {
            fetchTeachingRequests(id);
        }
    }, [id]);

    return (
        <MainLayout>
            <Header />
            {/*  Page content */}
            <main className="grow">
                {/*  Paxge illustration */}
                <div
                    className="relative max-w-6xl mx-auto h-0 pointer-events-none"
                    aria-hidden="true"
                >
                    <PageIllustration />
                </div>
                <div className="min-h-screen">
                    <div className=" mt-28 space-y-7">
                        <div className="flex flex-col-reverse md:flex-row">
                            <Space
                                direction="vertical"
                                className=" w-full h-full"
                            >
                                <Link href={'/jobs'}>
                                    <div className="mb-4 flex items-center gap-1 text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                            />
                                        </svg>
                                        Бүх зарууд
                                    </div>
                                </Link>
                                <h2 className="text-3xl pb-10 font-bold tracking-wide">
                                    {fetchedTeaching?.teaching?.title}
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={createMarkup(
                                        fetchedTeaching?.teaching?.description
                                    )}
                                    className="hs-markdown"
                                ></div>
                            </Space>
                            <div className="ml:0 md:ml-20 w-full md:w-72 mb-8 md:mb-8 h-full shrink-0 space-y-4">
                                <div className="border border-trueGray-700 bg-trueGray-800 rounded-xl ">
                                    <div className="p-5 ">
                                        <div className="text-center mb-6">
                                            <div className="h-14  w-14 bg-white rounded-full overflow-hidden inline-flex ">
                                                <img
                                                    src={
                                                        fetchedTeaching
                                                            ?.teaching?.user
                                                            ?.profileImage
                                                    }
                                                    alt={
                                                        fetchedTeaching
                                                            ?.teaching?.user
                                                            ?.userName
                                                    }
                                                    className="inline h-auto w-full my-auto  "
                                                />
                                            </div>

                                            <p className="text-base rounded-2xl  text-white">
                                                {
                                                    fetchedTeaching?.teaching
                                                        ?.user?.userName
                                                }
                                            </p>
                                        </div>

                                        <div
                                            direction="vertical"
                                            className=" flex flex-col gap-2 justify-center"
                                        >
                                            <div className="flex flex-col mx-auto justify-center">
                                                <div className=" flex justify-start items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-4 h-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                                        />
                                                    </svg>
                                                    <p className=" text-base rounded-2xl  text-white">
                                                        {moment(
                                                            fetchedTeaching
                                                                ?.teaching?.user
                                                                ?.createdAt
                                                        ).format('LLL')}
                                                    </p>
                                                </div>

                                                <div className="mt-4 flex items-center gap-4">
                                                    <p className="text-3xl font-medium">
                                                        3.8
                                                        <span className="sr-only">
                                                            {' '}
                                                            Average review score{' '}
                                                        </span>
                                                    </p>

                                                    <div>
                                                        <div className="flex">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-yellow-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-yellow-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-yellow-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-yellow-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5 text-gray-200"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        </div>

                                                        <p className="mt-0.5 text-xs text-gray-500">
                                                            Based on 48 reviews
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="w-full flex justify-center">
                                    <Button
                                        type="primary"
                                        className="hs-btn-m hs-btn-primary"
                                    >
                                        Visit website
                                    </Button>
                                </div> */}
                                    </div>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                        {requests?.learnRequests?.rows.map((teaching) => (
                            <UserCard key={teaching.id} detail={teaching} />
                        ))}
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
