import React, { useEffect } from "react";
import Ring3 from "../../../../public/ring3.png";
import Earring1 from "../../../../public/earring1.jpg";
import Nosering1 from "../../../../public/nosering1.webp";
import Necklace1 from "../../../../public/necklace1.jpg";
import NeckEarring1 from "../../../../public/neck_earring1.jpg";
import Pendant1 from "../../../../public/pendant1.jpg";
import PendantSet1 from "../../../../public/pendantset1.jpg";
import Bangels1 from "../../../../public/bangles1.jpg";
import GoldCoin1 from "../../../../public/goldcoin1.jpg";
import Bracelet1 from "../../../../public/bracelet1.jpg";
import GoldChain1 from "../../../../public/goldchain1.jpg";
import Mangalsutra1 from "../../../../public/mangalsutra1.jpg";
import { Banner } from "../../components/banner";
import FileUpload from "../../components/fileupload";
import JewelryOrderForm from "../../components/jewelleryorderform";
import { Card } from "../../components/card";
import { useRouter } from "next/navigation";
import { data, loadStateSession } from "../../utils";
import Contact from "@/app/contact/page";

export default function Home() {
  const categories = [
    {
      imageSrc: Mangalsutra1,
      productType: "Mangalsutras",
      redirect: "",
    },
    {
      imageSrc: Earring1,
      productType: "Earrings",
      redirect: "",
    },
    {
      imageSrc: Ring3,
      productType: "Rings",
      redirect: "",
    },
    {
      imageSrc: PendantSet1,
      productType: "Pendant Sets",
      redirect: "",
    },
    {
      imageSrc: Pendant1,
      productType: "Pendants",
      redirect: "",
    },
    {
      imageSrc: Nosering1,
      productType: "Nose Pins",
      redirect: "",
    },
    {
      imageSrc: GoldCoin1,
      productType: "Gold Shapes",
      redirect: "",
    },
    {
      imageSrc: GoldChain1,
      productType: "Chains",
      redirect: "",
    },
    {
      imageSrc: Bangels1,
      productType: "Bangles",
      redirect: "",
    },
    {
      imageSrc: Necklace1,
      productType: "Necklace",
      redirect: "",
    },
    {
      imageSrc: NeckEarring1,
      productType: "Necklace Set",
      redirect: "",
    },
    {
      imageSrc: Bracelet1,
      productType: "Bracelets",
      redirect: "",
    },
  ];

  return (
    <div className="ssj">
      <Banner />
      <div className="categories text-center">
        <h4 className="text-4xl text-[var(--brand-color1)] mb-[20px]">
          Explore & Shop
        </h4>
        <p>
          Explore diverse categories and shop with ease. Whatever you need, it
          is all here!
        </p>
        <div className="flex justify-center">
          <div className="p-[12px] sm:p-[24px] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-12">
            {categories.map((cat) => (
              <>
                <Card
                  url={cat.imageSrc}
                  productType={cat.productType}
                  key={cat.productType}
                />
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="already-have text-center">
        <h4 className="text-4xl text-[var(--brand-color1)] mb-[20px]">
          Upload a Snap
        </h4>
        <p>
          Already have something in mind we get it build for you. Just upload a
          picture of design you have in mind
        </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 p-[24px] gap-6 ">
            <FileUpload />
            <JewelryOrderForm />
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
}
