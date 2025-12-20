import Image from "next/image";

const InputBlock = () => {
  return (

      <div className="min-w-65.25 relative grow">
        <input
          type="text"
          placeholder="Find product"
          className="w-full h-10 rounded py-2 px-4 outline outline-(--color-primary) focus:shadow-(--shadow-button-default) text-base text-gray-400 leading-[150%]"
        />
        <button className="absolute top-2 right-2 cursor-pointer">
          <Image src="search.svg" alt="Search" width={24} height={24} />
        </button>
      </div>
  );
};

export default InputBlock;
