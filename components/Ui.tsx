'use client';

import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { parseDocument } from '../api/api';

export default function Ui() {
  const [data, setData] = useState([]);
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ');
  };

  const getData = async () => {
    const response = await parseDocument();
    let parseData = JSON.parse(response.data);

    //Default Sort by filename
    const sortedArray = parseData.sort((a: any, b: any) => {
      // Split each string into timestamp and filename
      const [timestampA, filenameA] = a.split(';');
      const [timestampB, filenameB] = b.split(';');

      // If timestamps are equal, compare filenames
      return filenameA.localeCompare(filenameB, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
    setData(sortedArray);
    return;
  };

  const render = (row: any) => {
    //Split with ;
    let split = row.split(';');
    return (
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {split[0]}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {split[1]}
        </p>
      </div>
    );
  };

  const handleFilter = async (type: string) => {
    if (type == 'createdAt') {
      const sortedArrayByCreatedAt = data.sort((a: any, b: any) => {
        // Split each string into timestamp and filename
        const [timestampA, filenameA] = a.split(';');
        const [timestampB, filenameB] = b.split(';');

        // Compare timestamps first
        return timestampA.localeCompare(timestampB, undefined, {
          numeric: true,
        });
      });

      setData(sortedArrayByCreatedAt);
      forceUpdate();
      return;
    }

    if (type == 'filenameAsc') {
      const sortedArrayByFilenameAsc = data.sort((a: any, b: any) => {
        // Split each string into timestamp and filename
        const [timestampA, filenameA] = a.split(';');
        const [timestampB, filenameB] = b.split(';');

        // If timestamps are equal, compare filenames
        return filenameA.localeCompare(filenameB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
      sortedArrayByFilenameAsc.sort((a, b) => (a < b ? -1 : 1));
      setData(sortedArrayByFilenameAsc);
      forceUpdate();
      return;
    }

    if (type == 'filenameDesc') {
      const sortedArrayByFilenameDesc = data.sort((a: any, b: any) => {
        // Split each string into timestamp and filename
        const [timestampA, filenameA] = a.split(';');
        const [timestampB, filenameB] = b.split(';');

        // If timestamps are equal, compare filenames
        return filenameA.localeCompare(filenameB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
      sortedArrayByFilenameDesc.sort((a, b) => (a > b ? -1 : 1));
      setData(sortedArrayByFilenameDesc);
      forceUpdate();
      return;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Menu as="div" className="relative  text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Options
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => handleFilter('createdAt')}
                  >
                    sort by created at
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => handleFilter('filenameAsc')}
                  >
                    sort by filename ascendent
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                    onClick={() => handleFilter('filenameDesc')}
                  >
                    sort by filename descendent
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="flex flex-wrap justify-center mt-10">
        {data.map((row: any, index: any) => (
          <div className="p-4 max-w-sm" key={index}>
            {render(row)}
          </div>
        ))}
      </div>
    </>
  );
}
