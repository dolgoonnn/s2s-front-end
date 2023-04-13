import moment from 'moment';
import { useRouter } from 'next/router';
import { Popconfirm, notification } from 'antd';
import { useState } from 'react';

export default function UserCard({ detail }) {
    const [loading, setLoading] = useState(false);
    console.log('🚀 ~ file: AdCard.js:4 ~ AdCard ~ detail:', detail);

    const cancel = (e) => {};

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
            openNotificationWithIcon(
                'success',
                'Амжилттай хүсэлтийг зөвшөөрлөө'
            );
            // mutateProjectComments(comment.id);
            setLoading(false);
            return;
        } else {
            openNotificationWithIcon('error', 'Failed to approve request');
        }
    };

    return (
        <div className="group">
            <div
                className={`rounded-xl shadow-md
                   bg-gray-800
                  text-gray-200  `}
            >
                <div className="py-6 px-4">
                    <div className="flex items-center">
                        <div className="ml-3 flex flex-col md:flex-row justify-between w-full align-middle">
                            <div className="flex flex-col md:flex-row">
                                <div>
                                    <div className="flex items-center mb-1">
                                        <p className="text-base  ">
                                            {detail?.user?.userName}
                                        </p>
                                        {/* {detail?.type != 'FREE' && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4 ml-1 text-primary"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )} */}
                                    </div>
                                    <a
                                    // onClick={() => {
                                    //     router.push({
                                    //         pathname: '/jobs/[jobId]',
                                    //         query: {
                                    //             jobId: detail.id,
                                    //         },
                                    //     });
                                    // }}
                                    >
                                        <h3 className="text-xl mb-2 font-bold tracking-wide hover:cursor-pointer">
                                            {detail?.title}
                                        </h3>
                                    </a>
                                    <div className="flex flex-row gap-2 mt-1">
                                        <div className="inline-flex rounded-full font-semibold text-xs py-1 px-3  bg-blue-200 text-blue-600 mb-4">
                                            {detail?.price}
                                        </div>
                                        <div className="inline-flex text-xs font-semibold py-1 px-3  text-green-600 bg-green-200 rounded-full mb-4">
                                            {detail?.code}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="p-2 mt-1  rounded-2xl text-lg text-white">
                                {detail?.description}
                            </div> */}
                            <div className="flex flex-row min-w-32  justify-start  gap-4 md:justify-center my-auto h-full">
                                <p className="rounded-2xl text-base text-gray-200 my-auto   block ">
                                    {moment(detail?.createdAt).fromNow()}
                                </p>
                                <Popconfirm
                                    title="Хүсэлтээ явуулах"
                                    onConfirm={confirmRequestSend}
                                    onCancel={cancel}
                                    okText="Явуулах"
                                    cancelText="Болих"
                                >
                                    <button className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mb-4 sm:w-auto sm:mb-0  md:group-hover:block md:my-auto">
                                        Зөвшөөрөх
                                    </button>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
