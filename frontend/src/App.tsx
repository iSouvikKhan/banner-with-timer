import { useState, useEffect } from 'react';
import './App.css';
import { Banner } from './components/Banner';
import { BannerForm } from './components/BannerForm';
import { API_BASE_URL } from './config';

function App() {
  const [bannerText, setBannerText] = useState<string>("Default Banner Text");
  const [hrefLink, setHrefLink] = useState<string>("#default-link");
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    fetch(`${API_BASE_URL}/entries`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const fetchedDate = new Date(data.providedDatetime);
          const now = new Date();

          if (fetchedDate > now) {
            setBannerText(data.description);
            setHrefLink(data.url);
            setTargetDate(fetchedDate);
          }
        }
      })
      .catch((error) => console.error('Error fetching latest entry:', error));
  }, []);

  const handleFormSubmit = (text: string, link: string, date: Date) => {
    fetch(`${API_BASE_URL}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: text,
        url: link,
        providedDatetime: date.toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBannerText(data.description);
        setHrefLink(data.url);
        setTargetDate(new Date(data.providedDatetime));
      })
      .catch((error) => console.error('Error posting new entry:', error));
  };

  const resetTimer = () => {
    setTargetDate(new Date());
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Banner bannerText={bannerText} hrefLink={hrefLink} targetDate={targetDate} />
      <BannerForm
        onSubmit={handleFormSubmit}
        resetTimer={resetTimer}
      />
    </div>
  );
}

export default App;
