 

const EmptyState = ({searchQuery}: {searchQuery: string}) => {
  return (
    <div className='p-8 text-center text-gray-500'>{searchQuery ? 'No results found.' : 'No categories yet.'}</div>
  )
}

export default EmptyState