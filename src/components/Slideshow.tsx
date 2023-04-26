import { DataTypes } from "../DataTypes";

type SlideshowProps = {
  data: DataTypes | undefined;
  slideshowPaintingName: string;
};

const Slideshow = ({ data, slideshowPaintingName }: SlideshowProps) => {
  return <div>{slideshowPaintingName}</div>;
};

export default Slideshow;
