"use client";

import { Bell, BookOpen, ChevronDown, ClipboardList, FileBarChart2, MapPinIcon, PanelsTopLeft, ShoppingBag, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import MenuItem from "../generic/MenuItem";
import TextIconText from "../generic/TextIconText";
import TextIconWithDropdown from "../generic/TextIconWithDropdown";

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

const texticonData = {
  name: "Olivia Rhye",
  subtitle: "Store Manager",
  icon: <UserCircleIcon className="h-8 w-8" />,
  linkTo: "/stores/dashboard",
  nameStyle: {
    color: "black",
  },
  subtitleStyle: {
    color: "#0066cc",
  },
};

const dropdownData = {
  icon: <MapPinIcon className="icon" />,
  label: "Stores",
  items: [
    { label: "Store 1", onClick: () => console.log("Store 1 clicked") },
    { label: "Store 2", onClick: () => console.log("Store 2 clicked") },
    { label: "Store 3", onClick: () => console.log("Store 3 clicked") },
  ],
  paddingLeft: "5rem",
};

const navData = [
  {
    name: "Dashboard",
    linkTo: "/stores/dashboard",
    icon: <PanelsTopLeft />,
  },
  {
    name: "Orders",
    linkTo: "/stores/1/orders/list",
    icon: <ShoppingBag />,
  },
  {
    name: "Inventory",
    linkTo: "/stores/1/inventory",
    icon: <ClipboardList />,
  },
  {
    name: "Product Catalog",
    linkTo: "/stores/1/products/catalog",
    icon: <BookOpen />,
  },
  {
    name: "Reports",
    linkTo: "/stores/1/settings",
    icon: <FileBarChart2 />,
  },
];

const StoreHeaderMenu: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="header-main">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
        >
          <div className="flex items-center">
            <span className="text-neutral-900 text-2xl font-normal font-[Manrope] leading-loose">
              Foodsupply.
            </span>
            <span className="text-green-600 text-2xl font-normal font-[Manrope] leading-loose">
              ai
            </span>
          </div>
        </Link>
        <TextIconWithDropdown
          icon={dropdownData.icon}
          subtitle="store"
          text="Select Store"
          options={{ label: dropdownData.label, items: dropdownData.items }}
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList className="nav-menu">
          {navData.map((item, index) => (
            <NavigationMenuItem
              key={index}
              className={`nav-menu-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <MenuItem
                text={item.name}
                href={item.linkTo}
                icon={item.icon}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center">
        <div className="header-settings">
          <Bell className="icon w-10 h-10 p-2 bg-white rounded-lg shadow border border-gray-300 justify-center items-center inline-flex gap[20px]" />
        </div>
        <TextIconText
          text={texticonData.name}
          subtitle={texticonData.subtitle}
          icon={texticonData.icon}
          href={texticonData.linkTo}
          nameStyle={texticonData.nameStyle}
          subtitleStyle={texticonData.subtitleStyle}
        />
        <ChevronDown className="pr-2" />
      </div>
    </div>
  );
};

export default StoreHeaderMenu;
