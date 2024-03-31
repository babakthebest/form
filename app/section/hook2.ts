import { create } from "zustand";

export type ImageState = {
  logoImage: (Blob | File)[] | null;
  backgroundImage: (Blob | File)[] | null;
  cridentialImage: (Blob | File)[] | null;
};

type CityType = {
  id: number;
  title: string;
};

export type Chambers = {
  property: {
    description: string | null;
    chamberName: string | null;
    deliveryInTown: boolean | null;
    freeDeliveryInTown: boolean | null;
    payAtHomeInTown: boolean | null;
    deliveryInOtherCity: boolean | null;
    freeDeliveryInOtherCity: boolean | null;
    payAtHomeInOtherCity: boolean | null;
    address: string | null;
    cityId: CityType | null;
  };
};

type Action = {
  setChamberData: (data: Partial<Chambers>) => void;
  setLogoImage: (image: (Blob | File)[] | null) => void;
  setBackgroundImage: (image: (Blob | File)[] | null) => void;
  setCridentialImage: (image: (Blob | File)[] | null) => void;
};

const useChamberHook = create<Chambers & ImageState & Action>((set) => {
  const initialImagesState: ImageState = {
    logoImage: null,
    backgroundImage: null,
    cridentialImage: null,
  };

  return {
    property: {
      description: null,
      chamberName: null,
      deliveryInTown: false,
      freeDeliveryInTown: false,
      payAtHomeInTown: false,
      deliveryInOtherCity: false,
      freeDeliveryInOtherCity: false,
      payAtHomeInOtherCity: false,
      address: null,
      cityId: null,
    },
    ...initialImagesState,

    setChamberData: (data) =>
      set((state) => ({
        property: { ...state.property, ...data.property },
      })),

    setLogoImage: (image) =>
      set(() => ({
        logoImage: image,
      })),

    setBackgroundImage: (image) =>
      set(() => ({
        backgroundImage: image,
      })),

    setCridentialImage: (image) =>
      set(() => ({
        cridentialImage: image,
      })),
  };
});

export default useChamberHook;
