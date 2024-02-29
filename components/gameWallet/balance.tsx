'use client'

import { getBalance } from '@/lib/solana'
import { cn } from '@/lib/utils'
import { useCloudWallet } from '@/query/cloud-wallet'
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'

const Balance = () => {
	const { publicKey } = useWallet()
	const { data } = useCloudWallet({ publicKey })

	const [balance, setBalance] = useState(0)

	useEffect(() => {
		getBalance(data?.publicKey).then(balance => {
			if (!balance) return
			setBalance(balance)
		})
	}, [data?.publicKey])

	return <p className={cn('text-md font-medium text-gray-700')}>{balance}</p>
}

export default Balance
