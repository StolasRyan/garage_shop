import { CounterProps } from "../../../types"

const Counter = ({wordCount, charCount}:CounterProps) => {
  return (
    <div className="mt-2 text-sm text-gray-500 text-right">
        Words: {wordCount} | Characters: {charCount}
    </div>
  )
}

export default Counter