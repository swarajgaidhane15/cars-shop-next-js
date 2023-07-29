"use client";

import { useEffect, useState } from "react";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";

import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";
import { CarProps } from "@/types";

export default function Home() {
  const [allCars, setAllCars] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // Filter statuses
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2023);

  // Pagination status
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        model: model || "",
        fuel: fuel || "",
        year: year || 2023,
        limit: limit || 10,
      });

      setAllCars(result);
    } catch (error: any) {
      alert("Error fetching cars: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarProps, idx: number) => (
                <CarCard key={idx} car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops!! No results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
