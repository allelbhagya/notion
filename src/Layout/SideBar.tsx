import React, { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PlusIcon,
  SearchIcon,
  PlusCircleIcon,
  ClipboardCopyIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { TrashIcon, DownloadIcon, HomeIcon, StarIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

import { Page } from "../types";

interface SideBarProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

const randomCompanyName = "Bhagyalaxmi's Notion";

export default function SideBar({
  isSidebarOpen = true,
  toggleSideBar,
}: SideBarProps): JSX.Element {
  const [isFavSectionOpen, setIsFavSectionOpen] = useState(true);
  const [isPrivSectionOpen, setIsPrivSectionOpen] = useState(true);

  const toggleFavSection = () => {
    setIsFavSectionOpen(!isFavSectionOpen);
  };

  const togglePrivSection = () => {
    setIsPrivSectionOpen(!isPrivSectionOpen);
  };

  return (
    <div
      className={`flex  text-sm flex-shrink-0 flex-col h-full bg-gray-100 transition-all duration-300 shadow-sm ${
        isSidebarOpen ? "w-80" : "hidden"
      }`}
    >
      <div
        onClick={toggleSideBar}
        className={`flex p-3  group justify-between hover:bg-gray-200  cursor-pointer`}
      >
        <div className="flex space-x-2 items-center">
          <EmojiHappyIcon className="w-4 h-4 text-gray-500" />
          <span className=""><b>{randomCompanyName}</b></span>
        </div>
        <div>
          <ChevronDoubleLeftIcon className="w-4 h-4 hidden  group-hover:block" />
        </div>
      </div>

      <div className="flex flex-col text-gray-600">
        <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
          <SearchIcon className="w-4 h-4 text-gray-500" />
          <span>Search</span>
        </div>
        <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
          <ClipboardCopyIcon className="w-4 h-4 text-gray-500" />
          <span>Updates</span>
        </div>
        <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
          <CogIcon className="w-4 h-4 text-gray-500" />
          <span>Settings & members</span>
        </div>
        <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
          <PlusCircleIcon className="w-4 h-4 text-gray-500" />
          <span>New page</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Favorites Section */}
        <div
          onClick={toggleFavSection}
          className={`p-3 flex items-center justify-between group text-gray-700 cursor-pointer`}
        >
          <span className="text-xs text-gray-500">Favourites</span>
          <PlusIcon className={`w-4 h-4 ${isFavSectionOpen ? 'block' : 'hidden'} group-hover:block cursor-pointer`} />
        </div>
        {isFavSectionOpen && (
        <FavSection title="Favourites" />
        )}

        <div className="my-4" /> {/* This adds space between sections */}

        {/* Private Section */}
        <div
          onClick={togglePrivSection}
          className={`p-3 flex items-center justify-between group text-gray-700 cursor-pointer`}
        >
          <span className="text-xs text-gray-500">Private</span>
          <PlusIcon className={`w-4 h-4 ${isPrivSectionOpen ? 'block' : 'hidden'} group-hover:block cursor-pointer`} />
        </div>
        {isPrivSectionOpen && (
        <PrivSection title="Private" />
        )}

        <div className="my-4" /> {/* This adds space between sections */}

        {/* End Section */}
        <div className="flex flex-col text-gray-600">
          <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
            <HomeIcon className="w-4 h-4 text-gray-500" />
            <span>Create a teamspace</span>
          </div>
          <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
            <StarIcon className="w-4 h-4 text-gray-500" />
            <span>Templates</span>
          </div>
          <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
            <DownloadIcon className="w-4 h-4 text-gray-500" />
            <span>Import</span>
          </div>
          <div className="px-3 flex items-center py-1 space-x-2 hover:bg-gray-200 hover:cursor-pointer">
            <TrashIcon className="w-4 h-4 text-gray-500" />
            <span>Trash</span>
          </div>
        </div>
      </div>

      <div className="my-4" /> {/* This adds space between sections */}
    </div>
  );
}


const FavSection = ({ title }) => {
  const { pages } = useAppContext();
  return (
    <div className="flex-1  overflow-auto">
      {pages.slice(0, 5).map((page, index) => (
        <FavItem page={page} index={index} key={page._id} />
      ))}
    </div>
  );
};

interface PageItemProps {
  page: Page;
  index: number;
}

const FavItem = ({ page: { _id, name }, index }: PageItemProps) => {
  return (
    <NavLink
      to={`/${_id}`}
      activeClassName={"bg-gray-200"}
      style={{ textDecoration: "none" }}
      className={
        "px-3 group flex items-center text-gray-700 justify-between py-1 hover:bg-gray-200 hover:cursor-pointer"
      }
    >
      <div className="space-x-2 items-center flex">
        <ChevronRightIcon className="w-4 h-4" />
        <span className="capitalize">{name}</span>
      </div>
      <div className="hidden group-hover:flex items-center space-x-2">
        <DotsHorizontalIcon className="w-4 h-4" />
        <PlusIcon className="w-4 h-4" />
      </div>
    </NavLink>
  );
};

const PrivSection = ({ title }) => {
  const { pages } = useAppContext();
  return (
    <div className="flex-1  overflow-auto">

      {pages.slice(6,11).map((page, index) => (
        <PrivItem page={page} index={index} key={page._id} />
      ))}
    </div>
  );
};

const PrivItem = ({ page: { _id, name }, index }: PageItemProps) => {
  return (
    <NavLink
      to={`/${_id}`}
      activeClassName={"bg-gray-200"}
      style={{ textDecoration: "none" }}
      className={
        "px-3 group flex items-center text-gray-700 justify-between py-1 hover:bg-gray-200 hover:cursor-pointer"
      }
    >
      <div className="space-x-2 items-center flex">
        <ChevronRightIcon className="w-4 h-4" />
        <span className="capitalize">{name}</span>
      </div>
      <div className="hidden group-hover:flex items-center space-x-2">
        <DotsHorizontalIcon className="w-4 h-4" />
        <PlusIcon className="w-4 h-4" />
      </div>
    </NavLink>
  );
};

// ... (PrivSection and PrivItem remain unchanged)
