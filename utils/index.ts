import { FilterProps } from "@/types";

const car_api_url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer: make, model, year, fuel, limit } = filters;

  const headers = {
    "X-RapidAPI-Key": "39311ee5abmshd171ec1f88e2c6cp1c224djsnc75a4ab023bb",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `${car_api_url}?make=${make}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`,
    { headers }
  );

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
