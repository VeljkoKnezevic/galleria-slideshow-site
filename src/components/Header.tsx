const Header = () => {
  return (
    <header className="header">
      <h1>
        <img
          className="header__logo"
          src="/assets/shared/logo.svg"
          alt="galleria logo"
        />
      </h1>
      <button className="header__button" type="button">
        Start Slideshow
      </button>
    </header>
  );
};

export default Header;
