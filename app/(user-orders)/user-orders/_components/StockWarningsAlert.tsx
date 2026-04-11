interface StockWarningsAlertProps {
    warnings: string[];
    hasStockIssues: boolean;
}

const StockWarningsAlert: React.FC<StockWarningsAlertProps> = ({warnings, hasStockIssues}) => {
    if(warnings.length === 0) return null;
  return (
    <div className="m-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-yellow-800 font-semibold mb-2">
            Warning! products quantity is limited.
        </h3>
        <ul className="list-disc list-inside space-y-1">
            {warnings.map((warning, index) => (
                <li key={index} className="text-yellow-700 text-sm">{warning}</li>
            ))}
        </ul>
        {hasStockIssues && (
            <p className="text-yellow-800 font-medium mt-2">
                Impossible to recreate order due to limited stock. Make order manually from cart.
            </p>
        )}
    </div>  
  )
}

export default StockWarningsAlert