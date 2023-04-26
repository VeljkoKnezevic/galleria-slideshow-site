import { useState } from "react";
import "./styles/styles.scss";
import { DataTypes } from "./DataTypes";
import Header from "./components/Header";
import Painting from "./components/Painting";

const App = () => {
  const [data, setData] = useState<DataTypes>();
  const [slideshowStarted, setSLideshowStarted] = useState(false);

  return (
    <>
      <Header
        setSlideshowStarted={setSLideshowStarted}
        slideshowStarted={slideshowStarted}
      />
      <main className="main">
        <Painting
          slideshowStarted={slideshowStarted}
          setSlideshowStarted={setSLideshowStarted}
          data={data}
          setData={setData}
        />
      </main>
    </>
  );
};

export default App;
