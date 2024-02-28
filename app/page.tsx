import { WalletConnect } from '@/components/walletModal'
import { cn } from '@/lib/utils'
import React from 'react'

const Home = () => {
	return (
		<div className={cn('container mx-auto')}>
			<WalletConnect />
		</div>
	)
}

export default Home
