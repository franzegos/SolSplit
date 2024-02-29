import CreateCloudWalletButton from '@/components/createCloudWallet.button'
import Deposit from '@/components/deposit'
import { WalletConnect } from '@/components/walletModal'
import { cn } from '@/lib/utils'
import React from 'react'

const Home = () => {
	return (
		<div className={cn('container mx-auto space-y-4')}>
			<div>
				<WalletConnect />
			</div>
			<CreateCloudWalletButton />
			<Deposit />
		</div>
	)
}

export default Home
