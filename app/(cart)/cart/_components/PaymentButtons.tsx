import React from 'react'
import OrderSuccessMessage from './OrderSuccessMessage'
import { buttonStyles } from '@/app/styles'

interface PaymentButtonsProps {
    isOrdered: boolean;
    paymentType: "online" | "cash_on_delivery" | null;
    orderNumber: string | null;
    isProcessing: boolean;
    canProceedWithPayment: boolean;
    onOnlinePayment: () => void;
    onCashPayment: () => void;
}

const PaymentButtons = ({
    isOrdered,
paymentType,
orderNumber,
isProcessing,
canProceedWithPayment,
onOnlinePayment,
onCashPayment,
}: PaymentButtonsProps) => {

     if(isOrdered && paymentType === 'cash_on_delivery'){
        return  <OrderSuccessMessage orderNumber={orderNumber} />
     }

     if(isOrdered) return null;
  return (
   
    <div className="flex flex-col gap-3">
              
                  <button
                    disabled={!canProceedWithPayment}
                    className={`rounded w-full text-xl h-15 items-center justify-center duration-300 ${
                      canProceedWithPayment
                        ? buttonStyles.active
                        : buttonStyles.inactive
                    }`}
                    onClick={onOnlinePayment}
                  >
                    {isProcessing ? "Processing..." : "Pay online"}
                  </button>

                  <button
                    disabled={!canProceedWithPayment}
                    onClick={onCashPayment}
                    className={`h-10 rounded w-full text-base justify-center items-center duration-300 ${
                      canProceedWithPayment
                        ? "bg-primary hover:shadow-button-default active:shadow-button-active text-white cursor-pointer"
                        : "bg-gray-300 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isProcessing ? "Processing..." : "Pay with cash"}
                  </button>
               
            </div>
  )
}

export default PaymentButtons