'use client'

import { Label } from '@/components/ui/label'
import { getBalance } from '@/lib/solana'
import { useCloudWallet } from '@/query/cloud-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'

const Max = () => {
	const { publicKey } = useWallet()
	const { data } = useCloudWallet({ publicKey })

	const [balance, setBalance] = useState(0)

	useEffect(() => {
		if (!data?.publicKey) return
		getBalance(data?.publicKey).then(data => {
			if (!data) return
			setBalance(data)
		})
	}, [data?.publicKey])

	return <Label className='text-sm'>{balance} SOL</Label>
}

export default Max
