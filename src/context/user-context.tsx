import {
  SuiClient,
  SuiHTTPTransport,
  getFullnodeUrl,
} from "@mysten/sui/client";
import { verifyTransactionSignature } from "@mysten/sui/verify";
import { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { blake2b } from "@noble/hashes/blake2b";

import { fromHex, toHex } from "@mysten/sui/utils";
import { fetch as tauriHttpFetch } from "@tauri-apps/plugin-http";

import {
  User,
  Wallet,
  getAccessToken,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignRawHash } from "@privy-io/react-auth/extended-chains";
import {
  messageWithIntent,
  toSerializedSignature,
} from "@mysten/sui/cryptography";

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
    ready,
    authenticated: isAuthenticated,
    getAccessToken,
  } = usePrivy();
  const { ready: readyForWallets } = useWallets();

  const wallet = useMemo(
    () => (user?.wallet?.chainType === "sui" ? user.wallet : null),
    [user],
  );

  const { signRawHash } = useSignRawHash();
  useEffect(() => {
    const foo = async () => {
      try {
        if (!wallet || !ready || !readyForWallets) return;

        const res = await suiClient.getBalance({ owner: wallet.address });
        console.log({ isAuthenticated });
        console.log({ user });
        console.log({ res });
        console.log({ wallet });
        console.log({ ready });

        if (Number(res.totalBalance) > 0) {
          const tx = new Transaction();

          // const suiCoin = tx.splitCoins(tx.gas, [10000]);
          // tx.transferObjects(
          //   [suiCoin],
          //   "0x0b3fc768f8bb3c772321e3e7781cac4a45585b4bc64043686beb634d65341798",
          // );
          tx.setSender(wallet.address);
          const txBytes = await tx.build({ client: suiClient });
          // create signature for transaction block
          const intentMessage = messageWithIntent("TransactionData", txBytes);
          const digest = blake2b(intentMessage, { dkLen: 32 });
          const hashToSign = "0x" + toHex(digest);
          console.log({ hashToSign });
          const { signature: sigHex } = await signRawHash({
            hash: hashToSign as any,
            chainType: "sui",
            address: wallet.address,
          });
          const rawSig = fromHex(sigHex.slice(2)); // remove "0x"
          console.log({ rawSig });

          // acquire public key
          const accessToken = await getAccessToken();

          console.log({ accessToken });
          const walletInfo = await fetch(
            `https://auth.privy.io/api/v1/wallets/${wallet.id}`,
            {
              method: "GET",
              headers: {
                "privy-app-id": import.meta.env.VITE_PRIVY_APP_ID,
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          console.log({ walletInfo });

          const json = await walletInfo.json();
          const publicKey = new Ed25519PublicKey(
            fromHex(json.public_key.slice(2)),
          );

          // convert signature to serialized signature Ed25519
          const txSignature = toSerializedSignature({
            signature: rawSig, // Uint8Array(64)
            signatureScheme: "ED25519",
            publicKey,
          });
          console.log({ txSignature });
          const signer = await verifyTransactionSignature(
            txBytes,
            txSignature,
            { address: wallet.address },
          );
          console.log(signer.toSuiAddress() === wallet.address);

          // execute transaction block
          // const result = await suiClient.executeTransactionBlock({
          //   transactionBlock: txBytes,
          //   signature: txSignature,
          // });
          // console.log("result", result);
          // await suiClient.waitForTransaction({ digest: result.digest });
        }
      } catch (error) {
        console.error(error);
      }
    };
    foo();
  }, [ready, wallet, readyForWallets]);

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
