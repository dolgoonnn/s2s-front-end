import React, { use } from 'react';
import AdCard from './AdCard';
import { useAllTeaching } from '@lib/service';

export default function Jobs() {
    const mockData = {
        company: 'TomYo Edtech',
        contactEmail: 'bayar@tomyo.mn',
        contactPhone: '88888003',
        createdAt: '2023-03-20T09:19:24.485Z',
        description:
            '<p>- Дэлхийн түвшинд сэтгэж инженерийн төслийн архитектур гаргаж, загварчлана <br/>- Бусад багийн хүмүүстэй харилцаж, бизнесийн шийдвэр гаргалтанд оролцоно <br/>- АPI, сервис, системүүдийг хөгжүүлж, загварчилж, хариуцаж авч явна <br/>- Туршлага багатай инженерүүдэд зааж, зөвлөнө</p><p>Requirements</p><p>- Мэдээлэл зүй, физик, математик, инженер, програм хангамжийн чиглэлээр бакалавр болон түүнээс дээш зэрэгтэй<br/>- 3-с дээш жил ажилласан туршлагатай <br/>- Дээд, доод түвшний хэл ашиглан олон төрлийн платформ дээр ажилласан туршлагатай. Дараах технологи дээр туршлагатай бол давуу талтай: Node.JS, React, React-Native/JavaScript, PostgreSQL, API Services, AWS services)</p>',
        expiresAt: '2023-04-19T09:19:24.485Z',
        id: 14,
        isLive: true,
        job: 'Backend Engineer',
        logoImageUrl:
            'https://api.monk.mn/uploadFiles/companyLogo/1003204d0287124d23966644fb7fb673.png',
        publishedAt: '2023-03-20T09:19:24.485Z',
        salary: '2000000 - 3500000',
        status: null,
        txHash: null,
        type: 'THIRTY',
        updatedAt: '2023-03-20T09:19:24.485Z',
        userId: 27,
        workWay: 'on-site',
    };

    const { data } = useAllTeaching();
    console.log('🚀 ~ file: Jobs.js:30 ~ Jobs ~ data:', data);

    return (
        <div>
            <div className="w-full md:w-[75%] py-16  mx-auto space-y-8">
                <div className="flex justify-between">
                    <h4 className="h4 mb-4" data-aos="fade-up">
                        Сургалтууд
                    </h4>
                    <a href={'/newJob'}>
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
                    </a>
                </div>
                <AdCard detail={mockData} />
            </div>
        </div>
    );
}
