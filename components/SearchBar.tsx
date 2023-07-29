"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { SearchManufacturer } from "./";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();

  const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (manufacturer === "" && model === "") return;

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) searchParams.set("model", model);
    else searchParams.delete("model");

    if (manufacturer) searchParams.set("manufacturer", manufacturer);
    else searchParams.delete("manufacturer");

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton disabled={manufacturer === ""} otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(evt) => setModel(evt.target.value)}
          placeholder="Macan"
          className="searchbar__input"
        />
        <SearchButton disabled={model === ""} otherClasses="sm:hidden" />
      </div>
      <SearchButton
        disabled={manufacturer === "" || model === ""}
        otherClasses="max-sm:hidden"
      />
    </form>
  );
};

const SearchButton = ({
  disabled,
  otherClasses,
}: {
  disabled: boolean;
  otherClasses: string;
}) => (
  <button
    type="submit"
    disabled={disabled}
    className={`-ml-3 z-10 ${otherClasses}`}
  >
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

export default SearchBar;
