import React, { useState, useEffect } from "react";

import SearchIcon from "../assets/SearchIcon";
import DoneRound from "../assets/DoneRound";

const FilterForm = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const setCurrentWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", setCurrentWidth);
    return () => window.removeEventListener("resize", setCurrentWidth);
  }, []);

  return (
    <form className="space-y-8">
      <div className="bg-secondary flex w-full items-center justify-center gap-2 rounded-lg p-2">
        <SearchIcon aria-hidden="true" className="text-accent-light" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder={`Search by Name, Region${screenWidth <= 1024 ? "..." : ", SubRegion"}`}
          className="placeholder:text-accent-light text-md w-[220px] border-none outline-0"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="sort" className="text-sm">
          Sort by
        </label>
        <select
          name="sort"
          id="sort"
          defaultValue="population"
          className="border-secondary *:bg-secondary rounded-lg border-1 px-4 py-2 outline-none *:py-2"
        >
          <option value="population">Population</option>
          <option value="name">Name</option>
          <option value="area">Area</option>
        </select>
      </div>
      <fieldset id="region" className="space-y-4">
        <legend className="text-sm">Region</legend>
        <div className="flex flex-wrap items-center gap-2">
          {["americas", "antarctic", "africa", "asia", "europe", "oceania"].map(
            (region, idx) => (
              <div key={idx}>
                <label
                  htmlFor={region}
                  className="bg-secondary inline-block cursor-pointer rounded-xl px-3 py-2 text-sm capitalize"
                >
                  {region}
                </label>
                <input
                  type="checkbox"
                  name="region"
                  id={region}
                  className="absolute top-1/2 left-1/2 -z-10"
                />
              </div>
            ),
          )}
        </div>
      </fieldset>
      <fieldset id="status" className="space-y-2">
        <legend className="text-sm">Status</legend>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status"
              id="unMember"
              className="absolute opacity-0"
            />
            <span>
              <DoneRound className="text-accent-light size-5" />
            </span>
            <label htmlFor="unMember" className="cursor-pointer">
              Member of the United Nations
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status"
              id="independent"
              className="absolute opacity-0"
            />
            <span>
              <DoneRound className="text-accent-light size-5" />
            </span>
            <label htmlFor="independent" className="cursor-pointer">
              Independent
            </label>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default FilterForm;
