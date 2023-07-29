"use client";
import { useState } from "react";
import Image from "next/image";

import { SearchManufacturer } from "./";

const SearchBar = ({ setManufacturer, setModel }) => {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");

  const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (searchManufacturer === "" && searchModel === "") return;

    setModel(searchModel.toLowerCase());
    setManufacturer(searchManufacturer.toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton disabled={searchManufacturer === ""} otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car searchModel"
        />
        <input
          type="text"
          name="searchModel"
          value={searchModel}
          onChange={(evt) => setSearchModel(evt.target.value)}
          placeholder="Macan"
          className="searchbar__input"
        />
        <SearchButton disabled={searchModel === ""} otherClasses="sm:hidden" />
      </div>
      <SearchButton
        disabled={searchManufacturer === "" || searchModel === ""}
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
