import { cn } from '@/lib/utils'

export const Aside = cn(
	'min-h-dvh flex flex-col justify-between w-72 bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-700'
)

export const Top = cn('flex flex-col justify-between')

export const LogoContainer = cn('p-3 h-16 flex items-center border-b-2')

export const Logo = cn('text-2xl font-semibold text-gray-800 dark:text-white')

export const SideLink = cn(
	'p-3 flex items-center py-6 gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
)

export const SideLinkText = cn('text-md font-medium')

export const Bottom = cn('p-3 flex flex-col gap-2')
