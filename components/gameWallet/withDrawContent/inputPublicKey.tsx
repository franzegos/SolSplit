'use client'

import { Input } from '@/components/ui/input'
import trimAddress from '@/lib/trimAddress'
import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

const InputPublicKey = () => {
	const { publicKey } = useWallet()
	return (
		<Input disabled placeholder={trimAddress(publicKey?.toString() || '')} />
	)
}

export default InputPublicKey
