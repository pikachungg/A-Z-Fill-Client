import { NextPage } from 'next'
import Head from 'next/head'
import NavBar from '../components/NavBar'
import CollectiveStats from '../components/CollectiveStats'
import ChampionPool from '../components/ChampionPool'

const Stats:NextPage = () => {

	return(
		<>
			<Head>
				<title>Statistics</title>
			</Head>
			<main className='bg-gray-900 w-screen min-h-screen'>
				<NavBar/>
				<div className='w-4/5 m-auto'>
					<CollectiveStats/>
					<ChampionPool/>
				</div>
			</main>
		</>
	)
}

export default Stats