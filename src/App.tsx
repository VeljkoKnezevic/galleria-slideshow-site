import { useEffect, useState } from "react";
import "./styles/styles.scss";
import key from "weak-key";
import { DataTypes } from "./DataTypes";

const App = () => {
  const [data, setData] = useState<DataTypes>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../data.json");
        const json = await response.json();
        setData(json);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src="/assets/shared/logo.svg"
          alt="galleria logo"
        />
        <button className="header__image" type="button">
          Start Slideshow
        </button>
      </header>
      <main className="main">
        {data &&
          data.map((painting) => {
            return (
              <div className="painting" key={key(painting)}>
                <img
                  className="painting__image"
                  src={painting.images.hero.small}
                  alt={`${painting.name} by ${painting.artist.name}`}
                />
                <div className="painting__text">
                  <p className="painting__name">{painting.name}</p>
                  <p className="painting__author">{painting.artist.name}</p>
                </div>
              </div>
            );
          })}
      </main>
    </>
  );
};

export default App;
