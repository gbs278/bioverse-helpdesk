// pages/_app.js

import Navbar from '../components/Navbar';
import '../styles/globals.css'; // Import your global styles if any

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
