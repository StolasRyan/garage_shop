
import { CategoryHeaderProps } from '../../types'
import CategoryTitle from './CategoryTitle'

const CategoryHeader = ({title,description}:CategoryHeaderProps) => {
  return (
    <div>
        <CategoryTitle categoryTitle={title}/>
        {description && (
            <p className='text-gray-600 text-lg mt-2'>{description}</p>
        )}
    </div>
  )
}

export default CategoryHeader