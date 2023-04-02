import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const allMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MonthDrop({ month, setMonth }) {
  return (
    <Menu as="div" className="relative inline-block text-center ">
      <div className="flex flex-col">
        <h2 className=" font-semibold mb-3">YOUR STATS FOR </h2>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4  text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ccDarkText-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {month}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {allMonth.map((month) => {
              return (
                <Menu.Item key={month + "name"}>
                  {({ active }) => (
                    <button
                      value={month}
                      onClick={(e) => {
                        setMonth(e.target.value);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {month}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
