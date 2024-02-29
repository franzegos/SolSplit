import GameWallet from '@/components/gameWallet'
import { WalletConnect } from '@/components/walletModal'
import { HomeIcon } from 'lucide-react'
import React from 'react'

const Home = () => {
	return (
		<div className='flex min-h-screen bg-gray-200 dark:bg-gray-900'>
			<aside className='fixed  h-screen flex flex-col justify-between w-72 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-700'>
				<div className='flex flex-col justify-between'>
					<div className='p-3 h-16 flex items-center  border-b-2'>
						<h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
							Project X
						</h2>
					</div>
					<ul>
						<li className='p-3 flex items-center py-6 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'>
							<HomeIcon className='h-6 w-6' />
							<span className='text-md font-medium'>Home</span>
						</li>
					</ul>
				</div>

				<div className='p-3 flex flex-col gap-2'>
					<GameWallet />
					<WalletConnect />
				</div>
			</aside>

			<main className='flex-1 p-6'>Main Container</main>
		</div>
	)
}

export default Home
