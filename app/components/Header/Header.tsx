import Logo from "./Logo";
import Search from "./Search";
import UserBlock from "./UserBlock";

const Header = () => {
  return (
    <header className="bg-gray-200 flex w-full items-center justify-between md:shadow(--shadow-default) relative z-10 flex-col md:flex-row gap-y-5 xl:ga-y-7 md:gap-y-10 p-2">
      <div className="flex flex-row gap-4 xl:gap-10 py-2 px-4 items-center shadow(--shadow-default) md:shadow-none">
        <Logo />
        <Search />
      </div>

        <UserBlock />

    </header>
  );
};

export default Header;
