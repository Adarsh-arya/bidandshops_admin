// import node module libraries
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { SSRProvider, Spinner } from 'react-bootstrap';
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import theme style scss file
import 'styles/theme.scss';
import NextNProgress from 'nextjs-progressbar';
// import default layouts
import DefaultDashboardLayout from 'layouts/DefaultDashboardLayout';
import checkAuth from 'lib/checkAuth';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Bid & Shops - Admin Dashboard";
  const description = "Dash is a fully responsive and yet modern premium Nextjs template & snippets. Geek is feature-rich Nextjs components and beautifully designed pages that help you create the best possible website and web application projects. Nextjs Snippet "
  const keywords = "Dash UI, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose"

  if (!router.pathname.includes("login") && router.route.startsWith("/admin") && typeof window !== 'undefined') {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      window.location.replace("/admin/login");
      return <></>
    }
  }
  // Identify the layout, which will be applied conditionally
  const Layout = Component.Layout || (router.pathname.includes('dashboard') ?
    (router.pathname.includes('instructor') || router.pathname.includes('student') ?
      DefaultDashboardLayout : DefaultDashboardLayout) : DefaultDashboardLayout)
  if (!router.route.startsWith('/admin')) {
    return <SSRProvider>
      <NextNProgress color="#624bff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName
        }}
      />
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SSRProvider>
  }
  return (
    <SSRProvider>
      <NextNProgress color="#624bff" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName
        }}
      />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Analytics />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
