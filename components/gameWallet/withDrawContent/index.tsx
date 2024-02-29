import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import Image from 'next/image'
import InputPublicKey from './inputPublicKey'
import Max from './max'

const WithdrawContent = () => {
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
						<Max />
					</div>
				</div>
				<Input placeholder='0 SOL' />
			</div>
			<div className='flex flex-col space-y-1.5'>
				<Label>Withdraw To</Label>
				<InputPublicKey />
			</div>
			<Button>Withdraw</Button>
		</div>
	)
}

export default WithdrawContent
