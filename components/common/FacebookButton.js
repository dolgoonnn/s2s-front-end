import React from 'react';
import { signInFacebook } from '@lib/auth';
import Facebook from '@assets/svgs/facebook.svg';
import { useSession } from '@lib/context';
import { Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useRouter } from 'next/router';

const FACEBOOK_ID = process.env.FACEBOOK_CLIENT_ID || '619429429644033';

export default function FacebookButton() {
    const { signIn, user } = useSession();
    console.log(
        '🚀 ~ file: FacebookButton.js:13 ~ FacebookButton ~ user:',
        user
    );
    const router = useRouter();
    useEffect(() => {
        // user && router.push('/profile/wallet')
        user && router.back();
    }, [user, router]);
    const [loading, setLoading] = useState(false);
    const openNotificationWithIcon = (type, data) => {
        notification[type]({
            message: type === 'success' ? 'Амжилттай' : 'Алдаа гарлаа',
            description: data,
        });
    };

    const handleFailure = (error) => {
        // console.log('handleFailure - ', error)
    };

    const responseFacebook = async (response) => {
        const { accessToken, userID } = response;
        const data = await signInFacebook(accessToken, userID);
        console.log(
            '🚀 ~ file: FacebookButton.js:32 ~ responseFacebook ~ data:',
            data
        );
        if (!!data) {
            openNotificationWithIcon('success', 'welcome');
        }
        await signIn(data);
    };

    const onClick = (renderProps) => {
        if (!!renderProps) {
            setLoading(true);
            renderProps?.onClick();
        }
        return null;
    };

    const renderFacebookButton = (renderProps) => {
        return (
            <Button
                onClick={() => onClick(renderProps)}
                block
                className="btn px-0 text-white hover:text-gray-200 bg-gray-700 hover:bg-gray-800 w-full relative flex items-center"
                loading={loading}
            >
                <div className="flex gap-2">
                    <span className="customicon">
                        <Facebook />
                    </span>
                    Facebook
                </div>
            </Button>
        );
    };

    return (
        <FacebookLogin
            appId={FACEBOOK_ID}
            disableMobileRedirect={true}
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderFacebookButton}
        />
    );
}
