import { useEffect, SetStateAction } from "react";
import key from "weak-key";
import { DataTypes } from "../DataTypes";

type PaintingProps = {
  data: DataTypes | undefined;
  setData: React.Dispatch<SetStateAction<DataTypes | undefined>>;
  slideshowStarted: boolean;
  setSlideshowStarted: React.Dispatch<SetStateAction<boolean>>;
  setSlideshowIndex: React.Dispatch<SetStateAction<number>>;
};

const Painting = ({
  data,
  setData,
  slideshowStarted,
  setSlideshowStarted,
  setSlideshowIndex,
}: PaintingProps) => {
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

  const handlePaintingClick = (index: number) => {
    setSlideshowIndex(index);
    setSlideshowStarted(true);
  };

  return (
    <div className="painting__container">
      {!slideshowStarted && data
        ? data.map((painting, index) => {
            return (
              <div
                key={key(painting)}
                role="button"
                tabIndex={0}
                onKeyDown={() => handlePaintingClick(index)}
                onClick={() => handlePaintingClick(index)}
                className="painting"
              >
                <img
                  className="painting__image"
                  src={painting.images.thumbnail}
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
        : ""}
    </div>
  );
};

export default Painting;
