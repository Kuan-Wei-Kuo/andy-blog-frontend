  
import Head from 'next/head';
import Header from './Header';

const BASE_PATH = 'https://blog.andykuo.net';
const FAVICON = '/static/images/favicon.ico';
const OG_IMAGE = 'https://avatars3.githubusercontent.com/u/7732396?s=400&u=11266b2bd0aef8df8d7cfe9b30bb68293316dbe0&v=4';

export default function Layout({ title, description, asPath, children }) {
    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8"></meta>

                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <link rel="canonical" href={BASE_PATH + asPath}/>
                <link rel="icon" type="image/x-icon" href={FAVICON} />
                
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={BASE_PATH + asPath} />
                <meta property="og:image" content={OG_IMAGE} />
            </Head>
            <Header />
            {children}
        </React.Fragment>
    )
}