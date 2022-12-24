import { FC } from 'react'

interface ChampionInformation{
	championid: string
	wins: number
	loss: number
	matchhistory: Match[]
}

interface Match{
	date: string
	position: string
	result: string
	kills: string
	deaths: string
	assists: string
}

interface ChampTableInterface{
	champinfo: ChampionInformation
}

const ChampionTable:FC<ChampTableInterface> = (props: ChampTableInterface) => {
	const tableHeaders = ["Date", "Position", "Result", "Kills", "Deaths", "Assists"]

	return(
		<table className='table-auto w-full'>
			<thead className='text-xs  uppercase  bg-gray-700 text-gray-400'>
				<tr>
				{
					tableHeaders.map( (tableHeader, index) => (
						<th scope='col' className='py-3 px-6' key={index}>{tableHeader}</th>
					))
				}
				</tr>
			</thead>
			<tbody>
				{
					props.champinfo.matchhistory.map( (match, index) => (
						<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={index}>
							{
								Object.keys(match).map( (k,index) => (
									<td className='py-4 px-6 text-slate-300 text-center' key={index}>{match[k as keyof typeof match]}</td>
								))
							}
						</tr>
					))
				}
			</tbody>
		</table>	
	)
}

export default ChampionTable