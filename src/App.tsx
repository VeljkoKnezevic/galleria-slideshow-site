import { useState } from "react";
import "./styles/styles.scss";
import { DataTypes } from "./DataTypes";
import Header from "./components/Header";
import Painting from "./components/Painting";
import Slideshow from "./components/Slideshow";

const App = () => {
  const [data, setData] = useState<DataTypes>();
  const [slideshowStarted, setSLideshowStarted] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  return (
    <>
      <Header
        setSlideshowStarted={setSLideshowStarted}
        slideshowStarted={slideshowStarted}
      />
      <main className="main">
        {slideshowStarted ? (
          <Slideshow
            data={data}
            slideshowIndex={slideshowIndex}
            setSlideshowIndex={setSlideshowIndex}
          />
        ) : (
          <Painting
            slideshowStarted={slideshowStarted}
            setSlideshowStarted={setSLideshowStarted}
            data={data}
            setData={setData}
            setSlideshowIndex={setSlideshowIndex}
          />
        )}
      </main>
    </>
  );
};

export default App;
