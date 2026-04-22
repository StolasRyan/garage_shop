
const StatsInfo = ({count}:{count:number}) => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
            Total categories:{' '}
            <span className="font-semibold text-gray-700">{count}</span>
        </p>
    </div>
  )
}

export default StatsInfo