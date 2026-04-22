

const CategoryNewBadge = ({createdAt}:{createdAt:string}) => {

    const createdDate = new Date(createdAt);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    if(createdDate > monthAgo){
        return (
            <div className="absolute top-3 right-3 z-10 bg-linear-to-r from-red-500 to-orange-400 text-white text-xs px-2 py-1 rounded-xl">new</div>
        )
    }

  return null;
}

export default CategoryNewBadge