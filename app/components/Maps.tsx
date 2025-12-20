"use client";
import { Map, YMaps, Placemark } from "@iminside/react-yandex-maps";
import { useState } from "react";

const locations = {
  minsk: {
    name: "Minsk",
    center: [53.9, 27.55],
    shops: [
      { id: 1, coords: [53.9, 27.55], name: "Shop 1" },
    ],
  },
  gomel: {
    name: "Gomel",
    center: [52.42, 31.01],
    shops: [
      { id: 1, coords: [52.42, 31.01], name: "Shop 1" },
    ],
  },
  brest: {
    name: "Brest",
    center: [52.09, 23.68],
    shops: [
      { id: 1, coords: [52.09, 23.68], name: "Shop 1" },
    ],
  },
};

const Maps = () => {
    const [currentLocation, setCurrentLocation] = useState('minsk');
    const currentLocationData = locations[currentLocation];

  return (
    <YMaps>
      <section>
        <div className="flex flex-col justify-center xl:max-w-302">
          <h2 className="mb-4 md:mb-8 xl:mb-10 text-2xl xl:text-4xl text-left font-bold">
            Our Shops
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-3 mb-5">
            {(Object.keys(locations) as (keyof typeof locations)[]).map(
              (location) => {
                const isActive = location === currentLocation;
                return(
                <button
                  key={location}
                  className={` bg-(--color-primary) px-5 py-2 md:px-8 rounded-2xl text-base text-center text-gray-100 hover:shadow-(--shadow-secondary) active:shadow-(--shadow-button-active) transition-colors duration-300${
                      isActive ? " shadow-(--shadow-article) bg-amber-600 text-white" : ""
                  } cursor-pointer`}
                  onClick={() => setCurrentLocation(location)}
                >
                  {locations[location].name}
                </button>
              )
            })}
          </div>
          <Map
            defaultState={{ center: currentLocationData.center, zoom: 12 }}
            state={{ center: currentLocationData.center, zoom: 12 }}
            width="100%"
            height="354px"
            className="no-ymaps-copyright w-full h-88.5"
          >
            {locations[currentLocation].shops.map((shop) => (
              <Placemark key={shop.id} geometry={shop.coords} options={{iconLayout:'default#image', iconImageHref:'/images/icons_map/map-pin.svg', iconImageSize:[32, 32], iconImageOffset:[-10, -10]}}/>
          ))}
          </Map>
          
        </div>
      </section>
    </YMaps>
  );
};

export default Maps;
