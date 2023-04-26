import { useEffect, SetStateAction, useState } from "react";
import key from "weak-key";
import { DataTypes } from "../DataTypes";
import Slideshow from "./Slideshow";

type PaintingProps = {
  data: DataTypes | undefined;
  setData: React.Dispatch<SetStateAction<DataTypes | undefined>>;
};

const Painting = ({ data, setData }: PaintingProps) => {
  const [slideshowPaintingName, setSLideshowPaintingName] = useState("");

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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!slideshowPaintingName && data
        ? data.map((painting) => {
            return (
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() => setSLideshowPaintingName(painting.name)}
                onClick={() => setSLideshowPaintingName(painting.name)}
                className="painting"
                key={key(painting)}
              >
                <img
                  className="painting__image"
                  src={painting.images.hero.small}
                  alt={`${painting.name} by ${painting.artist.name}`}
                />
                <div className="painting__tint">
                  <div className="painting__text">
                    <p className="painting__name">{painting.name}</p>
                    <p className="painting__author">{painting.artist.name}</p>
                  </div>
                </div>
              </div>
            );
          })
        : slideshowPaintingName && (
            <Slideshow
              data={data}
              slideshowPaintingName={slideshowPaintingName}
            />
          )}
    </>
  );
};

export default Painting;
