import { Navbar, Footer } from "../components";
import { SwapWidget } from '@uniswap/widgets';

// We recommend you pass your own JSON-RPC endpoints.
// This are public / free endpoints. During production, private endpoints shall be used.
const jsonRpcUrlMap = { 
  1: ['https://1rpc.io/eth'], 
  56: ['https://1rpc.io/bnb'],
  10: ['https://1rpc.io/op'],
  // 97: ['https://bsc-testnet.publicnode.com'],
  42161: ['https://1rpc.io/arb'],
  42220: ['https://1rpc.io/celo'],
  137: ['https://1rpc.io/matic'],
}

const TOKEN_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

const SwapToken = () => (
  <div className="bg-gradient-to-b from-blue-700 to-black">
    <Navbar />
      <div className="w-full flex md:justify-center justify-between items-center p-4 bg-pink-100 p-24">
        <SwapWidget 
          jsonRpcUrlMap={jsonRpcUrlMap}
          width={560}
          tokenList={TOKEN_LIST}
          defaultInputTokenAddress="NATIVE"
          defaultInputAmount="1"
          //defaultOutputTokenAddress={UNI}
        />
    </div>
    
    <Footer />
  </div>
);

export default SwapToken;

