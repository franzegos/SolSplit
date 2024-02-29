import { CLOUD_WALLET_URL } from '@/lib/constant'
import { PublicKey } from '@solana/web3.js'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

type Response = {
	publicKey: string
}

type Props = {
	publicKey: (string | PublicKey) | null
}

export const useCloudWallet = ({ publicKey }: Props) => {
	const query = useQuery<Response>({
		queryKey: ['wallet', publicKey],
		queryFn: () =>
			fetch(`${CLOUD_WALLET_URL}/wallet/${publicKey}`).then(res => res.json()),
		enabled: !!publicKey
	})

	return query
}

export const useCreateCloudWallet = ({
	publicKey,
	queryClient
}: Props & { queryClient: QueryClient }) => {
	const mutate = useMutation({
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ['wallet', publicKey] })
		},
		mutationFn: () =>
			fetch(`${CLOUD_WALLET_URL}/create/${publicKey}`, { method: 'POST' }).then(
				res => res.json()
			)
	})
	return mutate
}
