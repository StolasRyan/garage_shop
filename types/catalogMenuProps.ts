import { Category } from "./categories";
import { ErrorProps } from "./errorProps";

export interface CatalogMenuProps {
  isCatalogOpen: boolean;
  setIsCatalogOpen: (isCatalogOpen: boolean) => void;
  isLoading: boolean;
  categories: Category[];
  error: ErrorProps | null;
  menuRef: React.RefObject<HTMLDivElement> | null;
  searchBlockRef: React.RefObject<HTMLDivElement> | null;
  onMouseEnter: () => void;
  onFocusChangeAction: (focused: boolean) => void;
}
