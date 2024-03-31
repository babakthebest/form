"use client";

import { BsCheck2All } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";

import {
  useState,
  useEffect,
  useLayoutEffect,
  ChangeEventHandler,
} from "react";
import { register } from "module";

type Props = {
  id: string;
  set: any;
  register: any;
  searchable?: boolean;
};

type CityType = {
  id: number;
  title: string;
};

const SelectCity = (props: Props) => {
  const {
    id,
    set,
    register,

    searchable = true,
    // rawErrors,
    // placeholder,
  } = props;

  const cityArray = [
    { id: 1, title: "hamedan" },
    { id: 2, title: "khorasan" },
    { id: 3, title: "hamedan1" },
    { id: 4, title: "hamedan2" },
    { id: 5, title: "hamedan3" },
    { id: 6, title: "hamedan4" },
    { id: 7, title: "hamedan5" },
    { id: 8, title: "hamedan6" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CityType>();
  const [cities, setCities] = useState<CityType[]>(cityArray);

  const onSelect = (item: CityType) => {
    // console.log(item.zones)
    setSelected(item);
    setIsOpen(false);
  };

  useEffect(() => {
    set(id, selected);
  }, [selected]);

  // console.log(selected);

  const onSearch = (e: any) => {
    const query = e.target.value.trim(); // Trim whitespace from the input

    // Check if the query is empty
    if (query === "") {
      setCities(cityArray); // Reset the cities list to the original data
    } else {
      // Filter cities based on the query
      const updatedList = cityArray.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setCities(updatedList);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row justify-between items-center w-full h-10 rounded border p-2  cursor-pointer

        `}
      >
        <input
          {...register(`${id}.title`, {
            required: { value: true, message: "the field is requiered " },
          })}
          readOnly
          id={id}
          type="text"
          value={selected?.title || ""} //   onChange={() => sets(selected?.title)}
          //   placeholder="jjjj"
          className="cursor-pointer bg-white w-full outline-none text-sm text-neutral-500"
        />

        <FaAngleDown
          className={`transform duration-700 
          ${isOpen ? "rotate-180" : "-rotate-135"}
          
          `}
        />
      </div>

      {isOpen && (
        <div
          className={`border rounded-md shadow-md transitions transform duration-700 w-full ${
            isOpen ? "translate-y-0" : "-translate-y-1"
          }`}
        >
          {searchable && (
            <div className="fixed  flex flex-row  items-center w-full p-1 border-b bg-white">
              <RiSearchLine className="text-stone-400" />
              <input
                onChange={onSearch}
                placeholder="جستجو"
                className="outline-none w-full flex flex-row gap-1 items-center p-2 text-xs text-stone-400"
              />
            </div>
          )}
          <div className="bg-white  w-full max-h-[25rem] overflow-scroll scrollbar-hide  ">
            <div className={`${searchable && "mt-10"}`}>
              {cities?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelect(item);
                  }}
                  className="flex flex-row justify-between items-center hover:bg-stone-100 cursor-pointer"
                >
                  <p
                    className={`cursor-pointer hover:text-neutral-700 p-2 text-sm text-neutral-500 `}
                  >
                    {item.title}
                  </p>
                  {selected?.id == item.id && (
                    <BsCheck2All className={`text-rose-400 pl-1`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectCity;
