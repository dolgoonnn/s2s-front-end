import '@assets/styles/globals.css';
import {
    clearToken,
    getUserIdIfLogged,
    saveToken,
    saveUserId,
} from '@lib/auth';
import { SessionContext } from '@lib/context';
import { mutateUserProfile, useUserProfile } from '@lib/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '@assets/styles/globals.sass';
import MainHead from '@components/layout/mainHead';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const userIdLocal = getUserIdIfLogged();

    const [authorized, setAuthorized] = useState(false);
    const [userId, setUserId] = useState('');
    const { data: user, loading } = useUserProfile(userId || userIdLocal);
    const [isLoading, setIsLoading] = useState(false);
    const signIn = async (data) => {
        setUserId(data.user.uuid);
        // setIsClaimed(data.user.isClaimedRegisterAirdrop);
        await saveToken(data);
        await saveUserId(data.user.uuid);
        await mutateUserProfile(data.user.uuid);
        setAuthorized(true);
    };

    const signOut = async () => {
        await clearToken();
        await mutateUserProfile(userId);
        setAuthorized(false);
    };
    function authCheck(url) {
        const publicPaths = [
            '/',
            '/login',
            '/register',
            '/recovery',
            '/builds',
            '/jobs',
            '/community',
            '/buy-token',
            '/addCourse',
        ];
        //todo profile path shalgah regex ynzlah

        const regexPaths = [
            /^\/builds\/(\d+)$/,
            /^\/profile\/[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
            /^\/jobs\/(\d+)$/,
        ];

        const path = url.split('?')[0];
        const includedPath =
            publicPaths.includes(path) || regexPaths.some((r) => r.test(path));

        if (!user && !includedPath && !loading) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        authCheck(window.location.pathname);
    }, [user, loading, router.asPath]);

    const title = pageProps?.title ? pageProps.title : 'Нүүр';
    const description = pageProps?.description
        ? pageProps.description
        : 'S2S.MN';
    const image = pageProps?.image
        ? pageProps.image
        : `https://s2s-front-end.vercel.app/logos2s.png`;
    return (
        <>
            <MainHead
                title={title}
                // slug={slug}
                image={image}
                description={description}
            />
            <SessionContext.Provider value={{ user, loading, signIn, signOut }}>
                {authorized && <Component {...pageProps} />}
            </SessionContext.Provider>
        </>
    );
}
