import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import DoneRound from "../assets/DoneRound";
import type { Filter, Regions } from "../pages/Home";

const SortComponent = ({
  sortBy,
}: {
  sortBy: React.Dispatch<React.SetStateAction<Filter>>;
}) => {
  const [selectedRegions, setSelectedRegions] = useState<Regions[]>([]);
  const [isUnMember, setIsUnMember] = useState(false);
  const [isIndependent, setIsIndependent] = useState(false);

  const updateSelectedRegions = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value as Regions;

    if (selectedRegions.includes(value)) {
      setSelectedRegions((prev) => prev.filter((reg) => reg !== value));
    } else {
      setSelectedRegions((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    if (typeof sortBy === "function") {
      sortBy((prev) => ({
        ...prev,
        regions: selectedRegions,
        isIndependent,
        isUnMember,
      }));
    }
  }, [sortBy, selectedRegions, isIndependent, isUnMember]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="sort" className="text-sm">
          Sort by
        </label>
        <select
          name="sort"
          id="sort"
          defaultValue="population"
          className="border-secondary *:bg-secondary rounded-lg border-1 px-4 py-2 outline-none *:py-2"
          onChange={(event) =>
            sortBy((prev) => ({ ...prev, sort: event.target.value }))
          }
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
                  className={cn(
                    "inline-block cursor-pointer rounded-xl px-3 py-2 text-sm capitalize transition-colors duration-150",
                    selectedRegions.includes(region as Regions)
                      ? "bg-secondary"
                      : "",
                  )}
                >
                  {region}
                </label>
                <input
                  type="checkbox"
                  name="region"
                  id={region}
                  value={region}
                  className="absolute top-1/2 left-1/2 -z-10"
                  onChange={updateSelectedRegions}
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
              name="unMember"
              id="unMember"
              className="absolute opacity-0"
              onChange={() => setIsUnMember((prev) => !prev)}
            />
            <span>
              <DoneRound className="text-accent-light size-5" />
            </span>
            <label htmlFor="unMember" className="cursor-pointer text-sm">
              Member of the United Nations
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="independent"
              id="independent"
              className="absolute opacity-0"
              onChange={() => setIsIndependent((prev) => !prev)}
            />
            <span>
              <DoneRound className="text-accent-light size-5" />
            </span>
            <label htmlFor="independent" className="cursor-pointer text-sm">
              Independent
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default SortComponent;
