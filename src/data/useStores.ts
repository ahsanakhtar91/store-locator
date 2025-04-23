import { Store } from "../types/types";

// A hook, returning the dummy payload (data of some sample stores, including address and the products it offers)
export const useStores = (): Store[] => {
  return [
    {
      id: 1,
      name: "Safa Gadgets and Communication",
      address: "6th Rd, Satellite Town, Rawalpindi, Pakistan",
      latitude: 33.6377141,
      longitude: 73.0667894,
      products: ["Laptop", "Headphones", "Smartphone"],
    },
    {
      id: 2,
      name: "iFocus | The Exclusive Apple Store",
      address: "Shop # 263, 2nd Floor, Centaurus Mall, Pakistan",
      latitude: 33.7076513,
      longitude: 73.0119503,
      products: ["Laptop", "Macbook", "Smartwatch", "Camera"],
    },
    {
      id: 3,
      name: "PAK MAC - Retail Store",
      address: "Shop #8, Ground Floor, Ittehad Centre, Islamabad, Pakistan",
      latitude: 33.713074,
      longitude: 73.0476017,
      products: ["Macbook", "Camera", "Headphones", "Smartphone", "iPhone"],
    },
    {
      id: 4,
      name: "Pakistan Mobile Parts",
      address:
        "Shop #106, 1st Floor, Umair Plaza, 6th Rd, Block-A Satellite Town, Rawalpindi, Pakistan",
      latitude: 33.6412899,
      longitude: 73.0769801,
      products: ["LCD", "Smartwatch", "iPhone", "Android"],
    },
    {
      id: 5,
      name: "PAK MAC - Service Center",
      address: "Plot 1-b, St 7, I-8/1, Islamabad, Pakistan",
      latitude: 33.6666277,
      longitude: 73.0547031,
      products: ["iMac", "Macbook", "Smartwatch", "Laptop"],
    },
  ];
};
