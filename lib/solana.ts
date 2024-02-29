import {
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
	clusterApiUrl,
	sendAndConfirmTransaction
} from '@solana/web3.js'
import base58 from 'bs58'
import { NODE_ENV } from './constant'

const network = NODE_ENV === 'development' ? 'devnet' : 'mainnet-beta'

export const connection = new Connection(clusterApiUrl(network), 'confirmed')

export const getBalance = async (publicKey: string) => {
	const balance = await connection.getBalance(new PublicKey(publicKey))
	return balance / LAMPORTS_PER_SOL
}

export const deposit = async ({
	fromPublicKey,
	fromPrivateKey,
	toPublicKey,
	amount
}: {
	fromPublicKey: string
	fromPrivateKey: string
	toPublicKey: string
	amount: number
}) => {
	const transaction = new Transaction()

	transaction.add(
		SystemProgram.transfer({
			fromPubkey: new PublicKey(fromPublicKey),
			toPubkey: new PublicKey(toPublicKey),
			lamports: amount * LAMPORTS_PER_SOL
		})
	)

	const payerAccount = Keypair.fromSecretKey(base58.decode(fromPrivateKey))

	const signature = await sendAndConfirmTransaction(connection, transaction, [
		payerAccount
	])

	return signature
}

export const withdraw = async ({
	fromPublicKey,
	fromPrivateKey,
	toPublicKey,
	amount
}: {
	fromPublicKey: string
	fromPrivateKey: string
	toPublicKey: string
	amount: number
}) => {
	const transaction = new Transaction()

	transaction.add(
		SystemProgram.transfer({
			fromPubkey: new PublicKey(toPublicKey),
			toPubkey: new PublicKey(fromPublicKey),
			lamports: amount * LAMPORTS_PER_SOL
		})
	)

	const payerAccount = Keypair.fromSecretKey(base58.decode(fromPrivateKey))

	const signature = await sendAndConfirmTransaction(connection, transaction, [
		payerAccount
	])

	return signature
}
