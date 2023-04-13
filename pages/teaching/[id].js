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
import Chat from '@components/modal/chat';

export default function Detail() {
    const [loading, setLoading] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [chatModal, setChatModal] = useState(false);
    const [requestStatus, setRequestStatus] = useState({});

    const router = useRouter();
    const { user } = useSession();
    const id = router.query.id;
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
        console.log(
            '🚀 ~ file: [id].js:61 ~ fetchTeachingRequests ~ data:',
            data
        );

        const sentRequest = data?.learnRequests?.rows.find(
            (c) => c.userId == user.id
        );
        if (sentRequest) {
            setRequestSent(true);
            setRequestStatus(sentRequest?.status);
        }
        console.log(
            '🚀 ~ file: [id].js:66 ~ fetchTeachingRequests ~ sentRequest:',
            sentRequest
        );
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
                    <div className=" mt-28 space-y-7 max-w-6xl mx-auto px-4 sm:px-6 relative">
                        <div className="flex flex-col-reverse md:flex-row">
                            <Space
                                direction="vertical"
                                className=" w-full h-full"
                            >
                                <Link href={'/'}>
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
                                    className="hs-markdown pb-28"
                                ></div>
                                <div className="py-28">
                                    <h4 className="h4 mb-4">
                                        Бусад сургалтууд
                                    </h4>
                                    <div className="space-y-8">
                                        {userTeaching &&
                                            userTeaching?.teachings?.rows
                                                .filter(
                                                    (teaching) =>
                                                        teaching.id !=
                                                        fetchedTeaching
                                                            ?.teaching?.userId
                                                )
                                                .map((teaching) => (
                                                    <AdCard
                                                        key={teaching.id}
                                                        detail={teaching}
                                                    />
                                                ))}
                                    </div>
                                </div>
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
                                                <p className="mt-0.5 text-xs text-gray-500">
                                                    Бүртгүүлсэн
                                                </p>
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
                                                        4
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
                                                            Based on 2 reviews
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
                                {requestSent ? (
                                    requestStatus == 'APPROVED' ? (
                                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4  sm:mb-0">
                                            Хүсэлт баталгаажсан✅
                                        </button>
                                    ) : (
                                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4  sm:mb-0">
                                            Хүсэлт явсан
                                        </button>
                                    )
                                ) : (
                                    <Popconfirm
                                        title="Хүсэлтээ явуулах"
                                        onConfirm={confirmRequestSend}
                                        onCancel={cancel}
                                        okText="Явуулах"
                                        cancelText="Болих"
                                    >
                                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4  sm:mb-0">
                                            Бүртгүүлэх
                                        </button>
                                    </Popconfirm>
                                )}
                                <button className="btn text-white bg-gray-700 hover:bg-gray-800 w-full mb-4  sm:mb-0">
                                    Холбоо барих
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <button
                onClick={() => setChatModal(true)}
                title="Contact Sale"
                className="fixed z-90 bottom-10 right-8 bg-purple-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-purple-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                </svg>
            </button>
            <Chat
                visible={chatModal}
                setVisible={() => setChatModal(false)}
                id={id}
                detail={fetchedTeaching?.teaching}
            />
        </MainLayout>
    );
}
