export type Store = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  products: string[];
};

export type StoreWithDistance = Store & { distance: number };
