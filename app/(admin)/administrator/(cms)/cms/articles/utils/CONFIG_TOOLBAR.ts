import { AlignmentMenu } from "../editor/_components/tiptap-components/AlignmentMenu";
import { BgColorMenu } from "../editor/_components/tiptap-components/BGColorMenu";
import CodeEditorButton from "../editor/_components/tiptap-components/CodeEditorButton";
import FontSizeMenu from "../editor/_components/tiptap-components/FontSizeMenu";
import HistoryMenu from "../editor/_components/tiptap-components/HistoryMenu";
import { ImageAttributes } from "../editor/_components/tiptap-components/ImageAttributes";
import ImageMenu from "../editor/_components/tiptap-components/ImageMenu";
import { LinkMenu } from "../editor/_components/tiptap-components/LinkMenu";
import { ListMenu } from "../editor/_components/tiptap-components/ListMenu";
import ParagraphButton from "../editor/_components/tiptap-components/ParagraphButton";
import { QuoteButton } from "../editor/_components/tiptap-components/QuoteButton";
import { TableMenu } from "../editor/_components/tiptap-components/TableMenu";
import TextAIMenu from "../editor/_components/tiptap-components/textAI/TextAIMenu";
import { TextColorMenu } from "../editor/_components/tiptap-components/TextColorMenu";
import { TextFormattingMenu } from "../editor/_components/tiptap-components/TextFormattingMenu";


export const CONFIG_GROUPS = [
  {
    id: "history",
    name: "History",
    items: ["history"],
  },
  {
    id: "text",
    name: "Text",
    items: ['paragraph',"fontSize"],
  },
  {
    id: "textFormatting",
    name: "Formatting",
    items: ["textFormatting"],
  },
  {
    id: "quote",
    name: "Quote",
    items: ["quote"],
  },
  {
    id: "code",
    name: "Code",
    items: ["codeEditor"],
  },
  {
    id: "alignment",
    name: "Alignment",
    items: ["alignment"],
  },
  {
    id: "color",
    name: "Foreground and Background Color",
    items: ["textColor", "bgColor"],
  },
  {
    id: "list",
    name: "List",
    items: ["list"],
  },
  {
    id: "link",
    name: "Links",
    items: ["link"],
  },
  {
    id: "table",
    name: "Tables",
    items: ["table"],
  },
  {
    id: "images",
    name: "Images",
    items: ["image"],
  },
  {
    id: "imageAttributes",
    name: "Image Attributes",
    items: ["imageAttributes"],
  },
  {
    id: "textAI",
    name: "Text generation",
    items: ["textAI"],
  },
];
 export const CONFIG_TOOLBAR_COMPONENTS = {
  history: { component: HistoryMenu },
  fontSize: { component: FontSizeMenu },
  textFormatting: { component: TextFormattingMenu },
  quote: { component: QuoteButton },
  codeEditor: { component: CodeEditorButton },
  alignment: { component: AlignmentMenu },
  textColor: { component: TextColorMenu },
  bgColor: { component: BgColorMenu },
  list: { component: ListMenu },
  link: { component: LinkMenu },
  table: { component: TableMenu },
  image: { component: ImageMenu },
  imageAttributes: { component: ImageAttributes },
  paragraph: { component: ParagraphButton },
  textAI: { component: TextAIMenu },
} as const;