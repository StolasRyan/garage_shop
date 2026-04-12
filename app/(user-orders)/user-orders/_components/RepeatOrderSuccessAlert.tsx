

const RepeatOrderSuccessAlert:React.FC = () => {
    const handleRefresh = () => {
        window.location.reload();
    }
  return (
    <div className="mt-6 p-4 bg-lime-50 border border-lime-200 rounded-lg">
        <div className="flex justify-between items-center">
            <p className="text-lime-600 font-medium">Order succesfully recreated!</p>
            <button
            onClick={handleRefresh}
            className="ml-4 bg-lime-600 text-white px-4 py-2 hover:bg-lime-500 duration-300 font-medium cursor-pointer rounded"
            >
                Refresh
            </button>
        </div>
    </div>
  )
}

export default RepeatOrderSuccessAlert