import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React from 'react'
import Balance from './balance'
import DepositContent from './depositContent'
import WithdrawContent from './withDrawContent'

const GameWallet = () => {
	return (
		<div className='px-3 w-full justify-between items-center flex bg-slate-200 h-10 rounded-sm'>
			<div className='flex gap-2'>
				<Image
					src={'/assets/sol.png'}
					width={25}
					height={25}
					alt='Solana Logo'
				/>
				<Balance />
			</div>

			<Dialog>
				<DialogTrigger asChild>
					<p className='text-md font-medium text-blue-400 cursor-pointer'>
						Transfer
					</p>
				</DialogTrigger>
				<DialogContent className='sm:max-w-sm'>
					<DialogHeader>
						<DialogTitle>Game Wallet</DialogTitle>
					</DialogHeader>
					<Tabs defaultValue='deposit' className='flex flex-col gap-2'>
						<TabsList className='grid w-full grid-cols-2'>
							<TabsTrigger value='deposit'>Deposit</TabsTrigger>
							<TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
						</TabsList>

						<TabsContent value='deposit'>
							<DepositContent />
						</TabsContent>

						<TabsContent value='withdraw'>
							<WithdrawContent />
						</TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default GameWallet
