import Head from 'next/head';
import { useRouter } from 'next/router';

function MainHead({ title, image, slug, description }) {
    const logo = '/logos2s.png';
    const router = useRouter();

    return (
        <Head>
            <meta
                property="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <meta property="theme-color" content="#000000" />
            <meta name="author" content="developed by ymc.mn" />
            <title>{`${title} | s2s.mn`}</title>
            <meta name="title" content={`${title} | s2s.mn`} />
            <meta name="description" content={description} />

            <link rel="icon" type="image/png" sizes="32x32" href={logo} />
            <link rel="icon" type="image/png" sizes="96x96" href={logo} />
            <link rel="icon" type="image/png" sizes="16x16" href={logo} />
            <link rel="manifest" href="/favicon/manifest.json" />
            <meta
                property="robots"
                content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />

            <meta property="og:type" content="website" key="website" />
            <meta
                property="og:title"
                content={`${title} | s2s.mn`}
                key="ogtitle"
            />
            <meta
                property="og:description"
                content={description}
                key="ogdesc"
            />

            <meta
                property="og:url"
                content={`https://www.s2s.mn${router.asPath}`}
            />
            <meta property="og:site_name" content="s2s.mn" />
            <meta property="og:image" content={image} key="ogimage" />
            <meta
                property="og:image:secure_url"
                content={image}
                key="ogimagesecure"
            />
            <meta property="og:image:width" content="1170" key="ogimagewidth" />
            <meta
                property="og:image:height"
                content="630"
                key="ogimageheight"
            />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="s2s.mn" />
            <meta property="twitter:url" content="https://www.s2s.mn/" />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:title" content={`${title} | s2s.mn`} />
            <meta property="twitter:image" content={image} />
        </Head>
    );
}

export default MainHead;
