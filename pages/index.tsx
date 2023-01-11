import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home:NextPage = () => {

	const router = useRouter()

	const redirectStats = (e:React.MouseEvent) => {
		e.preventDefault()
		router.push("/stats")
	}

	return (
		<div className='bg-gray-900 '>
			<Head>
				<title>A to Z Fill Challenge</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className='min-h-screen grid place-content-center'>
					<h1 className='text-center text-4xl text-slate-200'>Shapeless</h1>
					<Link href="/about" className='py-5 text-4xl font-bold text-green-300 ease-in-out transition-all duration-500 hover:text-green-400'>A to Z Fill Challenge</Link>
					<button onClick={redirectStats} className='block m-auto bg-green-300 px-5 py-2 rounded-md text-gray-800 ease-in-out transition-all duration-500 hover:bg-green-400'>See Stats</button>
				</div>
			</main>
		</div>
	)
}

export default Home