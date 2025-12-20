import Image from "next/image";


const TopMenu = () => {
  return (
    <ul className="flex flex-row gap-x-6 items-end">
      <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer">
        <Image
          src="menu.svg"
          alt="Menu"
          width={24}
          height={24}
          className="object-contain w-6 h-6"
        />
        <span>Catalogue</span>
      </li>
      <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer">
        <Image
          src="heart.svg"
          alt="Favorites"
          width={24}
          height={24}
          className="object-contain w-6 h-6"
        />
        <span>Favorites</span>
      </li>
      <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer">
        <Image
          src="box.svg"
          alt="Orders"
          width={24}
          height={24}
          className="object-contain w-6 h-6"
        />
        <span>Orders</span>
      </li>
      <li className="flex flex-col items-center gap-2.5  w-11 cursor-pointer">
        <Image
          src="shopping-cart.svg"
          alt="Cart"
          width={24}
          height={24}
          className="object-contain w-6 h-6"
        />
        <span>Cart</span>
      </li>
    </ul>
  );
};

export default TopMenu;
