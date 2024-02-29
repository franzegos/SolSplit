import { HomeIcon } from 'lucide-react'
import React from 'react'
import GameWallet from '../gameWallet'
import { WalletConnect } from '../walletModal'
import * as S from './style'

const Sidebar = () => {
	return (
		<aside className={S.Aside}>
			<div className={S.Top}>
				<div className={S.LogoContainer}>
					<h2 className={S.Logo}>Project X</h2>
				</div>
				<WalletConnect />
				<ul>
					<li className={S.SideLink}>
						<HomeIcon size={24} />
						<span className={S.SideLinkText}>Home</span>
					</li>
				</ul>
			</div>

			<div className={S.Bottom}>
				<GameWallet />
			</div>
		</aside>
	)
}

export default Sidebar
