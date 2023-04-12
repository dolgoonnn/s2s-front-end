import React from 'react';
import MainLayout from '@components/layout/MainLayout';
import Header from '@components/template/Header';
import PageIllustration from '@components/template/PageIllustration';
import { useRouter } from 'next/router';
import {
    useOneTeaching,
    useTeacherTeaching,
    getTeacherTeaching,
} from '@lib/service';
import { useEffect } from 'react';

export default function Detail() {
    const router = useRouter();
    const id = router.query.id;
    const { data: fetchedTeaching } = useOneTeaching(id);
    console.log('🚀 ~ file: [id].js:12 ~ Detail ~ teaching:', fetchedTeaching);
    const { data: userTeaching } = useTeacherTeaching(
        fetchedTeaching?.teaching?.userId
    );
    console.log('🚀 ~ file:', userTeaching);
    // const fetchData = async (id) => {
    //     console.log('🚀 ~ file: [id].js:23 ~ fetchData ~ id:', id);
    //     const { data } = await getTeacherTeaching(id);
    //     console.log('🚀 ~ file: [id].js:18 ~ fetchData ~ data:', data);
    // };

    // useEffect(() => {
    //     if (fetchedTeaching) {
    //         fetchData(fetchedTeaching?.teaching?.userId);
    //     }
    // }, [fetchedTeaching]);

    console.log('🚀 ~ file: [id].js:12 ~ Detail ~ teaching:', userTeaching);

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
            </main>
        </MainLayout>
    );
}
