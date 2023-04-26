import { DataTypes } from "../DataTypes";

type SlideshowProps = {
  data: DataTypes | undefined;
  slideshowPaintingName: string;
};

const Slideshow = ({ data, slideshowPaintingName }: SlideshowProps) => {
  // If there is slideshowname and slideshow
  // started show the one with the name
  // else show the first one if only on button click

  return <div>{slideshowPaintingName}</div>;
};

export default Slideshow;
