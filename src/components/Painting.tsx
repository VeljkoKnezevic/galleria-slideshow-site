import { useEffect, SetStateAction } from "react";
import key from "weak-key";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
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
        const response = await fetch("../../data.json");
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

  const breakpoints = {
    default: 4,
    1100: 3,
    900: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="painting"
      columnClassName="my-masonry-grid_column"
    >
      {!slideshowStarted && data
        ? data.map((painting, index) => {
            return (
              <AnimatePresence key={key(painting)}>
                <motion.div
                  initial={{ x: -200 }}
                  animate={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 0.5 }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => handlePaintingClick(index)}
                  onClick={() => handlePaintingClick(index)}
                  className="painting__container"
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
                </motion.div>
              </AnimatePresence>
            );
          })
        : ""}
    </Masonry>
  );
};

export default Painting;
