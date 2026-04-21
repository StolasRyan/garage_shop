export   const getStatValue = (statTitle:string,categoriesCount:string ,keywordsCount:string)=>{
        switch (statTitle){
            case "Categories":
                return categoriesCount;
            case "Key words":
                return keywordsCount;
            case "Published":
                return '0';
            case "Views":
                return '0';
            default:
                return '0';
        }
    };