import {
  FakePaymentData,
  FakePaymentModalProps,
  PaymentSimulationResult,
} from "@/types/payment";
import { formatPrice } from "@/utils/formatPrice";
import { XCircleIcon } from "lucide-react";
import { useState } from "react";

interface TestCard {
  number: string;
  description: string;
  result: PaymentSimulationResult;
}

const FakePaymentModal = ({
  amount,
  isOpen,
  onClose,
  onSuccess,
  onError,
}: FakePaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");

  if (!isOpen) return null;

  const testCards: TestCard[] = [
    {
      number: "5555 5555 5555 4444",
      description: "Successful payment",
      result: "success",
    },
    {
      number: "4111 1111 1111 1111",
      description: "Not enough funds",
      result: "failure",
    },
    {
      number: "4000 0000 0000 0002",
      description: "Banks error",
      result: "error",
    },
  ];

  const simulatePayment = async (
    simulatedResult: PaymentSimulationResult,
  ): Promise<void> => {
    if (!isOpen) return;

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const basePaymentData: Omit<FakePaymentData, "status"> = {
        id: `fake_payment_${Date.now()}`,
        amount,
        cardLast4: cardNumber.slice(-4) || "4444",
        timestamp: new Date().toISOString(),
        processor: "fake_payment_system",
      };

      switch (simulatedResult) {
        case "success":
          onSuccess({
            ...basePaymentData,
            status: "succeeded",
          });
          break;
        case "failure":
          onError("Not enough funds. Try again later on 'Orders' page.");
          break;
        case "error":
          onError("Banks emitet error. Try again later on 'Orders' page.");
          break;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const testCard = testCards.find((card) =>
      cardNumber.replace(/\s/g, "").includes(card.number.replace(/\s/g, "")),
    );

    const result: PaymentSimulationResult = testCard?.result || "error";
    simulatePayment(result);
  };

  const fillTestCard = (
    cardNumber: string,
    result: PaymentSimulationResult,
  ): void => {
    setCardNumber(cardNumber.replace(/\s/g, ""));
    setExpiryDate("12/24");
    setCvc("123");
    setCardHolder("John Doe");

    setTimeout(() => {
      simulatePayment(result);
    }, 1000);
  };

  const handleCardNumberChange = (value: string): void => {
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (value: string): void => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/g, "$1/$2")
      .trim()
      .slice(0, 5);
    setExpiryDate(formattedValue);
  };

  const handleCvcChange = (value: string): void => {
    const formattedValue = value.replace(/\D/g, "").trim().slice(0, 3);
    setCvc(formattedValue);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Test payment</h2>
        <p className="text-gray-600 mb-4">Sum: {formatPrice(amount)} ₽</p>
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h3 className="text-sm font-medium mb-2">
            Test cards (auto-payment):
          </h3>
          {testCards.map((card, index) => (
            <button
              key={index}
              type="button"
              onClick={() => fillTestCard(card.number, card.result)}
              disabled={isProcessing}
              className="block w-full text-left p-2 hover:bg-gray-100 rounded text-sm mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-mono">{card.number}</span>
              <span className="text-gray-500 ml-2">-{card.description}</span>
            </button>
          ))}
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full p-2 border rounded font-mono"
              required
              maxLength={19}
              disabled={isProcessing}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expires date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => handleExpiryDateChange(e.target.value)}
                placeholder="MM/YY"
                className="w-full p-2 border rounded "
                required
                maxLength={5}
                disabled={isProcessing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVC</label>
              <input
                type="text"
                value={cvc}
                onChange={(e) => handleCvcChange(e.target.value)}
                placeholder="123"
                className="w-full p-2 border rounded"
                required
                maxLength={3}
                disabled={isProcessing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Card holder name
            </label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
              placeholder="John Doe"
              className="w-full p-2 border rounded uppercase"
              required
              disabled={isProcessing}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50 duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <XCircleIcon className="w-6 h-6" /> Cancel
            </button>
            <button
              type="submit"
              disabled={
                isProcessing ||
                !cardHolder ||
                !cardNumber ||
                !expiryDate ||
                !cvc
              }
              className="flex-1 py-2 px-4 bg-lime-600 text-white rounded hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed duration-300 cursor-pointer"
            >
              {isProcessing
                ? "Processing..."
                : `To payment ${formatPrice(amount)} ₽`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FakePaymentModal;
