'use client'
import  { useEffect, useState } from 'react'
import Header from '../../_components/Header';
import Notification from '../../_components/Notification';
import ItemsPerPageSelector from '../../_components/ItemsPerPageSelector';
import Pagination from '../../_components/Pagination';
import { useArticlesManagmentStore } from '@/store/articlesManagmentStore';
import { Article } from './types';
import { useArticlesReorder } from './hooks/useArticlesReorder';
import ArticleTable from './_components/ArticleTable';

const ArticlesManagmentPage = () => {
    const [notification, setNotification] = useState<{
        type: "success" | "error";
        message: string;
      } | null>(null);
       const {
          totalAllItems,
          totalPages,
          currentPage,
          itemsPerPage,
          setIsReordering,
          setItemsPerPage,
          setCurrentPage,
        } = useArticlesManagmentStore();

         const {
            loadArticles,
            reorderArticles,
          } = useArticlesReorder();

           useEffect(() => {
              if (notification) {
                const timer = setTimeout(() => {
                  setNotification(null);
                }, 5000);
                return () => clearTimeout(timer);
              }
            }, [notification]);

             useEffect(() => {
    loadArticles({ page: currentPage });
  }, [currentPage, loadArticles]);


  
    const handleReorder = async (reorderedArticles: Article[]) => {
      setIsReordering(true);
  
      try {
          const dataForApi = reorderedArticles.map((article)=>({
              _id: article._id.toString(),
              numericId: article.numericId || 0,
          })) ;
  
          const result = await reorderArticles(dataForApi);
  
          if(result.success){
              setNotification({
                  type: "success",
                  message: "Articles reordered successfully",
              });
          }else{
              setNotification({
                  type: "error",
                  message: result.message || "Failed to reorder articles",
              });
              throw new Error(result.message || "Failed to reorder articles");
          }
      } catch (error) {
        console.error("Error reordering articles", error);
        setNotification({
          type: "error",
          message: "Failed to reorder articles",
        });
        throw error;
      } finally {
        setIsReordering(false);
      }
    };
  
    const handleItemsPerPageChange = (perPage: number) => {
      setItemsPerPage(perPage);
      setCurrentPage(1);
      loadArticles({ page: 1 });
    };

  return (
    <div className='relative'>
        <Header
        title="Articles managment"
        description={`Total articles: ${totalAllItems}`}
      />
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
       <div className="mb-4">
        <ItemsPerPageSelector
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
        <div className="text-sm text-gray-500 mt-1">
          Current parametrs: page:{currentPage}, elements:{itemsPerPage}
        </div>
      </div>
      <ArticleTable
        onReorder={handleReorder}
      />
      {totalPages > 1 && <Pagination type="articles" />}
    </div>
  )
}

export default ArticlesManagmentPage