import moment from 'moment';
import { useRouter } from 'next/router';

export default function AdCard({ detail }) {
    console.log('🚀 ~ file: AdCard.js:4 ~ AdCard ~ detail:', detail);
    // const detail = props.data;
    const router = useRouter();
    return (
        <div className="group">
            <div
                className={`rounded-xl shadow-md
                   bg-gray-800
                  text-gray-200  `}
            >
                <div className="py-6 px-4">
                    <a
                        onClick={() => {
                            router.push({
                                pathname: '/teaching/[id]',
                                query: {
                                    id: detail.id,
                                },
                            });
                        }}
                    >
                        <div className="flex items-center">
                            <div className="ml-3 flex flex-col md:flex-row justify-between w-full align-middle">
                                <div className="flex flex-col md:flex-row">
                                    <div className="h-14 bg-white w-14 mr-5 my-auto rounded-full overflow-hidden flex items-center ">
                                        {detail?.logoImageUrl && (
                                            <img
                                                src={detail.logoImageUrl}
                                                alt={detail?.company}
                                                className="inline h-auto w-full "
                                            />
                                        )}
                                    </div>
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
                                                {detail?.description}
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
                                <div className="flex flex-row min-w-32  justify-start  gap-2 md:justify-center my-auto h-full">
                                    <button
                                        className="btn-sm text-white bg-purple-600 hover:bg-purple-700 mb-4 sm:w-auto sm:mb-0 block md:hidden md:group-hover:block md:my-auto"
                                        // onClick={() => {
                                        //     router.push({
                                        //         pathname: '/jobs/[jobId]',
                                        //         query: {
                                        //             jobId: detail.id,
                                        //         },
                                        //     });
                                        // }}
                                    >
                                        <div className="flex items-center gap-2">
                                            Дэлгэрэнгүй
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                    <p className="rounded-2xl text-base text-gray-200 mt-1 md:mt-0 md:my-auto block md:group-hover:hidden">
                                        {moment(detail?.createdAt).fromNow()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
