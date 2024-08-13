import { useState } from 'react';
import './App.css'
import { Banner } from './components/Banner'
import { BannerForm } from './components/BannerForm';

function App() {

  const [bannerText, setBannerText] = useState<string>("Default Banner Text");
  const [hrefLink, setHrefLink] = useState<string>("#default-link");
  const [targetDate, setTargetDate] = useState<Date>(new Date("2024-08-13T05:39:20"));

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Banner
        bannerText={bannerText}
        hrefLink={hrefLink}
        targetDate={targetDate}
      />
      <BannerForm
        setBannerText={setBannerText}
        setHrefLink={setHrefLink}
        setTargetDate={setTargetDate}
      />
    </div>
  );
}

export default App
