import { create } from "zustand";
type chambers = {
  property: {
    description: string | null;
    chamberName: string | null;
    logoImage: FileList | null;
    backgroundImage: FileList | null;
    cridentialImage: FileList | null;
    deliveryInTown: boolean | null;
    freeDeliveryInTown: boolean | null;
    payAtHomeInTown: boolean | null;
    deliveryInOtherCity: boolean | null;
    freeDeliveryInOtherCity: boolean | null;
    payAtHomeInOtherCity: boolean | null;
    address: string | null;
    cityId: number | null;
  };
};

type UserData = {
  name: string;
  lastName: string;
};
type action = {
  setData: (data: Partial<chambers>) => void;
};
const useChamberHook = create<chambers & action>((set) => ({
  property: {
    description: null,
    chamberName: null,
    logoImage: null,
    backgroundImage: null,
    cridentialImage: null,
    deliveryInTown: false,
    freeDeliveryInTown: false,
    payAtHomeInTown: false,
    deliveryInOtherCity: false,
    freeDeliveryInOtherCity: false,
    payAtHomeInOtherCity: false,
    address: null,
    cityId: null,
  },
  
  setData: (data) =>
    set((state) => ({
      property: { ...state.property, ...data.property },

    })),
}));

export default useChamberHook;
