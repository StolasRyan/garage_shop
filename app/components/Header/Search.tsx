
import InputBlock from "./inputSearch/InputBlock";
import SearchButton from "./SearchButton";

const Search = ({onFocusChangeAction}:{onFocusChangeAction:(focused:boolean)=>void}) => {
  return (
    <div className='flex flex-row gap-4 grow'>
      <SearchButton />
      <InputBlock onFocusChangeAction={onFocusChangeAction}/>
      
    </div>
  )
}

export default Search