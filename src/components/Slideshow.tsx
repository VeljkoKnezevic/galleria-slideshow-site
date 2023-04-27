import key from "weak-key";
import { SetStateAction, useState } from "react";
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

  const handleNextClick = () => {
    if (slideshowIndex === 14) {
      setSlideshowIndex(0);
    } else {
      setSlideshowIndex(slideshowIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (slideshowIndex === 0) {
      setSlideshowIndex(14);
    } else {
      setSlideshowIndex(slideshowIndex - 1);
    }
  };

  return (
    <div>
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
                <img
                  className="slideshow__painting"
                  src={painting.images.thumbnail}
                  alt={`${painting.name} by ${painting.artist}`}
                />
                <button
                  onClick={() => setOpen(true)}
                  className="slideshow__button"
                  type="button"
                >
                  view image
                </button>

                <div className="slideshow__name-and-author">
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
                <a href={painting.source}>Go to source</a>
                <div className="slider">
                  <div className="slider__bar"></div>
                  <div className="slider__name-and-artist">
                    <p className="slider__name">{painting.name}</p>
                    <p className="slider__artist">{painting.artist.name}</p>
                  </div>
                  <div className="slider__buttons">
                    <button
                      className="slider__prev"
                      type="button"
                      aria-label="previous painting"
                      onClick={handlePrevClick}
                    >
                      <img src="/assets/shared/icon-back-button.svg" alt="" />
                    </button>
                    <button
                      className="slider__next"
                      type="button"
                      aria-label="next painting"
                      onClick={handleNextClick}
                    >
                      <img src="/assets/shared/icon-next-button.svg" alt="" />
                    </button>
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
                    }}
                    slides={slides}
                  />
                )}
              </div>
            );
          }
          return "";
        })}
    </div>
  );
};

export default Slideshow;
