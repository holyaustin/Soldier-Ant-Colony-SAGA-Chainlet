import React, { useCallback, useEffect } from 'react';
import './App.css';
import EvmDemo from './connect-evm-demo';
import { useNavigate } from "react-router-dom";
import {
    Chain,
    ConnectButton,
    useAccount,
    useConnectKit,
    useParticleTheme,
    useSwitchChains,
    useParticleProvider,
    useLanguage,
} from '@particle-network/connect-react-ui';

import '@particle-network/connect-react-ui/dist/index.css';
import { LoginOptions } from '@particle-network/auth';

function App() {
    const navigate = useNavigate();
    const account = useAccount();
    const connectKit = useConnectKit();
    const { theme, setTheme } = useParticleTheme();
    const { language, changLanguage } = useLanguage();

    const provider = useParticleProvider();

    const { isSwtichChain, renderChains } = useSwitchChains();
{/**
    useEffect(() => {
        async function chainChanged(chain?: Chain) {
            console.log('DEMO-onChainChanged：', chain);
        }
        if (connectKit) {
            connectKit.on('chainChanged', chainChanged);
            return () => {
                connectKit.removeListener('chainChanged', chainChanged);
            };
        }
    }, [connectKit]);
     */}

    const LogRenderChains = useCallback(() => {
        console.log('isSwtichChain:', isSwtichChain);
        console.log('renderChains:', renderChains);
    }, [renderChains, isSwtichChain]);

    return (
        <div className="flex flex-row justify-center items-center bg-blue-500  px-20 mx-8 sm:mx-3 sm:py-2 sm:px-8 rounded-full cursor-pointer text-black font-semibold hover:bg-purple-600 hover:text-white">
            <ConnectButton/>
            
        </div>
    );
}

export default App;
