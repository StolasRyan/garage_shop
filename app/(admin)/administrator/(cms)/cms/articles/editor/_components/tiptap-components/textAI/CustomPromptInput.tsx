import { Send } from "lucide-react";

export const CustomPromptInput = ({
  prompt,
  onChange,
  disabled,
}: {
  prompt: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <Send className="w-4 h-4" />
        Personal prompt for YandexGPT:
      </h3>
      <textarea
        value={prompt}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Example: 'Write an article about the benefits of fresh vegetables', 'Make a recipe for a quick dinner', 'Describe the advantages of different types of oil', 'How to choose quality products'"
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        rows={4}
        disabled={disabled}
      />

      <div className="hidden md:block mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs font-medium text-gray-700 mb-1">
          Prompts examples for YandexGPT:
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Write article about the benefits of fresh vegetables</li>
          <li>• Create a recipe for a quick meal using differernt cheeses</li>
          <li>• Write a guide on how to choose quality products</li>
          <li>• Describe the advantages of different types of oil</li>
          <li>• Create a recipe for a healthy dinner</li>
          <li>• Make a compare of different types of wheat flours</li>
          <li>• Write the article about correct product keeping</li>
          <li>• Make a list of the most popular fruits</li>
          <li>• Describe the benefits of different types of nuts</li>
          <li>• Make a recipe for a healthy breakfast</li>
        </ul>
      </div>
    </div>
  );
};
