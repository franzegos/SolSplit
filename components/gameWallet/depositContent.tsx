'use client'

import { getBalance } from '@/lib/solana'
import trimAddress from '@/lib/trimAddress'
import { useCloudWallet } from '@/query/cloud-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../ui/select'

const DepositContent = () => {
	const { publicKey } = useWallet()
	const [option, setOption] = useState<'Address' | 'Wallet'>('Address')

	const [balance, setBalance] = useState(0)

	useEffect(() => {
		getBalance(publicKey?.toString()).then(data => {
			if (!data) return
			setBalance(data)
		})
	}, [publicKey])

	return (
		<div className='grid items-center gap-4'>
			{option === 'Address' ? (
				<Address />
			) : (
				<div className='flex flex-col gap-3 space-y-1.5'>
					<div className='flex flex-col space-y-1.5'>
						<Label>Connected Wallet</Label>
						<Input
							disabled
							placeholder={trimAddress(publicKey?.toString() || '')}
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
								<Label className='text-sm'>{balance} SOL</Label>
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

const Address = () => {
	const { publicKey } = useWallet()
	const { data } = useCloudWallet({ publicKey })
	return (
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
				{trimAddress(data?.publicKey ?? '')}
			</p>
		</div>
	)
}

export default DepositContent
