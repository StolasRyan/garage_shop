import Image from "next/image";
import bannerCard from "../../public/images/banners/banner-card-image.png";
import bannerActionMobTab from "../../public/images/banners/banner-action-mob-tab.jpeg";
import bannerActionDesk from "../../public/images/banners/banner-action-desk.jpeg";

const SpecialOffers = () => {
  return (
    <section>
      <div className="flex flex-col mb-4 md:mb-8 xl:mb-10 justify-between text-[#414141]">
        <div className="flex flex-col gap-4 md:w-184.25 xl:w-full mx-auto">
          <h2 className="text-2xl xl:text-4xl text-left font-bold mb-4 md:mb-8">
            Special offers
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-center xl:w-auto ">
             {/* Баннер с картой - всегда видим */}
            <button className="text-left flex flex-row pt-5 pl-5 rounded bg-[#FCD5BA] w-84  md:w-88 xl:w-146 h-42.5 xl:h-50 hover:shadow-(--shadow-card-shop) duration-300 relative overflow-hidden cursor-pointer">
              <div className="flex flex-col gap-1.5 w-43.5 xl:w-64.5 ">
                <p className="text-xl xl:text-2xl font-bold">
                  Get a discount card
                </p>
                <p className="text-xs xl:text-base">
                 And get bonuses for every purchase
                </p>
              </div>
              <Image
                src={bannerCard}
                alt="Оформите карту"
                width={220}
                height={110}
                className="absolute w-auto h-auto -top-3 -right-18.5 xl:-right-4 xl:-top-8 xl:w-82.5 xl:h-auto"
                priority={false}
              />
            </button>
            <button className="relative max-w-full md:max-w-88.25 xl:max-w-146 h-42.5 xl:h-50 rounded overflow-hidden cursor-pointer hover:shadow-(--shadow-button-default) duration-300">
              {/* Баннер акций - мобильная/планшетная версия */}
              <div className="relative xl:hidden w-full h-full">
                <Image
                  src={bannerActionMobTab}
                  alt="Акционные товары"
                  fill
                  className="w-full h-full object-cover rounded"
                  priority = {false}
                  sizes='(max-width: 767px) 100vw, 353px'
                />
              </div>

              {/* Баннер акций - десктопная версия */}
              <div className="relative hidden xl:block w-full h-full">
                <Image
                  src={bannerActionDesk}
                  alt="Акционные товары"
                  fill
                  className="w-full h-full object-cover rounded"
                  priority = {false}
                  sizes='(max-width: 767px) 100vw, 353px'
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;