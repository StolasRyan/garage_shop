"use client";

import { createPriceAlert, PriceAlertFormState } from "@/actions/priceAlerts";
import { useActionState, useEffect } from "react";

interface PriceAlertModalProps {
  onCloseAction: () => void;
  productId: string;
  productTitle: string;
  currentPrice: string;
  onSuccessAction: (unsubscribeToken: string) => void;
}

const PriceAlertModal = ({
  onCloseAction,
  productId,
  productTitle,
  currentPrice,
  onSuccessAction,
}: PriceAlertModalProps) => {

    const handleSubmit = async(
        prevState: PriceAlertFormState | null,
        formData: FormData
    ):Promise<PriceAlertFormState>=>{
        formData.append('productId',productId)
        formData.append('productTitle', productTitle)
        formData.append('currentPrice', currentPrice)

        return createPriceAlert(prevState, formData)
    }
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    {} as PriceAlertFormState
  );

  useEffect(()=>{
    if(state?.success && state?.unsubscribeToken){
        onSuccessAction(state?.unsubscribeToken);
        onCloseAction()
    }
  },[onCloseAction, onSuccessAction, state])

  return (
      <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-200 -mt-3">
        <h3 className="text-lg font-bold mb-4">Price lowing notification</h3>
        <form action={formAction} className="flex flex-col gap-3">
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Your's E-mail"
              className={`p-2 rounded text-sm relative border border-primary shadow-button-default outline-0 w-full ${
                state?.errors?.email ? "border-[#d80000]" : ""
              }`}
              disabled={isPending}
            />
            {state?.errors?.email && (
            <p className="text-[#d80000] text-xs mt-1">{state.errors.email}</p>
          )}
          </div>
          {state?.errors?.general && (
          <p className="text-[#d80000] text-xs mt-1">{state.errors.general}</p>
        )}
         <div className="flex gap-2 text-sm">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 justify-center px-4 py-2 text-white rounded text-sm bg-primary hover:shadow-button-default active:shadow-button-active disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer duration-300"
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>

          <button
            type="button"
            onClick={onCloseAction}
            disabled={isPending}
            className="px-4 py-2 justify-center items-center active:shadow-button-active border-none rounded cursor-pointer duration-300 bg-[#f3f2f1] hover:shadow-button-secondary disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
  );
};

export default PriceAlertModal;
