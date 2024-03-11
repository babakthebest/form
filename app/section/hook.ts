import { create } from "zustand";
type chambers = {
  description: string;
  chamberName: string;
  logoImage: File | null;
  deliveryInTown: boolean;
  freeDeliveryInTown: boolean;
  payAtHomeInTown: boolean;
  deliveryInOtherCity: boolean;
  freeDeliveryInOtherCity: boolean;
  payAtHomeInOtherCity: boolean;
};

type UserData = {
  name: string;
  lastName: string;
};
type action = {
  setData: (data: Partial<chambers>) => void;
};
const useNameData = create<chambers & action>((set) => ({
  description: "",
  chamberName: "",
  logoImage: null,
  deliveryInTown: false,
  freeDeliveryInTown: false,
  payAtHomeInTown: false,
  deliveryInOtherCity: false,
  freeDeliveryInOtherCity: false,
  payAtHomeInOtherCity: false,
  setData: (data) => set((state) => ({ ...state, ...data })),
}));

export default useNameData;
