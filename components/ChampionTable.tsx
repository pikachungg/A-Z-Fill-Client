import { FC, ReactElement } from 'react'

interface ChampionInformation{
	wins: number
	loss: number
	winrate: number
	matchhistory: Match[]
}

interface Match{
	matchid: number
	position: number
	result: number
	kills: number
	deaths: number
	assists: number
	screenshot: string
}

interface ChampTableInterface{
	champinfo: ChampionInformation
}

const ChampionTable:FC<ChampTableInterface> = (props: ChampTableInterface) => {
	const tableHeaders = ["Match ID", "Result", "Position", "Kills", "Deaths", "Assists", "Screenshot"]
	
	const getPosition = (position: number): string => {
		switch(position){
			case 1:
				return "Top"
			case 2:
				return "Jungle"
			case 3:
				return "Middle"
			case 4:
				return "Bottom"
			case 5:
				return "Support"
			default:
				return "Unknown"
		}
	}

	const getResult = (result: number): string => {
		switch(result){
			case 1:
				return "Win"
			case 2:
				return "Loss"
			default:
				return "Unknown"
		}
	}

	const transformValues = ( index: number, value: any ): ReactElement => {
		switch(index){
			case 1:
				return <>{getResult(value)}</>
			case 2:
				return <>{getPosition(value)}</>
			default:
				return <>{value}</>
		}
	}

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
									<td className='py-4 px-6 text-slate-300 text-center' key={index}>{transformValues(index, match[k as keyof typeof match])}</td>
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