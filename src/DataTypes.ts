export type DataTypes = {
  name: string;
  year: number;
  description: string;
  source: string;
  artist: Artist;
  images: Images;
}[];

export type Artist = {
  image: string;
  name: string;
};

export type Images = {
  thumbnail: string;
  hero: Hero;
  gallery: string;
};

export type Hero = {
  small: string;
  large: string;
};
