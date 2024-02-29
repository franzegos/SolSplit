'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import trimAddress from '@/lib/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from '../ui/input'

const GameWallet = () => {
	const wallet = useWallet()

	if (!wallet.connected) return

	return (
		<div className='px-3 w-full justify-between items-center flex bg-slate-200 h-10 rounded-sm'>
			<div className='flex gap-2'>
				<Image
					src={'/assets/sol.png'}
					width={25}
					height={25}
					alt='Solana Logo'
				/>
				<p className='text-md font-medium text-gray-700'>0.00</p>
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

const DepositContent = () => {
	const wallet = useWallet()
	const [option, setOption] = useState('Address')

	return (
		<div className='grid items-center gap-4'>
			{option === 'Address' ? (
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='asset'>Asset</Label>
					<Select defaultValue='SOL'>
						<SelectTrigger id='asset'>
							<SelectValue placeholder='Select' />
						</SelectTrigger>
						<SelectContent position='popper'>
							<SelectItem value='SOL'>
								<div className='flex items-center gap-2'>
									<Image
										src={'/assets/sol.png'}
										width={20}
										height={20}
										alt='Solana Logo'
									/>
									<p className='text-md font-medium text-gray-700'>SOL</p>
								</div>
							</SelectItem>
						</SelectContent>
					</Select>

					<div className='flex flex-col items-center justify-center w-full'>
						<Image
							src={'/assets/QR.png'}
							width={200}
							height={200}
							alt='Solana Logo'
						/>
					</div>
					<p className='mx-auto text-md align-middle font-medium text-gray-700 truncate'>
						{trimAddress('D2K7fVcP4wk99CmuuT1oKESZ7FANZiqUG8dQuKtzT1Gt')}
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-3 space-y-1.5'>
					<div className='flex flex-col space-y-1.5'>
						<Label>Connected Wallet</Label>
						<Input
							disabled
							placeholder={trimAddress(wallet.publicKey?.toString() || '')}
						/>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='asset'>Asset</Label>
						<Select defaultValue='SOL'>
							<SelectTrigger id='asset'>
								<SelectValue placeholder='Select' />
							</SelectTrigger>
							<SelectContent position='popper'>
								<SelectItem value='SOL'>
									<div className='flex items-center gap-2'>
										<Image
											src={'/assets/sol.png'}
											width={20}
											height={20}
											alt='Solana Logo'
										/>
										<p className='text-md font-medium text-gray-700'>SOL</p>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<div className='flex justify-between'>
							<Label>Deposit Amount</Label>
							<div className='flex items-center gap-1'>
								<p className='text-xs font-medium text-blue-400 cursor-pointer'>
									MAX:
								</p>
								<Label className='text-sm'>0.00 SOL</Label>
							</div>
						</div>
						<Input placeholder='0 SOL' />
					</div>
				</div>
			)}

			<div className='flex flex-col gap-2'>
				<Button variant='secondary' onClick={() => setOption('Address')}>
					{option === 'Address' ? 'Copy Address' : 'Go Back'}
				</Button>
				<Button onClick={() => setOption('Wallet')}>
					{option === 'Address' ? 'Deposit From Wallet' : 'Deposit'}
				</Button>
			</div>
		</div>
	)
}

const WithdrawContent = () => {
	const wallet = useWallet()
	return (
		<div className='flex flex-col gap-3 space-y-1.5'>
			<div className='flex flex-col space-y-1.5'>
				<Label htmlFor='asset'>Asset</Label>
				<Select defaultValue='SOL'>
					<SelectTrigger id='asset'>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent position='popper'>
						<SelectItem value='SOL'>
							<div className='flex items-center gap-2'>
								<Image
									src={'/assets/sol.png'}
									width={20}
									height={20}
									alt='Solana Logo'
								/>
								<p className='text-md font-medium text-gray-700'>SOL</p>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col space-y-1.5'>
				<div className='flex justify-between'>
					<Label>Withdraw Amount</Label>
					<div className='flex items-center gap-1'>
						<p className='text-xs font-medium text-blue-400 cursor-pointer'>
							MAX:
						</p>
						<Label className='text-sm'>0.00 SOL</Label>
					</div>
				</div>
				<Input placeholder='0 SOL' />
			</div>
			<div className='flex flex-col space-y-1.5'>
				<Label>Withdraw To</Label>
				<Input
					disabled
					placeholder={trimAddress(wallet.publicKey?.toString() || '')}
				/>
			</div>
			<Button>Withdraw</Button>
		</div>
	)
}

export default GameWallet
