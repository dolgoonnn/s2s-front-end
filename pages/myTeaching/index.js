import React from 'react';
import MainLayout from '@components/layout/MainLayout';
import Header from '@components/template/Header';
import PageIllustration from '@components/template/PageIllustration';
import { useSession } from '@lib/context';
import { useTeacherTeaching } from '@lib/service';
import AdCard from '@components/template/AdCard';

export default function Index() {
    const { user } = useSession();
    const { data: myRequests } = useTeacherTeaching(user?.id);
    console.log('🚀 ~ file: index.js:11 ~ Index ~ myRequests:', myRequests);
    return (
        <MainLayout>
            {/*  Site header */}
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
                <section className="relative pt-32 max-w-6xl mx-auto px-4 sm:px-6">
                    <h4 className="h4 mb-4" data-aos="fade-up">
                        Миний нийтлэсэн сургалтууд
                    </h4>
                    {myRequests?.teachings?.rows.map((teaching) => (
                        <AdCard
                            key={teaching.id}
                            detail={teaching}
                            myTeaching={true}
                        />
                    ))}
                </section>
            </main>
        </MainLayout>
    );
}
