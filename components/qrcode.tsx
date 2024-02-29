import QRCodeStyling from 'qr-code-styling'
import React, { useEffect, useRef } from 'react'

const qrCode = new QRCodeStyling({
	width: 200,
	height: 200,
	// image: `${window.location.origin}/logo.png`,
	dotsOptions: {
		color: 'black',
		type: 'rounded'
	},
	cornersSquareOptions: {
		type: 'dot'
	},
	cornersDotOptions: {
		type: 'dot'
	},
	imageOptions: {
		crossOrigin: 'anonymous',
		margin: 20
	}
})

interface Props {
	data: string | undefined | null
}

const QRCode = ({ data }: Props) => {
	const ref = useRef<HTMLDivElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		qrCode.append(ref.current ?? undefined)
	}, [ref.current])

	useEffect(() => {
		if (!data) return
		qrCode.update({
			data
		})
	}, [data])

	return <div ref={ref} />
}

export default QRCode
