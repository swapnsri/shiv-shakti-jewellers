export type ProductTypes = {
  productData: {
    productType: string;
    name: string;
    description: string;
    weightDetails: {
      gwt: string;
      less: string;
      nwt: string;
      Purity: string;
      silver: string;
    };
    rateDetails: {
      rate: string;
      labour: string;
      amount: string;
    };
    imageId: string;
    imageUrl?: string;
    cloudPublicID: string;
  };
  _id: string;
};

export const products = [
  {
    id: 1,
    productType: "gold",
    name: "CUT STONE PAYAL S KUND",
    image: "https://images.pexels.com/photos/2732096/pexels-photo-2732096.jpeg",
    description: null,
    gwt: "25.500", //gross weight
    less: null,
    nwt: "25.500", //net weight
    Purity: "100.000",
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "11.00 Wt",
    silver: "S 25.500",
    amount: "₹281",
  },
  {
    id: 2,
    productType: "gold",
    name: "SWROSKI PAYAL",
    image:
      "https://images.pexels.com/photos/1454185/pexels-photo-1454185.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: null,
    gwt: "211.850", //gross weight
    less: "5.760",
    nwt: "206.090", //net weight
    Purity: "100.000",
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "32.00 Wt",
    silver: "S 206.090",
    amount: "₹6595",
  },
  {
    id: 3,
    productType: "silver",
    name: "EVIL EYE BR",
    image:
      "https://images.pexels.com/photos/1687719/pexels-photo-1687719.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: null,
    gwt: "20.550", //gross weight
    less: "0.900",
    nwt: "19.650", //net weight
    Purity: "100.000",
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "14.00 Wt",
    silver: "S 19.650",
    amount: "₹275",
  },
  {
    id: 4,
    productType: "silver",
    name: "CZ CUBIC BR",
    image:
      "https://images.pexels.com/photos/2802786/pexels-photo-2802786.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: null,
    gwt: "19.050", //gross weight
    less: "0.450",
    nwt: "18.600", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "135.00 Wt",
    silver: null,
    amount: "₹2511",
  },
  {
    id: 5,
    productType: "1 gram",
    name: "GOD PENDANTS",
    image:
      "https://images.pexels.com/photos/2673365/pexels-photo-2673365.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "19x0.250=4.750",
    gwt: "61.300", //gross weight
    less: "4.750",
    nwt: "56.550", //net weight
    Purity: "100.000",
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "10.00 Wt",
    silver: "S 56.550",
    amount: "₹556",
  },
  {
    id: 6,
    productType: "1 gram",
    name: "SINGLE SOLITAIRE LR",
    image:
      "https://images.pexels.com/photos/6624862/pexels-photo-6624862.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "7x0.130=0.910,6x0.160=0.960,3x0.250=0.750",
    gwt: "44.600", //gross weight
    less: "2.620",
    nwt: "41.980", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "118.00 Wt",
    silver: null,
    amount: "₹4954",
  },
  {
    id: 7,
    productType: "1 gram",
    name: "SOLITAIRE TOPS",
    image:
      "https://images.pexels.com/photos/2119095/pexels-photo-2119095.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: null,
    gwt: "10.300", //gross weight
    less: "0.380",
    nwt: "9.920", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "128.00 Wt",
    silver: null,
    amount: "₹1270",
  },
  {
    id: 8,
    productType: "1 gram",
    name: "SRO SPL TOPS",
    image:
      "https://images.pexels.com/photos/1525240/pexels-photo-1525240.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "2x2.600=5.200",
    gwt: "20.250", //gross weight
    less: "5.200",
    nwt: "15.050", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "145.00 Wt",
    silver: null,
    amount: "₹2182",
  },
  {
    id: 9,
    productType: "gold",
    name: "CZ ENEMAL TOPS",
    image:
      "https://images.pexels.com/photos/14819933/pexels-photo-14819933.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "8x0.120=0.960",
    gwt: "16.850", //gross weight
    less: "0.960",
    nwt: "15.890", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "135.00 Wt",
    silver: null,
    amount: "₹2145",
  },
  {
    id: 10,
    productType: "gold",
    name: "ITALIAN CHAIN",
    image:
      "https://images.pexels.com/photos/19869442/pexels-photo-19869442/free-photo-of-a-necklace-and-earrings-on-display-in-a-jewelry-store.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "8x0.120=0.960",
    gwt: "26.700", //gross weight
    less: null,
    nwt: "26.700", //net weight
    Purity: null,
    wstg: "", // wastage
    pcs: "", //pieces or quantity
    rate: "",
    labour: "138.00 Wt",
    silver: null,
    amount: "₹3685",
  },
];
