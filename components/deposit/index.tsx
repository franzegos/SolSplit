'use client'

import { useCloudWallet } from '@/query/cloud-wallet'
import { zodResolver } from '@hookform/resolvers/zod'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction
} from '@solana/web3.js'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Spinner from '../spinner'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

const formSchema = z.object({
	amount: z.coerce.number().gt(0, { message: 'Amount is required' })
})

const Deposit = () => {
	const { connection } = useConnection()
	const { publicKey, sendTransaction } = useWallet()

	const { data } = useCloudWallet({ publicKey })

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 0
		}
	})

	const onSubmit = useCallback(
		async ({ amount }: z.infer<typeof formSchema>) => {
			try {
				setIsLoading(true)
				if (!publicKey || !data?.publicKey) throw new WalletNotConnectedError()

				const transaction = new Transaction().add(
					SystemProgram.transfer({
						fromPubkey: publicKey,
						toPubkey: new PublicKey(data?.publicKey),
						lamports: amount * LAMPORTS_PER_SOL
					})
				)

				const {
					context: { slot: minContextSlot },
					value: { blockhash, lastValidBlockHeight }
				} = await connection.getLatestBlockhashAndContext()

				const signature = await sendTransaction(transaction, connection, {
					minContextSlot
				})

				await connection.confirmTransaction({
					blockhash,
					lastValidBlockHeight,
					signature
				})
			} catch (error) {
				console.error(error)
			} finally {
				form.reset()
				setIsLoading(false)
			}
		},
		[publicKey, sendTransaction, connection, data?.publicKey, form.reset]
	)

	console.log(data?.publicKey)

	return (
		<Form {...form}>
			<Input
				disabled
				defaultValue={data?.publicKey}
				placeholder='Cloud Wallet Address'
			/>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Deposit SOL Amount</FormLabel>
							<FormControl>
								<Input placeholder='Input Amount' {...field} />
							</FormControl>
							<FormDescription>
								Deposit SOL to your Cloud Wallet
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={!publicKey || isLoading}>
					{isLoading ? <Spinner>Depositing</Spinner> : 'Deposit'}
				</Button>
			</form>
		</Form>
	)
}

export default Deposit
