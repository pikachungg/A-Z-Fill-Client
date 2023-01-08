
import { FC } from 'react'
import Link from 'next/link'
import { useRouter} from 'next/router'

const NavBar:FC = () => {

	const router = useRouter()

	const back = () => {
		router.back()
	}

	return(
		<div className='grid grid-cols-12 pt-5 pb-5'>
			<div onClick={back} className='cursor-pointer col-start-2 col-span-12 text-green-300 ease-in-out transition-all duration-500 hover:text-green-400 font-semibold text-xl md:col-span-4 md:col-start-2 lg:col-span-3 lg:col-start-2 xl:col-span-2 xl:col-start-2'>
				<h1>Shapeless | A to Z Challenge</h1>
			</div>
		</div>
	)
}

export default NavBar