'use client'

import { useCreateCloudWallet } from '@/query/cloud-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button } from './ui/button'

const CreateCloudWalletButton = () => {
	const { publicKey } = useWallet()
	const queryClient = useQueryClient()
	const { mutateAsync } = useCreateCloudWallet({ publicKey, queryClient })

	const [keypair, setKeypair] = useState<{
		publicKey: string
		secretKey: string
	} | null>(null)

	const handleCreate = async () => {
		try {
			const data = await mutateAsync()
			setKeypair(data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex flex-col'>
			<Button onClick={handleCreate} disabled={!publicKey}>
				Create Cloud Wallet
			</Button>
			<pre>{JSON.stringify(keypair, null, '\t')}</pre>
		</div>
	)
}

export default CreateCloudWalletButton
