import { Dialog } from "@headlessui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import Modal from "../components/modal";
import { fetcher } from "../utils/fetcher";

const CurrencyRow = ({ wallet }: { wallet: WiiQare.Wallet }) => {
  return (
    <tr className="hover:bg-gray-200 h-16">
      <td className="text-center p-2">
        {wallet.currency.icon && (
          <Image
            src={wallet.currency.icon}
            alt={wallet.currency.code}
            width={32}
            height={32}
          />
        )}
      </td>
      <td>
        <p>{wallet.description}</p>
        <p className="text-gray-500">{wallet.currency.code}</p>
      </td>
      <td className="text-right">
        {wallet.balance} {wallet.currency.code}
      </td>
      <td></td>
    </tr>
  );
};

function AddWalletModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("BTC");
  const [description, setDescription] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createWallet: React.MouseEventHandler = async (e) => {
    try {
      const url = "/api/wallets";
      await axios.post(url, {
        currency,
        description,
      });
      closeModal();
    } catch (error) {
      console.log("Failed to create wallet!");
    }
  };

  return (
    <Modal
      buttonText="Create Wallet"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Create a wallet
      </Dialog.Title>
      <div className="mt-2">
        <form>
          <div className="flex flex-col my-2">
            <label htmlFor="currency" className="my-1">
              Select a currency
            </label>
            <select
              name="currency"
              className="border rounded h-10 px-4 py-2"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="USD">United States Dollars (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="description" className="my-1">
              Wallet name
            </label>
            <input
              type="text"
              name="description"
              className="border rounded h-10 px-4 py-2"
              placeholder="eg. USD wallet"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={createWallet}
        >
          Create
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

const Wallets = () => {
  const { data: wallets, error } = useSWR<WiiQare.Wallet[]>(
    "/api/wallets",
    fetcher
  );
  if (error) return <p>Error feching wallets!</p>;
  return (
    <>
      <Head>
        <title>WiiQare | Wallets</title>
      </Head>
      <Dashboard title="Wallets">
        {wallets && (
          <div className="rounded-lg border">
            <table className="w-full">
              <tbody>
                <tr>
                  <td
                    className="pl-4 py-4 bg-gray-200 font-semibold"
                    colSpan={4}
                  >
                    Fiat
                  </td>
                </tr>
                {wallets
                  .filter((wallet) => wallet.currency.fiat)
                  .map((wallet) => (
                    <CurrencyRow key={wallet.id} wallet={wallet} />
                  ))}
                <tr>
                  <td
                    className="pl-4 py-4 bg-gray-200 font-semibold"
                    colSpan={4}
                  >
                    Cryptocurrency
                  </td>
                </tr>
                {wallets
                  .filter((wallet) => !wallet.currency.fiat)
                  .map((wallet) => (
                    <CurrencyRow key={wallet.id} wallet={wallet} />
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <AddWalletModal />
      </Dashboard>
    </>
  );
};

export default Wallets;
