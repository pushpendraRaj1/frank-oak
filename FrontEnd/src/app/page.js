import NavbarSlider from './Components/NavbarSlider.jsx'
import Navbar from './Components/Navigbar.jsx'
import MainPoster from './Components/MainPoster.jsx';
import Facilities from './Components/Facilities.jsx'
import FeaturedCategories from './Components/FeaturedCategories.jsx';
import QuickAdd from './Components/QuickAdd.jsx';
import HearFromUs from './Components/HearFromUs.jsx';
import Inspire_Better_Living from './Components/Inspire_Better_Living.jsx';
import Footer from './Components/Footer.jsx';

export default function Home() {

  return (
    <>
      <NavbarSlider />
      <Navbar />
      <MainPoster />
      <Facilities />
      <FeaturedCategories />
      <QuickAdd />
      <HearFromUs />
      <Inspire_Better_Living /> 
      <Footer />
    </>
  );
}
