import { Store } from "./types";

// A hook, returning the dummy payload (data of some sample stores, including address and the products it offers)
export const useStores = (): Store[] => {
  return [
    {
      id: 1,
      name: "Safa Gadgets and Communication",
      address: "6th Rd, Satellite Town, Rawalpindi, Pakistan",
      latitude: 33.6429709,
      longitude: 73.0729302,
      products: ["Laptop", "Headphones", "Smartphone"],
    },
    {
      id: 2,
      name: "iFocus | The Exclusive Apple Store",
      address:
        "Office #3, Ground Floor, Azeem Mention, AKM Fazl-ul-Haq Rd, Islamabad, Pakistan",
      latitude: 33.7157856,
      longitude: 73.0697166,
      products: ["Laptop", "Macbook", "Smartwatch", "Camera"],
    },
    {
      id: 3,
      name: "PAK MAC - Retail Store",
      address: "Shop #8, Ground Floor, Ittehad Centre, Islamabad, Pakistan",
      latitude: 33.7115365,
      longitude: 73.0611887,
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
      latitude: 33.6623637,
      longitude: 73.0699509,
      products: ["iMac", "Macbook", "Smartwatch", "Laptop"],
    },
    {
      // No products in this last store
      id: 6,
      name: "Laptop Station",
      address: "Dubai Tower, Lehtrar Road, Islamabad, Pakistan",
      latitude: 33.6290436,
      longitude: 73.1167717,
    },
  ];
};
