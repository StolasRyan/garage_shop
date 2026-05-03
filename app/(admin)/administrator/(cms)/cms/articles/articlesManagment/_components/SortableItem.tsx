import { useEffect, useState } from "react";
import { SortableItemProps } from "../types";
import { useArticlesManagmentStore } from "@/store/articlesManagmentStore";
import MobileArticleCard from "./MobileArticleCard";
import DesktopArticleRow from "./DesktopArticleRow";

const SortableItem = ({ id, article, displayNumericId }: SortableItemProps) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const { draggedId } = useArticlesManagmentStore();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isBeingDragged = draggedId === id;

  if (isMobileView) {
    return (
      <div>
        <MobileArticleCard
          article={article}
          displayNumericId={displayNumericId}
          isDragging={isBeingDragged}
        />
      </div>
    );
  }

  return (
    <DesktopArticleRow
      article={article}
      displayNumericId={displayNumericId}
      isDragging={isBeingDragged}
    />
  );
};

export default SortableItem;
