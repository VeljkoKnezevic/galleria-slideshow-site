import { SetStateAction } from "react";

type HeaderProps = {
  slideshowStarted: boolean;
  setSlideshowStarted: React.Dispatch<SetStateAction<boolean>>;
};

const Header = ({ slideshowStarted, setSlideshowStarted }: HeaderProps) => {
  return (
    <header className="header">
      <h1>
        <img
          className="header__logo"
          src="/assets/shared/logo.svg"
          alt="galleria logo"
        />
      </h1>
      <button
        onClick={() => setSlideshowStarted(!slideshowStarted)}
        className="header__button"
        type="button"
      >
        {slideshowStarted ? "Stop Slideshow" : "Start Slideshow"}
      </button>
    </header>
  );
};

export default Header;
