
import InputBlock from "./InputBlock";
import SearchButton from "./SearchButton";

const Search = () => {
  return (
    <div className='flex flex-row gap-4 grow'>
      <SearchButton />
      <InputBlock />
      
    </div>
  )
}

export default Search