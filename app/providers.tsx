import { PropsWithChildren } from 'react'
import WalletContextProvider from './walletProvider'

const RootProvider = ({ children }: PropsWithChildren) => {
	return <WalletContextProvider>{children}</WalletContextProvider>
}

export default RootProvider
