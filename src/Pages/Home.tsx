
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
// import { lazy, Suspense } from 'react';


// const Header=lazy(()=>import("../Components/Header/Header"))
function Home() {
  return (
    <div className="homeParentDiv">

    {/* <Suspense fallback={<h1>loading..........</h1>}> */}
      <Header />
      <Banner />
      <Posts />
      <Footer />
    {/* </Suspense> */}
    </div>
  );
}

export default Home;
 
