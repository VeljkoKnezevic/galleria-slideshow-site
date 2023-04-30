import key from "weak-key";
import { SetStateAction, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { DataTypes } from "../DataTypes";

type SlideshowProps = {
  data: DataTypes | undefined;
  slideshowIndex: number;
  setSlideshowIndex: React.Dispatch<SetStateAction<number>>;
};

const Slideshow = ({
  data,
  slideshowIndex,
  setSlideshowIndex,
}: SlideshowProps) => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const calcProgress = () => {
      const trackWidth = (slideshowIndex + 1) * 6.67;

      setProgress(trackWidth);
    };

    calcProgress();
  }, [slideshowIndex]);

  const handleNextClick = () => {
    setSlideshowIndex(slideshowIndex + 1);
  };

  const handlePrevClick = () => {
    setSlideshowIndex(slideshowIndex - 1);
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <>
      {data &&
        data.map((painting, index) => {
          const slides = [
            {
              src: painting.images.gallery,
            },
          ];
          if (index === slideshowIndex) {
            return (
              <div className="slideshow" key={key(painting)}>
                <div className="slideshow__wrapper">
                  <img
                    className="slideshow__painting"
                    src={
                      isMobile
                        ? painting.images.hero.small
                        : painting.images.hero.large
                    }
                    alt={`${painting.name} by ${painting.artist.name}`}
                  />
                  <button
                    onClick={() => setOpen(true)}
                    className="slideshow__button"
                    type="button"
                  >
                    view image
                  </button>
                  <div className="slideshow__name-and-artist">
                    <h2 className="slideshow__name">{painting.name}</h2>
                    <p className="slideshow__artist">{painting.artist.name}</p>
                  </div>
                  <img
                    className="slideshow__artist-photo"
                    src={painting.artist.image}
                    alt={painting.artist.name}
                  />
                  <p className="slideshow__age">{painting.year}</p>
                  <p className="slideshow__para">{painting.description}</p>
                  <a className="slideshow__source" href={painting.source}>
                    Go to source
                  </a>
                </div>
                <div className="slider">
                  <div className="slider__bar">
                    <div
                      className="slider__track"
                      style={{
                        width: `${progress}%`,
                      }}
                    ></div>
                  </div>
                  <div className="slider__content">
                    <div className="slider__name-and-artist">
                      <p className="slider__name">{painting.name}</p>
                      <p className="slider__artist">{painting.artist.name}</p>
                    </div>
                    <div className="slider__buttons">
                      <button
                        className="slider__prev slider__button"
                        type="button"
                        aria-label="previous painting"
                        onClick={handlePrevClick}
                        disabled={slideshowIndex === 0}
                      ></button>
                      <button
                        className="slider__next slider__button"
                        type="button"
                        aria-label="next painting"
                        onClick={handleNextClick}
                        disabled={slideshowIndex === 14}
                      ></button>
                    </div>
                  </div>
                </div>
                {/* Lightbox that renders on button click */}
                {open && (
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    carousel={{ finite: slides.length <= 1 }}
                    render={{
                      buttonPrev: slides.length <= 1 ? () => null : undefined,
                      buttonNext: slides.length <= 1 ? () => null : undefined,
                      iconClose: () => "close",
                    }}
                    slides={slides}
                  />
                )}
              </div>
            );
          }
          return "";
        })}
    </>
  );
};

export default Slideshow;
