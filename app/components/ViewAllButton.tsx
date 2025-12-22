import Image from "next/image"
import Link from "next/link"

const ViewAllButton = ({btnText, href}:{btnText:string, href:string}) => {
  return (
    <Link href={href} className='flex flex-row items-center gap-x-2 cursor-pointer'>
                    <p className='text-base text-center text-gray-500 hover:text-gray-300'>{btnText}</p>
                    <Image src='arrow-right.svg' alt={btnText} width={24} height={24} sizes='24px'/>
                </Link>
  )
}

export default ViewAllButton