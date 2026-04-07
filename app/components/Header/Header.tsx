import Logo from "./Logo";
import UserBlock from "./UserBlock";
import CatalogMenuWrapper from "./CatalogDropMenu/CatalogMenuWrapper";

const Header = () => {
 

  return (
    <header className="bg-gray-200 flex w-full items-center justify-between md:shadow(--shadow-default) relative z-50 flex-col md:flex-row gap-y-5 xl:gap-y-7 md:gap-y-10 p-2">
      <div className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow(--shadow-default) md:shadow-none">
        <Logo />
        <CatalogMenuWrapper/>
      </div>
      <UserBlock />
    </header>
  );
};

export default Header;
