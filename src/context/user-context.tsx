import {
  SuiClient,
  SuiHTTPTransport,
  getFullnodeUrl,
} from "@mysten/sui/client";

import { blake2b } from "blakejs";

import { toHex } from "@mysten/sui/utils";
import { fetch as tauriHttpFetch } from "@tauri-apps/plugin-http";

import { User, Wallet, usePrivy } from "@privy-io/react-auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignRawHash } from "@privy-io/react-auth/extended-chains";
import { messageWithIntent } from "@mysten/sui/cryptography";

interface IUserContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  wallet: Wallet | null;
  suiClient: SuiClient | null;
}

const suiClient = new SuiClient({
  transport: new SuiHTTPTransport({
    url: getFullnodeUrl("testnet"),
    fetch: import.meta.env.VITE_PLATFORM === "tauri" ? tauriHttpFetch : fetch,
  }),
});

export const UserContext = createContext<IUserContextProps>({
  isLoading: false,
  isAuthenticated: false,
  user: null,
  wallet: null,
  suiClient,
});

export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = (props: PropsWithChildren) => {
  const {
    user,
    login,
    ready,
    authenticated: isAuthenticated,
    signMessage,
  } = usePrivy();

  const wallet = useMemo(
    () => (user?.wallet?.chainType === "sui" ? user.wallet : null),
    [user],
  );

  console.log({ mode: import.meta.env.VITE_PLATFORM });
  const { signRawHash } = useSignRawHash();
  useEffect(() => {
    const foo = async () => {
      if (!wallet || !ready) return;
      const res = await suiClient.getBalance({ owner: wallet.address });
      console.log({ res });

      if (Number(res.totalBalance) > 0) {
        const tx = new Transaction();

        const suiCoin = tx.splitCoins(tx.gas, [10000]);
        tx.transferObjects(
          [suiCoin],
          "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
        );
        tx.setSender(wallet.address);
        const txBytes = await tx.build({ client: suiClient });
        // create signature for transaction block
        const intentMessage = messageWithIntent("TransactionData", txBytes);
        const digest = blake2b(intentMessage, undefined, 32);
        const hashToSign = "0x" + toHex(digest);
        const { signature } = await signRawHash({
          hash: hashToSign as any,
          chainType: "sui",
          address: wallet.address,
        });
        console.log({ signature });
        // create public key from sui wallet address
        const publicKey = new Ed25519PublicKey(fromHex(suiWallet.address));

        // convert signature to serialized signature Ed25519
        const txSignature = toSerializedSignature({
          signature: signature as any,
          signatureScheme: "ED25519",
          publicKey: publicKey,
        });
        console.log({ txSignature });
      }
    };
    foo();
  }, [ready, wallet]);

  return (
    <UserContext.Provider
      value={{
        isLoading: !ready,
        isAuthenticated,
        user,
        wallet,
        suiClient,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
