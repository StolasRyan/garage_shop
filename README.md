This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Architecture

```bash
.
├── .DS_Store
├── .env
├── .git
├── .gitignore
├── .next
├── README.md
├── actions
│   ├── acceptRules.ts
│   ├── addToCartActions.ts
│   ├── getAdminContact.ts
│   ├── orderActions.ts
│   ├── priceAlerts.ts
├── app
│   ├── (admin)
│   │   ├── administrator
│   │   │   ├── (cms)
│   │   │   │   ├── cms
│   │   │   │   │   ├── CONFIG_BLOG.ts
│   │   │   │   │   ├── _components
│   │   │   │   │   │   ├── DashboardCard.tsx
│   │   │   │   │   │   ├── DashboardCardsGrid.tsx
│   │   │   │   │   │   ├── DragHandle.tsx
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   ├── ImageSection.tsx
│   │   │   │   │   │   ├── ItemsPerPageSelector.tsx
│   │   │   │   │   │   ├── Notification.tsx
│   │   │   │   │   │   ├── Pagination.tsx
│   │   │   │   │   │   ├── SEOReccomendations.tsx
│   │   │   │   │   │   ├── StatsItem.tsx
│   │   │   │   │   │   ├── StatsSection.tsx
│   │   │   │   │   │   ├── StatsSkeleton.tsx
│   │   │   │   │   ├── api
│   │   │   │   │   │   ├── articles
│   │   │   │   │   │   │   ├── articles-managment
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── featured
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── reorder
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── status
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── upload
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── temp-image
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── yandex-gpt
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── yandex-image
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── categories
│   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── reorder
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── upload
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── comments
│   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── site-settings
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── stats
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── articles
│   │   │   │   │   │   ├── articlesManagment
│   │   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   │   ├── AdvancedFilters.tsx
│   │   │   │   │   │   │   │   ├── ArticleTable.tsx
│   │   │   │   │   │   │   │   ├── DesktopArticleRow.tsx
│   │   │   │   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   │   │   │   ├── FilterControls.tsx
│   │   │   │   │   │   │   │   ├── MobileArticleCard.tsx
│   │   │   │   │   │   │   │   ├── MobileArticleHeader.tsx
│   │   │   │   │   │   │   │   ├── MobileExpandableContent.tsx
│   │   │   │   │   │   │   │   ├── ResultStats.tsx
│   │   │   │   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   │   │   │   ├── SortableItem.tsx
│   │   │   │   │   │   │   │   ├── TableHeader.tsx
│   │   │   │   │   │   │   ├── hooks
│   │   │   │   │   │   │   │   ├── useArticlesReorder.ts
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   │   ├── types
│   │   │   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   │   │   ├── dnd
│   │   │   │   │   │   │   │   │   │   ├── drag-drop.types.ts
│   │   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   ├── table
│   │   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   │   ├── rows.types.ts
│   │   │   │   │   │   │   │   │   │   ├── table.types.ts
│   │   │   │   │   │   │   │   │   ├── ui
│   │   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   │   ├── ui.types.ts
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── models
│   │   │   │   │   │   │   │   │   ├── api-responses.ts
│   │   │   │   │   │   │   │   │   ├── article.types.ts
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── utils
│   │   │   │   │   │   │   │   ├── buildFilterQuery.ts
│   │   │   │   │   │   │   │   ├── buildSortObject.ts
│   │   │   │   │   │   │   │   ├── getStatusStyles.ts
│   │   │   │   │   │   ├── editor
│   │   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   │   ├── ArticleForm.tsx
│   │   │   │   │   │   │   │   ├── ArticleFormFields.tsx
│   │   │   │   │   │   │   │   ├── ArticleSubmitSection.tsx
│   │   │   │   │   │   │   │   ├── CategorySelect.tsx
│   │   │   │   │   │   │   │   ├── css
│   │   │   │   │   │   │   │   │   ├── editor.css
│   │   │   │   │   │   │   │   │   ├── html-preview.css
│   │   │   │   │   │   │   │   │   ├── images.css
│   │   │   │   │   │   │   │   │   ├── modal-preview.css
│   │   │   │   │   │   │   │   │   ├── table.css
│   │   │   │   │   │   │   │   │   ├── tableMenu.css
│   │   │   │   │   │   │   │   ├── tiptap-components
│   │   │   │   │   │   │   │   │   ├── AlignmentMenu.tsx
│   │   │   │   │   │   │   │   │   ├── AllowHtmlAttributes.tsx
│   │   │   │   │   │   │   │   │   ├── ArticlePreviewModal.tsx
│   │   │   │   │   │   │   │   │   ├── BGColorMenu.tsx
│   │   │   │   │   │   │   │   │   ├── CodeEditorButton.tsx
│   │   │   │   │   │   │   │   │   ├── Counter.tsx
│   │   │   │   │   │   │   │   │   ├── FontSizeMenu.tsx
│   │   │   │   │   │   │   │   │   ├── HistoryMenu.tsx
│   │   │   │   │   │   │   │   │   ├── HtmlEditorModal.tsx
│   │   │   │   │   │   │   │   │   ├── ImageAttributes.tsx
│   │   │   │   │   │   │   │   │   ├── ImageAttributesModal.tsx
│   │   │   │   │   │   │   │   │   ├── ImageMenu.tsx
│   │   │   │   │   │   │   │   │   ├── LinkMenu.tsx
│   │   │   │   │   │   │   │   │   ├── ListMenu.tsx
│   │   │   │   │   │   │   │   │   ├── MainToolbar.tsx
│   │   │   │   │   │   │   │   │   ├── ParagraphButton.tsx
│   │   │   │   │   │   │   │   │   ├── QuoteButton.tsx
│   │   │   │   │   │   │   │   │   ├── TableMenu.tsx
│   │   │   │   │   │   │   │   │   ├── TextColorMenu.tsx
│   │   │   │   │   │   │   │   │   ├── TextFormattingMenu.tsx
│   │   │   │   │   │   │   │   │   ├── TiptapEditor.tsx
│   │   │   │   │   │   │   │   │   ├── imageAI
│   │   │   │   │   │   │   │   │   │   ├── ApiInfoAlert.tsx
│   │   │   │   │   │   │   │   │   │   ├── ErrorPanel.tsx
│   │   │   │   │   │   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   │   │   │   │   ├── ImageAIMenu.tsx
│   │   │   │   │   │   │   │   │   │   ├── ImageAIMenuModal.tsx
│   │   │   │   │   │   │   │   │   │   ├── MainContent.tsx
│   │   │   │   │   │   │   │   │   │   ├── PromptSection.tsx
│   │   │   │   │   │   │   │   │   │   ├── ResultPanel.tsx
│   │   │   │   │   │   │   │   │   │   ├── SettingsPanel.tsx
│   │   │   │   │   │   │   │   │   │   ├── StatusPanel.tsx
│   │   │   │   │   │   │   │   │   ├── textAI
│   │   │   │   │   │   │   │   │   │   ├── ConnectionStatus.tsx
│   │   │   │   │   │   │   │   │   │   ├── CustomPromptInput.tsx
│   │   │   │   │   │   │   │   │   │   ├── FooterStatus.tsx
│   │   │   │   │   │   │   │   │   │   ├── QuickActionsPanel.tsx
│   │   │   │   │   │   │   │   │   │   ├── TextAIMenu.tsx
│   │   │   │   │   │   │   │   │   │   ├── TextAIModal.tsx
│   │   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── hooks
│   │   │   │   │   │   │   ├── useArticleFormState.ts
│   │   │   │   │   │   │   ├── useArticles.ts
│   │   │   │   │   │   │   ├── useImageUpload.ts
│   │   │   │   │   │   │   ├── useToolbarOrders.ts
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── types
│   │   │   │   │   │   │   ├── ai
│   │   │   │   │   │   │   │   ├── image-ai.types.ts
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── text-ai.types.ts
│   │   │   │   │   │   │   ├── form
│   │   │   │   │   │   │   │   ├── article-form.types.ts
│   │   │   │   │   │   │   │   ├── form-fields.types.ts
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── tiptap
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── tiptap.types.ts
│   │   │   │   │   │   ├── utils
│   │   │   │   │   │   │   ├── CONFIG_TOOLBAR.ts
│   │   │   │   │   │   │   ├── aspectRatio.ts
│   │   │   │   │   │   │   ├── errorUtils.ts
│   │   │   │   │   │   │   ├── formatAIResponse.ts
│   │   │   │   │   │   │   ├── formatTime.ts
│   │   │   │   │   │   │   ├── processArticleImages.ts
│   │   │   │   │   │   │   ├── promptStyles.tsx
│   │   │   │   │   │   │   ├── quickActions.tsx
│   │   │   │   │   │   │   ├── systemPrompts.ts
│   │   │   │   │   │   │   ├── upload-image.ts
│   │   │   │   │   ├── auto-generate
│   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   ├── ArticleForm.tsx
│   │   │   │   │   │   │   ├── CategorySelect.tsx
│   │   │   │   │   │   │   ├── ErrorMessage.tsx
│   │   │   │   │   │   │   ├── GenerateButton.tsx
│   │   │   │   │   │   │   ├── GenerationStatusPanel.tsx
│   │   │   │   │   │   │   ├── ProcessInfo.tsx
│   │   │   │   │   │   │   ├── SuccessMessage.tsx
│   │   │   │   │   │   │   ├── TopicInput.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── types
│   │   │   │   │   │   │   ├── auto-generate.types.ts
│   │   │   │   │   │   ├── utils
│   │   │   │   │   │   │   ├── cleanGeneratedHTML.ts
│   │   │   │   │   │   │   ├── formatTime.ts
│   │   │   │   │   │   │   ├── getStatusText.ts
│   │   │   │   │   │   │   ├── imageGeneration.ts
│   │   │   │   │   │   │   ├── insertImages.ts
│   │   │   │   │   │   │   ├── textPrompt.ts
│   │   │   │   │   ├── categories
│   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   ├── AdvancedFilters.tsx
│   │   │   │   │   │   │   ├── CategoryForm.tsx
│   │   │   │   │   │   │   ├── CategoryTable.tsx
│   │   │   │   │   │   │   ├── DesktopCategoryRow.tsx
│   │   │   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   │   │   ├── FilterControls.tsx
│   │   │   │   │   │   │   ├── FormFields.tsx
│   │   │   │   │   │   │   ├── HeaderActions.tsx
│   │   │   │   │   │   │   ├── MobileCategoryCard.tsx
│   │   │   │   │   │   │   ├── MobileCategoryHeader.tsx
│   │   │   │   │   │   │   ├── MobileExpandableContent.tsx
│   │   │   │   │   │   │   ├── ReorderStatus.tsx
│   │   │   │   │   │   │   ├── ResultStats.tsx
│   │   │   │   │   │   │   ├── SearchBar.tsx
│   │   │   │   │   │   │   ├── SortableItem.tsx
│   │   │   │   │   │   │   ├── SubmitSection.tsx
│   │   │   │   │   │   │   ├── TableHeader.tsx
│   │   │   │   │   │   │   ├── WarningAlert.tsx
│   │   │   │   │   │   ├── hooks
│   │   │   │   │   │   │   ├── useCategories.ts
│   │   │   │   │   │   │   ├── useCategoryFormState.ts
│   │   │   │   │   │   │   ├── useCategoryFormValidation.ts
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── types
│   │   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   │   ├── dnd
│   │   │   │   │   │   │   │   │   ├── drag-drop.types.ts
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── form
│   │   │   │   │   │   │   │   │   ├── category-form.types.ts
│   │   │   │   │   │   │   │   │   ├── form-fields.types.ts
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   ├── table
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   ├── rows.types.ts
│   │   │   │   │   │   │   │   │   ├── table.types.ts
│   │   │   │   │   │   │   │   ├── ui
│   │   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   │   │   ├── ui.types.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── models
│   │   │   │   │   │   │   │   ├── api-responses.ts
│   │   │   │   │   │   │   │   ├── category.ts
│   │   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── utils
│   │   │   │   │   │   │   ├── buildFilterQuery.ts
│   │   │   │   │   │   │   ├── buildSortObject.ts
│   │   │   │   │   ├── comments
│   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   ├── BanUserModal.tsx
│   │   │   │   │   │   │   ├── CommentRow.tsx
│   │   │   │   │   │   │   ├── CommentsList.tsx
│   │   │   │   │   │   │   ├── CommentsTableHeader.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── types
│   │   │   │   │   │   │   ├── comments.types.ts
│   │   │   │   │   │   ├── utils
│   │   │   │   │   ├── hooks
│   │   │   │   │   │   ├── useSiteSettings.ts
│   │   │   │   │   │   ├── useStatsValues.ts
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── semantic-core
│   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   ├── CurrentSettings.tsx
│   │   │   │   │   │   │   ├── FormButtons.tsx
│   │   │   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   │   │   ├── SEOForm.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── sidebarMenu
│   │   │   │   │   │   ├── GlobalStyles.tsx
│   │   │   │   │   │   ├── IconArrowAnimated.tsx
│   │   │   │   │   │   ├── MenuFooter.tsx
│   │   │   │   │   │   ├── MenuHeader.tsx
│   │   │   │   │   │   ├── MenuItemsList.tsx
│   │   │   │   │   │   ├── MenuOverlay.tsx
│   │   │   │   │   │   ├── SidebarMenu.tsx
│   │   │   │   │   ├── types
│   │   │   │   │   │   ├── dashboard.ts
│   │   │   │   │   │   ├── entities.types.ts
│   │   │   │   │   │   ├── form
│   │   │   │   │   │   │   ├── form.types.ts
│   │   │   │   │   │   │   ├── image-section.types.ts
│   │   │   │   │   │   ├── siteSettings.ts
│   │   │   │   │   ├── utils
│   │   │   │   │   │   ├── SEO_LIMITS.ts
│   │   │   │   │   │   ├── dashboardCards.tsx
│   │   │   │   │   │   ├── getBgColor.ts
│   │   │   │   │   │   ├── getButtonColor.ts
│   │   │   │   │   │   ├── getStatValue.ts
│   │   │   │   │   │   ├── getTextColor.ts
│   │   │   │   │   │   ├── menuItems.tsx
│   │   │   │   │   │   ├── reccomendations.ts
│   │   │   │   │   │   ├── stats.tsx
│   │   │   ├── admin-orders
│   │   │   │   ├── _components
│   │   │   │   │   ├── AdminOrderCard.tsx
│   │   │   │   │   ├── AdminOrdersHeader.tsx
│   │   │   │   │   ├── Calendar.tsx
│   │   │   │   │   ├── CalendarOrderModal.tsx
│   │   │   │   │   ├── CityFilterButtons.tsx
│   │   │   │   │   ├── DateFilterButtons.tsx
│   │   │   │   │   ├── DateSelector.tsx
│   │   │   │   │   ├── IconNotice.tsx
│   │   │   │   │   ├── OrderChatModal.tsx
│   │   │   │   │   ├── OrderDetails.tsx
│   │   │   │   │   ├── OrderProductsLoader.tsx
│   │   │   │   │   ├── StatusDropDown.tsx
│   │   │   │   │   ├── TimeSlotGroup.tsx
│   │   │   │   │   ├── TimeSlotSection.tsx
│   │   │   │   │   ├── UserAvatar.tsx
│   │   │   │   ├── daypicker.css
│   │   │   │   ├── page.tsx
│   │   │   │   ├── utils
│   │   │   │   │   ├── customerStatuses.ts
│   │   │   │   │   ├── exelGenerator.ts
│   │   │   │   │   ├── exportOrderToExel.ts
│   │   │   │   │   ├── formatDeliveryDateTime.ts
│   │   │   │   │   ├── formatDisplayDate.ts
│   │   │   │   │   ├── formatPhoneNumber.ts
│   │   │   │   │   ├── getEnglishStatuses.ts
│   │   │   │   │   ├── getMappedStatus.ts
│   │   │   │   │   ├── getPaymentStatusText.ts
│   │   │   │   │   ├── getRoleDisplayName.ts
│   │   │   │   │   ├── getStatusColorClass.ts
│   │   │   │   │   ├── getUniqueCities.ts
│   │   │   ├── delivery-times
│   │   │   │   ├── _components
│   │   │   │   │   ├── AddTimeSlotForm.tsx
│   │   │   │   │   ├── MessageAalert.tsx
│   │   │   │   │   ├── SaveButton.tsx
│   │   │   │   │   ├── ScheduleTable.tsx
│   │   │   │   │   ├── ScheduleTableHeader.tsx
│   │   │   │   │   ├── ScheduleTableRow.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── utils
│   │   │   │   │   ├── convertTimeToMinutes.ts
│   │   │   │   │   ├── dateFormatters.ts
│   │   │   │   │   ├── getThreeDaysDates.ts
│   │   │   │   │   ├── sortTimeSlots.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── products
│   │   │   │   ├── _components
│   │   │   │   │   ├── BasePrice.tsx
│   │   │   │   │   ├── Brand.tsx
│   │   │   │   │   ├── Categories.tsx
│   │   │   │   │   ├── CheckboxGroup.tsx
│   │   │   │   │   ├── CustomCheckbox.tsx
│   │   │   │   │   ├── Description.tsx
│   │   │   │   │   ├── Discount.tsx
│   │   │   │   │   ├── ImageUploadSection.tsx
│   │   │   │   │   ├── ImageUploader.tsx
│   │   │   │   │   ├── Manufacturer.tsx
│   │   │   │   │   ├── Quantity.tsx
│   │   │   │   │   ├── Sku.tsx
│   │   │   │   │   ├── SuccessCreatedMessage.tsx
│   │   │   │   │   ├── Tags.tsx
│   │   │   │   │   ├── Title.tsx
│   │   │   │   │   ├── Weight.tsx
│   │   │   │   ├── add-product
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── edit-product
│   │   │   │   │   ├── [id]
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── products-list
│   │   │   │   │   ├── _components
│   │   │   │   │   │   ├── DeleteConfirmationModal.tsx
│   │   │   │   │   │   ├── SearchHeader.tsx
│   │   │   │   │   │   ├── SearchInput.tsx
│   │   │   │   │   │   ├── SearchProductsResult.tsx
│   │   │   │   │   │   ├── SearchStates.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   ├── styles.ts
│   │   │   ├── users-list
│   │   │   │   ├── _components
│   │   │   │   │   ├── Age.tsx
│   │   │   │   │   ├── Email.tsx
│   │   │   │   │   ├── Filters.tsx
│   │   │   │   │   ├── NavAndInfo.tsx
│   │   │   │   │   ├── Pagination.tsx
│   │   │   │   │   ├── Person.tsx
│   │   │   │   │   ├── Phone.tsx
│   │   │   │   │   ├── Register.tsx
│   │   │   │   │   ├── Role.tsx
│   │   │   │   │   ├── TableHeader.tsx
│   │   │   │   │   ├── TableRow.tsx
│   │   │   │   │   ├── UserId.tsx
│   │   │   │   │   ├── UsersTable.tsx
│   │   │   │   ├── page.tsx
│   ├── (articles)
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleSection.tsx
│   │   ├── Articles.tsx
│   │   ├── articles
│   │   │   ├── page.tsx
│   │   ├── fetchArticles.ts
│   ├── (auth)
│   │   ├── (login)
│   │   │   ├── login
│   │   │   │   ├── _components
│   │   │   │   │   ├── AuthMethodSelector.tsx
│   │   │   │   │   ├── LoginWithOtp.tsx
│   │   │   │   │   ├── UnverifiedEmail.tsx
│   │   │   │   ├── page.tsx
│   │   │   ├── otp-enter
│   │   │   │   ├── page.tsx
│   │   │   ├── password-enter
│   │   │   │   ├── page.tsx
│   │   ├── (register)
│   │   │   ├── _components
│   │   │   │   ├── CardInput.tsx
│   │   │   │   ├── CheckboxCard.tsx
│   │   │   │   ├── DateInput.tsx
│   │   │   │   ├── DeleteVerify.tsx
│   │   │   │   ├── EmailInput.tsx
│   │   │   │   ├── EnterCode.tsx
│   │   │   │   ├── ErrorContent.tsx
│   │   │   │   ├── GenderSelect.tsx
│   │   │   │   ├── LoadingContent.tsx
│   │   │   │   ├── PersonInput.tsx
│   │   │   │   ├── RegFormFooter.tsx
│   │   │   │   ├── SelectCity.tsx
│   │   │   │   ├── SelectRegion.tsx
│   │   │   │   ├── SuccesModal.tsx
│   │   │   │   ├── SuccessSent.tsx
│   │   │   │   ├── VerificationMethodModal.tsx
│   │   │   │   ├── VerifyEmail.tsx
│   │   │   ├── register
│   │   │   │   ├── page.tsx
│   │   │   ├── verify
│   │   │   │   ├── verify-email
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── verify-phone
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── verify-success
│   │   │   │   │   ├── page.tsx
│   │   ├── (update-password)
│   │   │   ├── (forgot-password)
│   │   │   │   ├── forgot-password
│   │   │   │   │   ├── page.tsx
│   │   │   ├── (reset-password)
│   │   │   │   ├── email-pass-reset
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── phone-pass-reset
│   │   │   │   │   ├── page.tsx
│   │   │   ├── _components
│   │   │   │   ├── PasswordResetEmail.tsx
│   │   │   │   ├── PhonePasswordResetRequest.tsx
│   │   │   │   ├── PhonePasswordResetVerify.tsx
│   │   │   │   ├── SuccessSentEmail.tsx
│   │   │   │   ├── SuccessUpdatePass.tsx
│   │   │   │   ├── SuccessUpdatePassword.tsx
│   │   ├── _components
│   │   │   ├── AuthFormLayout.tsx
│   │   │   ├── CloseButton.tsx
│   │   │   ├── OTPResendButton.tsx
│   │   │   ├── PasswordInput.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   ├── Tooltip.tsx
│   │   ├── verify-delete-email
│   │   │   ├── page.tsx
│   │   ├── verify-delete-phone
│   │   │   ├── page.tsx
│   ├── (blog)
│   │   ├── blog
│   │   │   ├── [category]
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── ArticleImage.tsx
│   │   │   │   │   ├── _components
│   │   │   │   │   │   ├── ArticleArchiveNotice.tsx
│   │   │   │   │   │   ├── ArticleAuthor.tsx
│   │   │   │   │   │   ├── ArticleContent.tsx
│   │   │   │   │   │   ├── ArticleHeader.tsx
│   │   │   │   │   │   ├── ArticleMeta.tsx
│   │   │   │   │   │   ├── ArticleTitle.tsx
│   │   │   │   │   │   ├── EditLink.tsx
│   │   │   │   │   │   ├── comments
│   │   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   │   ├── CommentActions.tsx
│   │   │   │   │   │   │   │   ├── CommentAvatar.tsx
│   │   │   │   │   │   │   │   ├── CommentEditForm.tsx
│   │   │   │   │   │   │   │   ├── CommentHeader.tsx
│   │   │   │   │   │   │   │   ├── CommentItem.tsx
│   │   │   │   │   │   │   │   ├── CommentReplies.tsx
│   │   │   │   │   │   │   │   ├── Comments.tsx
│   │   │   │   │   │   │   │   ├── CommentsForm.tsx
│   │   │   │   │   │   │   │   ├── CommentsSortButtons.tsx
│   │   │   │   │   │   │   │   ├── LoadMoreComments.tsx
│   │   │   │   │   │   │   │   ├── RulesModal.tsx
│   │   │   │   │   ├── css
│   │   │   │   │   │   ├── page.module.css
│   │   │   │   │   ├── page.tsx
│   │   │   │   ├── _components
│   │   │   │   │   ├── ArticlesList.tsx
│   │   │   │   │   ├── CategoryHeader.tsx
│   │   │   │   │   ├── CategoryImage.tsx
│   │   │   │   │   ├── CategoryStats.tsx
│   │   │   │   │   ├── CategoryTitle.tsx
│   │   │   │   │   ├── EmptyCategory.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── utils
│   │   │   │   │   ├── fetchArticle.ts
│   │   │   │   │   ├── fetchCategory.ts
│   │   │   │   │   ├── getAuthorBadges.ts
│   │   │   │   │   ├── getDeleteButtonTitle.ts
│   │   │   │   │   ├── getRelatedArticles.ts
│   │   │   ├── _components
│   │   │   │   ├── BlogSearch.tsx
│   │   │   │   ├── BlogShareButtons.tsx
│   │   │   ├── categories
│   │   │   │   ├── _components
│   │   │   │   │   ├── CategoriesList.tsx
│   │   │   │   │   ├── CategoryCard.tsx
│   │   │   │   │   ├── CategoryContent.tsx
│   │   │   │   │   ├── CategoryHoverEffect.tsx
│   │   │   │   │   ├── CategoryImage.tsx
│   │   │   │   │   ├── CategoryMeta.tsx
│   │   │   │   │   ├── CategoryNewBadge.tsx
│   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   ├── PageHeader.tsx
│   │   │   │   │   ├── StatsInfo.tsx
│   │   │   │   ├── css
│   │   │   │   │   ├── animation.css
│   │   │   │   │   ├── sidebar-animations.css
│   │   │   │   ├── sidebar
│   │   │   │   │   ├── CategoriesList.tsx
│   │   │   │   │   ├── CategoriesSidebar.tsx
│   │   │   │   │   ├── CategoryItem.tsx
│   │   │   │   │   ├── EmptyState.tsx
│   │   │   │   │   ├── FloatingMenuButton.tsx
│   │   │   │   │   ├── SearchInput.tsx
│   │   │   │   │   ├── SidebarContent.tsx
│   │   │   │   │   ├── SidebarHeader.tsx
│   │   │   │   │   ├── SidebarOverlay.tsx
│   │   │   │   ├── types
│   │   │   │   │   ├── categories.types.ts
│   │   │   │   │   ├── sidebar.types.ts
│   │   │   │   ├── utils
│   │   │   │   │   ├── getCategories.ts
│   │   │   │   │   ├── getImagePath.ts
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── rules
│   │   │   │   ├── page.tsx
│   │   │   ├── types
│   │   │   │   ├── articles.types.ts
│   │   │   │   ├── categories.types.ts
│   │   │   │   ├── comments.types.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── search.types.ts
│   ├── (cart)
│   │   ├── cart
│   │   │   ├── _components
│   │   │   │   ├── BonusesSection.tsx
│   │   │   │   ├── CartControls.tsx
│   │   │   │   ├── CartHeader.tsx
│   │   │   │   ├── CartItem.tsx
│   │   │   │   ├── CartSideBar.tsx
│   │   │   │   ├── CartSkeletons.tsx
│   │   │   │   ├── CheckoutButton.tsx
│   │   │   │   ├── CheckoutForm.tsx
│   │   │   │   ├── DeliveryAddress.tsx
│   │   │   │   ├── DeliveryTime.tsx
│   │   │   │   ├── DeliveryTimeSkeletons.tsx
│   │   │   │   ├── DiscountBadge.tsx
│   │   │   │   ├── MinimumOrderWarning.tsx
│   │   │   │   ├── OrderSuccessMessage.tsx
│   │   │   │   ├── PaymentButtons.tsx
│   │   │   │   ├── PriceDisplay.tsx
│   │   │   │   ├── PriceSummary.tsx
│   │   │   │   ├── ProductImage.tsx
│   │   │   │   ├── QuantitySelector.tsx
│   │   │   │   ├── SelectedIcon.tsx
│   │   │   │   ├── SelectionCheckbox.tsx
│   │   │   │   ├── styles.ts
│   │   │   ├── page.tsx
│   │   │   ├── utils
│   │   │   │   ├── formaTimeSlot.ts
│   │   │   │   ├── isTimeSlotPassed.ts
│   │   │   │   ├── orderHelpers.ts
│   ├── (catalog)
│   │   ├── CatalogAdminControls.tsx
│   │   ├── CatalogGrid.tsx
│   │   ├── GridCategoryBlock.tsx
│   │   ├── catalog
│   │   │   ├── CatalogPage.tsx
│   │   │   ├── [category]
│   │   │   │   ├── (productPage)
│   │   │   │   │   ├── [slug]
│   │   │   │   │   │   ├── ProductPageContent.tsx
│   │   │   │   │   │   ├── _components
│   │   │   │   │   │   │   ├── AddReviewForm.tsx
│   │   │   │   │   │   │   ├── AdditionalInfo.tsx
│   │   │   │   │   │   │   ├── Bonuses.tsx
│   │   │   │   │   │   │   ├── CartButton.tsx
│   │   │   │   │   │   │   ├── DiscountMessage.tsx
│   │   │   │   │   │   │   ├── ImagesBlock.tsx
│   │   │   │   │   │   │   ├── PriceAlertEmail.tsx
│   │   │   │   │   │   │   ├── PriceAlertModal.tsx
│   │   │   │   │   │   │   ├── ProductOffer.tsx
│   │   │   │   │   │   │   ├── ProductReviews.tsx
│   │   │   │   │   │   │   ├── ProductTitle.tsx
│   │   │   │   │   │   │   ├── RatingDistribution.tsx
│   │   │   │   │   │   │   ├── ReviewsWrapper.tsx
│   │   │   │   │   │   │   ├── SameBrandProducts.tsx
│   │   │   │   │   │   │   ├── ShareButton.tsx
│   │   │   │   │   │   │   ├── SimillarProducts.tsx
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── getProduct.ts
│   │   │   │   ├── fetchCategory.ts
│   │   │   │   ├── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── page.tsx
│   │   │   ├── product
│   │   │   │   ├── unsubscribe
│   │   │   │   │   ├── error
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── success
│   │   │   │   │   │   ├── page.tsx
│   ├── (payment)
│   │   ├── FakePaymentModal.tsx
│   │   ├── PaymentSuccessModal.tsx
│   ├── (products)
│   │   ├── .DS_Store
│   │   ├── GenericListPage.tsx
│   │   ├── NewProducts.tsx
│   │   ├── ProductsSection.tsx
│   │   ├── Sales.tsx
│   │   ├── fetchProducts.ts
│   │   ├── new
│   │   │   ├── page.tsx
│   │   ├── sales
│   │   │   ├── page.tsx
│   ├── (search)
│   │   ├── search
│   │   │   ├── page.tsx
│   ├── (user)
│   │   ├── Purchases.tsx
│   │   ├── favorites
│   │   │   ├── fetchFavorites.ts
│   │   │   ├── page.tsx
│   │   ├── fetchPurchases.ts
│   │   ├── purchases
│   │   │   ├── page.tsx
│   ├── (user-orders)
│   │   ├── user-orders
│   │   │   ├── _components
│   │   │   │   ├── DeliveryDatePicker.tsx
│   │   │   │   ├── DeliveryInfo.tsx
│   │   │   │   ├── OrderActions.tsx
│   │   │   │   ├── OrderCard.tsx
│   │   │   │   ├── OrderDetails.tsx
│   │   │   │   ├── OrderHeader.tsx
│   │   │   │   ├── PriceComparisonAlert.tsx
│   │   │   │   ├── PricePreservedAlert.tsx
│   │   │   │   ├── RepeatOrderSection.tsx
│   │   │   │   ├── RepeatOrderSuccessAlert.tsx
│   │   │   │   ├── StockWarningsAlert.tsx
│   │   │   │   ├── UserOrdersList.tsx
│   │   │   ├── page.tsx
│   │   │   ├── utils
│   │   │   │   ├── formatDisplayDate.ts
│   │   │   │   ├── formatOrderDate.ts
│   │   │   │   ├── getAvailableDates.ts
│   │   │   │   ├── getStatusColor.ts
│   │   │   │   ├── getStatusText.ts
│   ├── (user-profile)
│   │   ├── _components
│   │   │   ├── AlertMessage.tsx
│   │   │   ├── CameraModal.tsx
│   │   │   ├── ConfirmAvatarModal.tsx
│   │   │   ├── DeleteAccountInitialStep.tsx
│   │   │   ├── DeleteAccountModal.tsx
│   │   │   ├── DeleteAccountVerificationStep.tsx
│   │   │   ├── EmailChangeVerification.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   ├── ProfileAvatar.tsx
│   │   │   ├── ProfileCard.tsx
│   │   │   ├── ProfileEmail.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfilePassword.tsx
│   │   │   ├── ProfilePhone
│   │   │   │   ├── EditButton.tsx
│   │   │   │   ├── PhoneEditView.tsx
│   │   │   │   ├── PhoneVerifyView.tsx
│   │   │   │   ├── ProfilePhoneInput.tsx
│   │   │   │   ├── ProfilePhoneSettings.tsx
│   │   │   ├── SecuritySection.tsx
│   │   │   ├── SuccessChangeEmail.tsx
│   │   ├── goodbye
│   │   │   ├── page.tsx
│   │   ├── styles.css
│   │   ├── user-profile
│   │   │   ├── page.tsx
│   ├── .DS_Store
│   ├── api
│   │   ├── .DS_Store
│   │   ├── add-product
│   │   │   ├── route.ts
│   │   ├── admin
│   │   │   ├── chat
│   │   │   │   ├── [orderId]
│   │   │   │   │   ├── has-unread
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── read
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   ├── orders
│   │   │   │   ├── [orderId]
│   │   │   │   │   ├── delivery-time
│   │   │   │   │   │   ├── route.ts
│   │   │   ├── users
│   │   │   │   ├── [id]
│   │   │   │   │   ├── role
│   │   │   │   │   │   ├── route.ts
│   │   │   │   ├── orders
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   ├── articles
│   │   │   ├── route.ts
│   │   ├── auth
│   │   │   ├── [...all]
│   │   │   │   ├── route.ts
│   │   │   ├── avatar
│   │   │   │   ├── [userId]
│   │   │   │   │   ├── check
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── route.ts
│   │   │   ├── check-login
│   │   │   │   ├── route.ts
│   │   │   ├── check-phone
│   │   │   │   ├── route.ts
│   │   │   ├── check-session
│   │   │   │   ├── route.ts
│   │   │   ├── delete-account
│   │   │   │   ├── route.ts
│   │   │   ├── location
│   │   │   │   ├── route.ts
│   │   │   ├── login
│   │   │   │   ├── route.ts
│   │   │   ├── logout
│   │   │   │   ├── route.ts
│   │   │   ├── reset-phone-password
│   │   │   │   ├── route.ts
│   │   │   ├── set-password
│   │   │   │   ├── route.ts
│   │   │   ├── update-email
│   │   │   │   ├── route.ts
│   │   │   ├── update-phone
│   │   │   │   ├── route.ts
│   │   │   ├── upload-avatar
│   │   │   │   ├── route.ts
│   │   │   ├── user
│   │   │   │   ├── route.ts
│   │   ├── blog
│   │   │   ├── [category]
│   │   │   │   ├── [slug]
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   ├── categories
│   │   │   │   ├── route.ts
│   │   │   ├── search
│   │   │   │   ├── route.ts
│   │   │   ├── user
│   │   │   │   ├── [id]
│   │   │   │   │   ├── route.ts
│   │   ├── cart
│   │   │   ├── route.ts
│   │   ├── catalog
│   │   │   ├── route.ts
│   │   ├── category
│   │   │   ├── route.ts
│   │   ├── comments
│   │   │   ├── [id]
│   │   │   │   ├── like
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   ├── route.ts
│   │   ├── cron
│   │   │   ├── .DS_Store
│   │   │   ├── price-check
│   │   │   │   ├── route.ts
│   │   │   ├── update-delivery-dates
│   │   │   │   ├── route.ts
│   │   ├── delete-product
│   │   │   ├── route.ts
│   │   ├── delivery-times
│   │   │   ├── route.ts
│   │   ├── orders
│   │   │   ├── clear-cart
│   │   │   │   ├── route.ts
│   │   │   ├── route.ts
│   │   │   ├── update-after-payment
│   │   │   │   ├── route.ts
│   │   │   ├── update-status
│   │   │   │   ├── route.ts
│   │   ├── price-alerts
│   │   │   ├── unsubscribe
│   │   │   │   ├── route.ts
│   │   ├── products
│   │   │   ├── .DS_Store
│   │   │   ├── [id]
│   │   │   │   ├── .DS_Store
│   │   │   │   ├── reviews
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   ├── brand
│   │   │   │   ├── route.ts
│   │   │   ├── route.ts
│   │   │   ├── similar-products
│   │   │   │   ├── route.ts
│   │   ├── sales
│   │   ├── search
│   │   ├── search-full
│   │   │   ├── route.ts
│   │   ├── search-products
│   │   │   ├── route.ts
│   │   │   ├── route.ts
│   │   ├── sitemap-data
│   │   │   ├── route.ts
│   │   ├── update-product
│   │   │   ├── route.ts
│   │   ├── upload-image
│   │   │   ├── route.ts
│   │   ├── users
│   │   │   ├── favorites
│   │   │   │   ├── products
│   │   │   │   │   ├── route.ts
│   │   │   │   ├── route.ts
│   │   │   ├── purchases
│   │   │   │   ├── route.ts
│   │   │   ├── update-card
│   │   │   │   ├── route.ts
│   ├── components
│   │   ├── AddToCartButton.tsx
│   │   ├── BreadCrumbs.tsx
│   │   ├── CartSummary.tsx
│   │   ├── ErrorComponent.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── FilterComponents
│   │   │   ├── DropFilter.tsx
│   │   │   ├── FilterButtons.tsx
│   │   │   ├── FilterControls.tsx
│   │   │   ├── PriceFilter.tsx
│   │   │   ├── PriceFilterHeader.tsx
│   │   │   ├── PriceInputs.tsx
│   │   │   ├── PriceRangeSlider.tsx
│   │   ├── Footer
│   │   │   ├── Footer.tsx
│   │   ├── Header
│   │   │   ├── CatalogDropMenu
│   │   │   │   ├── CatalogMenu.tsx
│   │   │   │   ├── CatalogMenuWrapper.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HighLightText.tsx
│   │   │   ├── InStockToogle.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MiniLoader.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── SearchButton.tsx
│   │   │   ├── TopMenu.tsx
│   │   │   ├── UserBlock.tsx
│   │   │   ├── inputSearch
│   │   │   │   ├── InputBlock.tsx
│   │   │   │   ├── SearchInput.tsx
│   │   │   │   ├── SearchResults.tsx
│   │   ├── Loader.tsx
│   │   ├── Maps.tsx
│   │   ├── Pagination.tsx
│   │   ├── PaginationWrapper.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ScrollToTopButton.tsx
│   │   ├── Slider
│   │   │   ├── SlideOne.tsx
│   │   │   ├── SlideTwo.tsx
│   │   │   ├── Slider.tsx
│   │   ├── SpecialOffers.tsx
│   │   ├── StarRaiting.tsx
│   │   ├── ViewAllButton.tsx
│   │   ├── svg
│   │   │   ├── IconAvatarChange.tsx
│   │   │   ├── IconBox.tsx
│   │   │   ├── IconCart.tsx
│   │   │   ├── IconHeart.tsx
│   │   │   ├── IconMenuMob.tsx
│   │   │   ├── IconStar.tsx
│   │   │   ├── IconVision.tsx
│   │   ├── tiptap-icons
│   │   │   ├── check-icon.tsx
│   │   │   ├── chevron-down-icon.tsx
│   │   │   ├── heading-five-icon.tsx
│   │   │   ├── heading-four-icon.tsx
│   │   │   ├── heading-icon.tsx
│   │   │   ├── heading-one-icon.tsx
│   │   │   ├── heading-six-icon.tsx
│   │   │   ├── heading-three-icon.tsx
│   │   │   ├── heading-two-icon.tsx
│   │   ├── tiptap-ui
│   │   ├── tiptap-ui-primitive
│   │   │   ├── badge
│   │   │   │   ├── badge-colors.scss
│   │   │   │   ├── badge-group.scss
│   │   │   │   ├── badge.scss
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── index.tsx
│   │   │   ├── button
│   │   │   │   ├── button-colors.scss
│   │   │   │   ├── button.scss
│   │   │   │   ├── button.tsx
│   │   │   │   ├── index.tsx
│   │   │   ├── card
│   │   │   │   ├── card.scss
│   │   │   │   ├── card.tsx
│   │   │   │   ├── index.tsx
│   │   │   ├── dropdown-menu
│   │   │   │   ├── dropdown-menu.scss
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── index.tsx
│   │   │   ├── tooltip
│   │   │   │   ├── index.tsx
│   │   │   │   ├── tooltip.scss
│   │   │   │   ├── tooltip.tsx
│   │   │   ├── heading-button
│   │   │   │   ├── heading-button.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── use-heading.ts
│   │   │   ├── heading-dropdown-menu
│   │   │   │   ├── heading-dropdown-menu.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── use-heading-dropdown-menu.ts
│   ├── contexts
│   │   ├── ArticleContext.tsx
│   │   ├── CategoryContext.tsx
│   │   ├── ProductContext.tsx
│   │   ├── RegFormContext.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── hooks
│   │   ├── redux.ts
│   │   ├── useAvatar.ts
│   │   ├── useDeliveryData.ts
│   │   ├── useDeliverySchedule.ts
│   │   ├── useFavorite.ts
│   │   ├── useOrderPricing.ts
│   │   ├── useOrderProducts.ts
│   │   ├── useOrderProductsData.ts
│   │   ├── usePriceComparsion.ts
│   │   ├── usePricing.ts
│   │   ├── useRepeatOrder.ts
│   │   ├── useTimer.ts
│   ├── layout.tsx
│   ├── lib
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   ├── priceDiscountEmail.ts
│   ├── page.tsx
│   ├── provider.tsx
│   ├── sitemap.ts
│   ├── styles.ts
├── cleanup.mjs
├── config
│   ├── config.ts
├── constants
│   ├── addProductFormData.ts
│   ├── regFormData.ts
├── data
│   ├── cities.ts
│   ├── columnsUsersList.ts
│   ├── reigions.ts
├── eslint.config.mjs
├── hooks
│   ├── use-is-breakpoint.ts
│   ├── use-tiptap-editor.ts
├── lib
│   ├── tiptap-utils.ts
├── migrate-mongo-config.js
├── migrations
│   ├── 20251219173331-articles.js
│   ├── articlesDatabase.json
├── next-env.d.ts
├── next.config.ts
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public
│   ├── .DS_Store
│   ├── arrow-right.svg
│   ├── articles
│   ├── blogCategories
│   │   ├── beer_1776690063794.jpeg
│   │   ├── bread_1776690821044.jpeg
│   │   ├── fruit_1776689889199.jpeg
│   │   ├── hf_1776690192270.jpg
│   │   ├── meat_1776689978712.jpeg
│   │   ├── oil_1776690128400.jpg
│   │   ├── spices_1776690534854.webp
│   │   ├── sweet_1776690441351.jpeg
│   │   ├── tea_1776690621877.jpg
│   │   ├── vegies_1776690734788.jpeg
│   │   ├── wave_1777013043414.jpg
│   ├── box.svg
│   ├── chevron-down.svg
│   ├── close.svg
│   ├── female.png
│   ├── file.svg
│   ├── globe.svg
│   ├── heart.svg
│   ├── icon-attention.svg
│   ├── icon-closer.svg
│   ├── icon-date.svg
│   ├── icon-entry.svg
│   ├── icon-has.svg
│   ├── images
│   │   ├── .DS_Store
│   │   ├── articles
│   │   │   ├── article-1.jpeg
│   │   │   ├── article-2.jpeg
│   │   │   ├── article-3.jpeg
│   │   ├── banners
│   │   │   ├── banner-action-desk.jpeg
│   │   │   ├── banner-action-mob-tab.jpeg
│   │   │   ├── banner-card-image.png
│   │   │   ├── banner-card.jpeg
│   │   ├── categories
│   │   │   ├── .DS_Store
│   │   │   ├── img-1.png
│   │   │   ├── img-10.png
│   │   │   ├── img-11.png
│   │   │   ├── img-12.png
│   │   │   ├── img-13.png
│   │   │   ├── img-2.png
│   │   │   ├── img-3.png
│   │   │   ├── img-4.png
│   │   │   ├── img-5.png
│   │   │   ├── img-6.png
│   │   │   ├── img-7.png
│   │   │   ├── img-8.png
│   │   │   ├── img-9.png
│   │   ├── crowd.jpeg
│   │   ├── icons_map
│   │   │   ├── .DS_Store
│   │   │   ├── map-pin.svg
│   │   ├── pink.png
│   │   ├── products
│   │   │   ├── .DS_Store
│   │   │   ├── img-1.jpeg
│   │   │   ├── img-10.jpeg
│   │   │   ├── img-100.jpeg
│   │   │   ├── img-101.jpeg
│   │   │   ├── img-102.jpeg
│   │   │   ├── img-103 (1).jpeg
│   │   │   ├── img-103.jpeg
│   │   │   ├── img-105.jpeg
│   │   │   ├── img-106.jpeg
│   │   │   ├── img-107.jpeg
│   │   │   ├── img-108.jpeg
│   │   │   ├── img-109.jpeg
│   │   │   ├── img-11.jpeg
│   │   │   ├── img-110.jpeg
│   │   │   ├── img-111.jpeg
│   │   │   ├── img-112.jpeg
│   │   │   ├── img-113.jpeg
│   │   │   ├── img-114.jpeg
│   │   │   ├── img-115.jpeg
│   │   │   ├── img-116.jpeg
│   │   │   ├── img-117.jpeg
│   │   │   ├── img-118.jpeg
│   │   │   ├── img-119.jpeg
│   │   │   ├── img-12.jpeg
│   │   │   ├── img-120.jpeg
│   │   │   ├── img-121.jpeg
│   │   │   ├── img-122.jpeg
│   │   │   ├── img-123.jpeg
│   │   │   ├── img-124.jpeg
│   │   │   ├── img-125.jpeg
│   │   │   ├── img-126.jpeg
│   │   │   ├── img-127.jpeg
│   │   │   ├── img-13.jpeg
│   │   │   ├── img-14.jpeg
│   │   │   ├── img-15.jpeg
│   │   │   ├── img-16.jpeg
│   │   │   ├── img-17.jpeg
│   │   │   ├── img-18.jpeg
│   │   │   ├── img-19.jpeg
│   │   │   ├── img-2.jpeg
│   │   │   ├── img-20.jpeg
│   │   │   ├── img-21.jpeg
│   │   │   ├── img-22.jpeg
│   │   │   ├── img-23.jpeg
│   │   │   ├── img-24.jpeg
│   │   │   ├── img-25.jpeg
│   │   │   ├── img-26.jpeg
│   │   │   ├── img-27.jpeg
│   │   │   ├── img-28.jpeg
│   │   │   ├── img-29.jpeg
│   │   │   ├── img-3.jpeg
│   │   │   ├── img-30.jpeg
│   │   │   ├── img-308368982124046.jpeg
│   │   │   ├── img-31.jpeg
│   │   │   ├── img-32.jpeg
│   │   │   ├── img-33.jpeg
│   │   │   ├── img-34.jpeg
│   │   │   ├── img-35.jpeg
│   │   │   ├── img-36.jpeg
│   │   │   ├── img-37.jpeg
│   │   │   ├── img-38.jpeg
│   │   │   ├── img-39.jpeg
│   │   │   ├── img-4.jpeg
│   │   │   ├── img-40.jpeg
│   │   │   ├── img-41.jpeg
│   │   │   ├── img-42.jpeg
│   │   │   ├── img-43.jpeg
│   │   │   ├── img-44.jpeg
│   │   │   ├── img-45.jpeg
│   │   │   ├── img-46.jpeg
│   │   │   ├── img-47.jpeg
│   │   │   ├── img-48.jpeg
│   │   │   ├── img-49.jpeg
│   │   │   ├── img-5.jpeg
│   │   │   ├── img-50.jpeg
│   │   │   ├── img-51.jpeg
│   │   │   ├── img-52.jpeg
│   │   │   ├── img-53.jpeg
│   │   │   ├── img-54.jpeg
│   │   │   ├── img-55.jpeg
│   │   │   ├── img-56.jpeg
│   │   │   ├── img-57.jpeg
│   │   │   ├── img-58.jpeg
│   │   │   ├── img-59.jpeg
│   │   │   ├── img-6.jpeg
│   │   │   ├── img-60.jpeg
│   │   │   ├── img-61.jpeg
│   │   │   ├── img-62.jpeg
│   │   │   ├── img-63.jpeg
│   │   │   ├── img-64.jpeg
│   │   │   ├── img-65.jpeg
│   │   │   ├── img-66.jpeg
│   │   │   ├── img-67.jpeg
│   │   │   ├── img-68.jpeg
│   │   │   ├── img-69.jpeg
│   │   │   ├── img-7.jpeg
│   │   │   ├── img-70.jpeg
│   │   │   ├── img-71.jpeg
│   │   │   ├── img-72.jpeg
│   │   │   ├── img-73.jpeg
│   │   │   ├── img-74.jpeg
│   │   │   ├── img-75.jpeg
│   │   │   ├── img-76.jpeg
│   │   │   ├── img-77.jpeg
│   │   │   ├── img-78.jpeg
│   │   │   ├── img-79.jpeg
│   │   │   ├── img-8.jpeg
│   │   │   ├── img-80.jpeg
│   │   │   ├── img-81.jpeg
│   │   │   ├── img-82.jpeg
│   │   │   ├── img-83.jpeg
│   │   │   ├── img-84.jpeg
│   │   │   ├── img-85.jpeg
│   │   │   ├── img-86.jpeg
│   │   │   ├── img-87.jpeg
│   │   │   ├── img-88.jpeg
│   │   │   ├── img-89.jpeg
│   │   │   ├── img-9.jpeg
│   │   │   ├── img-90.jpeg
│   │   │   ├── img-91.jpeg
│   │   │   ├── img-92.jpeg
│   │   │   ├── img-93.jpeg
│   │   │   ├── img-94.jpeg
│   │   │   ├── img-95.jpeg
│   │   │   ├── img-96.jpeg
│   │   │   ├── img-97.jpeg
│   │   │   ├── img-98.jpeg
│   │   │   ├── img-99.jpeg
│   │   ├── unknown.png
│   │   ├── wave.png
│   ├── male.png
│   ├── menu.svg
│   ├── next.svg
│   ├── og-image.jpeg
│   ├── robots.txt
│   ├── search.svg
│   ├── shopping-cart.svg
│   ├── temp
│   ├── uploads
│   │   ├── articles
│   │   │   ├── 1777130117460_4gax4j_3lem.jpg
│   │   │   ├── 1777130129286_i16kga_q6em.jpg
│   │   │   ├── 1777130171838_xd9een_xm6u.jpg
│   │   │   ├── 1777130179417-232.png
│   │   │   ├── 1777801895572-95.jpeg
│   │   │   ├── yandex_art
│   │   │   │   ├── yandex_art_1777300748694_cwhw8p.png
│   │   │   │   ├── yandex_art_1777801730791_vpg66i.png
│   │   │   │   ├── yandex_art_1778090699523_hl2viy.png
│   │   │   │   ├── yandex_art_1778090711963_ft84i4.png
│   │   │   │   ├── yandex_art_1778090727477_xhpyby.png
│   ├── user.svg
│   ├── vercel.svg
│   ├── window.svg
├── scripts
│   ├── checkPriceAlerts.ts
├── scss.d.ts
├── seed-db.ts
├── seed-products-add-field.ts
├── seed-rate-to-null.js
├── seed-rate-to-null.ts
├── seed-ratings.ts
├── seed-sku-db.ts
├── store
│   ├── StatesProvider.tsx
│   ├── articleStore.ts
│   ├── articlesManagmentStore.ts
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── categoryStore.ts
│   ├── commentsStore.ts
│   ├── redux
│   │   ├── api
│   │   │   ├── chatApi.ts
│   │   │   ├── ordersApi.ts
│   │   ├── index.ts
├── styles
├── styles.d.ts
│   ├── _keyframe-animations.scss
│   ├── _variables.scss
├── tsconfig.json
├── types
│   ├── ArticlesSection.ts
│   ├── PaginationProps.ts
│   ├── addProductTypes.ts
│   ├── articlesListProps.ts
│   ├── availableDate.ts
│   ├── cart.ts
│   ├── catalog.ts
│   ├── catalogAdminControlsProps.ts
│   ├── catalogGridProps.ts
│   ├── catalogMenuProps.ts
│   ├── categories.ts
│   ├── categoryBlockProps.ts
│   ├── chat.ts
│   ├── deliverySchedule.ts
│   ├── errorProps.ts
│   ├── exel.ts
│   ├── filterControlsProps.ts
│   ├── filtersState.ts
│   ├── genericListPageProps.ts
│   ├── order.ts
│   ├── payment.ts
│   ├── priceInputsProps.ts
│   ├── priceTypes.ts
│   ├── pricingProps.ts
│   ├── product.ts
│   ├── productsSection.ts
│   ├── reduxApi.ts
│   ├── regFormData.ts
│   ├── searchInputProps.ts
│   ├── searchProduct.ts
│   ├── searchResultsProps.ts
│   ├── sitemap.ts
│   ├── storeStates.ts
│   ├── userData.ts
│   ├── userOrder.ts
├── utils
│   ├── admin
│   │   ├── calculateAge.ts
│   │   ├── formatBirthday.ts
│   │   ├── isBirthdaySoon.ts
│   │   ├── maskPhone.ts
│   │   ├── rolesUtils.ts
│   │   ├── shortDecimalId.ts
│   ├── api-routes.ts
│   ├── auth-helpers.ts
│   ├── avatarUtils.ts
│   ├── baseUrl.ts
│   ├── bonusWord.ts
│   ├── calcPrices.ts
│   ├── createSlug.ts
│   ├── debounce.ts
│   ├── deleteUserAccount.ts
│   ├── deleteUserAvatarFromGridFS.ts
│   ├── formatDate.ts
│   ├── formatDateToLocalYYYYMMDD.ts
│   ├── formatPhoneNumber.ts
│   ├── formatPrice.ts
│   ├── formatWeight.ts
│   ├── generateSiteMetadata.ts
│   ├── getAvailableTimeSlots.ts
│   ├── getAvatarByGender.ts
│   ├── getColorFromName.ts
│   ├── getGoodsWord.ts
│   ├── getReviewsWord.ts
│   ├── getServerUserId.ts
│   ├── getSiteMetadata.ts
│   ├── getSitemapData.ts
│   ├── optimizeImages
│   │   ├── optimazeImage.ts
│   │   ├── optimizeCameraPhoto.ts
│   ├── pathTranslations.ts
│   ├── proxy-redirects.ts
│   ├── sanitizeArticleHTML.ts
│   ├── shuffleArray.ts
│   ├── transliterate.ts
│   ├── validation
│   │   ├── form.ts
│   │   ├── passworValid.ts
│   │   ├── validProfileCard.ts
│   │   ├── validateBirthDate.ts

```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
