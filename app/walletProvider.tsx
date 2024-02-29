'use client'

import { NODE_ENV } from '@/lib/constant'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
	ConnectionProvider,
	WalletProvider
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

type WalletContextProviderProps = {
	children: React.ReactNode
}

const network =
	NODE_ENV === 'development'
		? WalletAdapterNetwork.Devnet
		: WalletAdapterNetwork.Mainnet

const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
	const endpoint = clusterApiUrl(network)
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const wallets: any = []

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}

export default WalletContextProvider
