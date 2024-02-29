import { Loader2 } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

const Spinner = ({ children }: PropsWithChildren) => {
	return (
		<span className='flex items-center'>
			<Loader2 className='mr-2 h-4 w-4 animate-spin' />
			<p>{children}</p>
		</span>
	)
}

export default Spinner
