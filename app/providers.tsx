'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import WalletContextProvider from './walletProvider'

const RootProvider = ({ children }: PropsWithChildren) => {
	// const [queryClient] = useState(
	// 	() =>
	// 		new QueryClient({
	// 			defaultOptions: {
	// 				queries: { staleTime: 6 * 1000, refetchInterval: 6 * 1000 }
	// 			}
	// 		})
	// )

	const queryClient = new QueryClient()

	return (
		<WalletContextProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WalletContextProvider>
	)
}

export default RootProvider
