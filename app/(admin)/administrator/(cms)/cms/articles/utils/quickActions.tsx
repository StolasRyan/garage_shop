import { FileText, Languages, Sparkles, Type, Wand2, Zap } from "lucide-react";

export const quickActions = [
  {
    id: "improve",
    label: "Improve",
    icon: <Wand2 className="w-5 h-5" />,
    desc: "Make text better",
    color: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  },
  {
    id: "continue",
    label: "Continue",
    icon: <Sparkles className="w-5 h-5" />,
    desc: "Continue writing",
    color: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100",
  },
  {
    id: "summarize",
    label: "Reduce",
    icon: <FileText className="w-5 h-5" />,
    desc: "Make text shorter",
    color: "text-green-600 bg-green-50 hover:bg-green-100",
  },
  {
    id: "expand",
    label: "Expand",
    icon: <Zap className="w-5 h-5" />,
    desc: "Add more details",
    color: "text-green-600 bg-green-50 hover:bg-green-100",
  },
  {
    id: "simplify",
    label: "Simplify",
    icon: <Type className="w-5 h-5" />,
    desc: "Make simpler",
    color: "text-orange-600 bg-orange-50 hover:bg-orange-100",
  },
  {
    id: "translate",
    label: "Translate",
    icon: <Languages className="w-5 h-5" />,
    desc: "Translate text",
    color: "text-red-600 bg-red-50 hover:bg-red-100",
  },
] as const;