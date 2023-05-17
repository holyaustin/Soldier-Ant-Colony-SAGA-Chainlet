import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {
    PlatON,
    Optimism,
    Moonbeam,
    Moonriver,
    Avalanche,
    Polygon,
    BSC,
    Ethereum,
    EthereumGoerli,
    BSCTestnet,
    KCCTestnet,
} from '@particle-network/common';
import { evmWallets } from '@particle-network/connect';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { WalletEntryPosition } from '@particle-network/auth';

//const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//root.render(
    const Particle = () => {
        return (
//ReactDOM.render(
    <React.StrictMode>
        <ModalProvider
            walletSort={['Particle Auth', 'Wallet']}
            particleAuthSort={[
                'email',
                'phone',
                'google',
                'apple',
                'twitter',
                'twitch',
                'facebook',
                'microsoft',
                'linkedin',
                'github',
                'discord',
            ]}
            //TODO: get particle config from https://dashboard.particle.network/
            options={{
                projectId: '6570c9e3-accc-4a87-b359-b44b74f71e24',
                clientKey: 'ckdsczq2lCsNct28jfkxQwHBPOMX1Xq4ClS3ESX9',
                appId: 'suWNeLI5vufl3BH44nSXVZucPVta08doSbUA4Xdy',
                chains: [
                    PlatON,
                    Optimism,
                    Moonbeam,
                    Moonriver,
                    Avalanche,
                    Polygon,
                    BSC,
                    Ethereum,
                    EthereumGoerli,
                    BSCTestnet,
                    KCCTestnet,
                ],
                particleWalletEntry: {
                    displayWalletEntry: true,
                    defaultWalletEntryPosition: WalletEntryPosition.BR,
                    supportChains: [Ethereum, EthereumGoerli],
                },
                wallets: [...evmWallets({ qrcode: false })],
            }}
            language="en"
            theme={'light'}
        >
            <App />
        </ModalProvider>
    </React.StrictMode>
    // document.getElementById("root"),
);
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
export default Particle;