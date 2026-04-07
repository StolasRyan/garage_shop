const fetchProductsByCategory = async(
    category:string, 
    options:{ 
        pagination: {startIndex:number,  perPage:number };
        filter?: string | string[];
        priceFrom?: string;
        priceTo?: string;
        inStock?: boolean;
    })=>{

        const {pagination, filter, priceFrom, priceTo, inStock} = options;

    try {
    const url = new URL(`${process.env.NEXT_PUBLICK_BASE_URL!}/api/category`);
    url.searchParams.append("category", category);
    url.searchParams.append("startIndex", pagination.startIndex.toString());
    url.searchParams.append("perPage", pagination.perPage.toString());

    if(filter){
        if(Array.isArray(filter)){
            filter.forEach((f)=>{
                url.searchParams.append("filter", f)
            })
        }else{
            url.searchParams.append("filter", filter)
        }
    }

    if(priceFrom){
        url.searchParams.append("priceFrom", priceFrom)
    }

    if(priceTo){
        url.searchParams.append("priceTo", priceTo)
    }
    
    if(inStock !== undefined){
        url.searchParams.append("inStock", inStock.toString())
    }
    
    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch category ${category }`);
    }
    
    const data = await res.json();
    
    return {items: data.products || data,
      totalCount: data.totalCount || data.length
    };
    
    
  } catch (e) {
    throw e;
  }
};
 

export default fetchProductsByCategory