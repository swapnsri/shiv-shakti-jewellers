import { StaticImageData } from "next/image";
import Bride1 from "../../../public/bride1.jpg";
import Bride2 from "../../../public/bride2.jpg";
import Bride3 from "../../../public/bride3.jpg";
import Bride4 from "../../../public/bride4.jpg";
import Bride5 from "../../../public/bride5.jpg";
import Set1 from "../../../public/set1.jpg";
import Set3 from "../../../public/set3.jpg";
import Set4 from "../../../public/set4.jpg";
import Set5 from "../../../public/set5.jpg";
import Set6 from "../../../public/set6.jpg";
import Set7 from "../../../public/set7.jpg";
import Necklace1 from "../../../public/necklace1.jpg";
import Necklace2 from "../../../public/necklace2.jpg";
import NeckEarring1 from "../../../public/neck_earring1.jpg";

export type ImageProps = {
  src: StaticImageData;
};

export const setImages: ImageProps[] = [
  {
    src: Set3,
  },
  {
    src: Set1,
  },
  {
    src: Set4,
  },
  {
    src: Set5,
  },
  {
    src: Set6,
  },
];
export const brideImages: ImageProps[] = [
  {
    src: Bride1,
  },
  {
    src: Bride2,
  },
  {
    src: Bride3,
  },
  {
    src: Bride4,
  },
  {
    src: Bride5,
  },
];
export const necklaceImages: ImageProps[] = [
  {
    src: Necklace1,
  },
  {
    src: Necklace2,
  },
];
export const neckEarringImages: ImageProps[] = [
  {
    src: NeckEarring1,
  },
];
