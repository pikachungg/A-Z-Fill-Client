import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const About:NextPage = () => {
	return (
		<>
			<Head>
				<title>About & Rules</title>
			</Head>
			<main className='bg-gray-900 w-screen h-screen'>
				<NavBar/>
				<div className='md:w-2/5 w-5/6 m-auto'>
					<h1 className='md:text-5xl text-3xl text-green-300 font-semibold text-center p-5 md:p-10'>About & Rules</h1>
					<div className='text-md text-slate-200'>
						<p>The <span className='font-bold text-green-300'>A to Z Fill Challenge</span> is a challenge where you play champions in order from A to Z while queueing up your position as fill for the entire season. This challenge forces you to get out of your comfort zone and devise creative ways to win games.</p>
					</div>
					<hr className='m-8 h-px  border-0 bg-gray-700'/>
					<div>
						<h1 className='text-2xl font-semibold text-green-300'>Rules you MUST follow</h1>
						<ul className="space-y-1 max-w-md list-disc list-inside text-slate-200 mt-5">
							<li>Must go A to Z, you can't skip.</li>
							<li>Remakes don't count, game must be a win or loss.</li>
							<li>Can't trade with any teammate.</li>
							<li>Not allowed to duo.</li>
						</ul>
					</div>
					<hr className='m-8 h-px  border-0 bg-gray-700'/>
					<Link href="/" className='text-xl font-semibold text-green-300 hover:text-green-400 ease-in-out transition-all duration-300'>Go Back!</Link>
				</div>
			</main>
		</>
	)
}

export default About