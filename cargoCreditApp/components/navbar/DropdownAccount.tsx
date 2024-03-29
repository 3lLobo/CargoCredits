/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { AiOutlineDashboard } from "react-icons/ai";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import Link from "next/link";
import Image from "next/image";
import { Hyperspace } from "../Chains";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface DropdownProps {
  account: string;
}

const DropdownAccount = (props: DropdownProps) => {
  const { ens } = useLookupAddress(props.account);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          // className="grid grid-flow-col grid-cols-4font-medium rounded-lg text-sm px-3 py-1.5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 "
          className="container w-52 h-11 text-white bg-ccgreen2 hover:bg-ccgreen3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-ccgreen2 dark:focus:ring-ccgreen3 line-clamp-1 grid grid-flow-col gap-2 grid-cols-4 "
        >
          <div className="relative w-ful col-span-1 flex justify-center items-center align-middle h-full -my-1 bg-cyan-200 hover:bg-cyan-100 rounded-full">
            <Image
              // className='absolute scale-300'
              src="/filecoin_cool.png"
              alt="Filecoin Logo"
              width={400}
              height={400}
            />
          </div>
          <span className=" flex ml-2 h-8 truncate col-span-3">
            {ens ?? shortenAddress(props.account)}
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md 
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-white 
        shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  // TODO: convert address type.
                  href={Hyperspace.getExplorerAddressLink(props.account)}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <ArrowTopRightOnSquareIcon
                    className="mr-3 h-5 w-5 text-gray-400 
                    dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                    aria-hidden="true"
                  />
                  See on Filecoin-scan
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/googleconnect">
                  <div
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300",
                      "group flex items-center px-4 py-2 text-sm"
                    )}
                  >
                    <AiOutlineDashboard
                      className="mr-3 h-5 w-5 text-gray-400 
                    dark:text-gray-300 group-hover:text-gray-500 dark:group-hover:text-gray-100"
                      aria-hidden="true"
                    />
                    Profile Page
                  </div>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownAccount;
