import React, { use } from 'react';
import AdCard from './AdCard';
import { useAllTeaching } from '@lib/service';
import Link from 'next/link';

export default function Jobs() {
    const { data } = useAllTeaching();

    return (
        <div>
            <div className="w-full md:w-[75%] py-16  mx-auto space-y-8">
                <div className="flex justify-between">
                    <h4 className="h4 mb-4" data-aos="fade-up">
                        Сургалтууд
                    </h4>
                    <Link href={'/create'}>
                        <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full mb-4 sm:w-auto sm:mb-0">
                            <div className="flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="currentColor"
                                    className="w-4 h-4 stroke-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                Сургалт нэмэх
                            </div>
                        </button>
                    </Link>
                </div>
                {data?.teachings?.rows.map((course) => (
                    <AdCard key={course.id} detail={course} />
                ))}
            </div>
        </div>
    );
}
