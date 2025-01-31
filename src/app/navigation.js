'use client';

import {Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel, CloseButton} from '@headlessui/react';
import {ChevronDownIcon, Bars3Icon} from '@heroicons/react/24/solid';
import Link from 'next/link'
import {usePathname} from 'next/navigation';

var currentPage = "block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-red-500";
var otherPage =   "block py-2 px-3 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0" 
    otherPage += " md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

function getLinkStyle(linkPath){
    const pathname = usePathname();
    if(pathname === linkPath){
        return currentPage;
    }
    else if(pathname.includes("/Games") && linkPath === "/Games"){
        return currentPage;
    }
    else if(pathname.includes("/Projects") && linkPath === "/Projects"){
        return currentPage;
    }
    return otherPage;
}

export default function Navigation(){
    const gamesNavButton = `${getLinkStyle("/Games")} inline-flex items-center rounded-md`;
    const projectsNavButton = `${getLinkStyle("/Projects")} inline-flex items-center rounded-md`;
    return(
    <>
        <Disclosure as="nav" className="bg-white bg-zinc-900 py-2">
            <div className="flex flex-wrap p-4 pt-3 md:pt-4 text-xl mx-auto md:max-w-screen-xl">
                <Link href="/" className="md:flex-initial self-center text-3xl bg-gradient-to-r from-red-500 via-red-300 to-white text-transparent bg-clip-text w-3/5 md:w-auto pt-1 md:pt-0" style={{textDecoration: 'none'}}>Nathan Davis</Link>
                <div className="w-2/5 md:hidden place-items-end md:w-auto">
                    <div>
                        <DisclosureButton className="md:hidden pt-2 group rounded-md text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6" />
                        </DisclosureButton>
                    </div>
                </div>
                <div className="pl-8 hidden md:block md:pt-1">
                    <ul className="font-medium flex md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0" style={{listStyleType: 'none'}}>
                        <li className="max-w-medium">
                            <Link href="/" title="About Me" className={getLinkStyle("/")} style={{textDecoration: 'none'}}>Home</Link>
                        </li>
                        <li className="max-w-medium">
                            <Link href="/Resume" title="My Resume/CV" className={getLinkStyle("/Resume")} style={{textDecoration: 'none'}}>Resume/CV</Link>
                        </li>
                        <li className="max-w-medium">
                            <Menu>
                                <MenuButton className={projectsNavButton}>
                                    Projects
                                    <ChevronDownIcon className="size-5" />
                                </MenuButton>
                                <MenuItems anchor="bottom" className="px-6 origin-top-middle rounded-xl bg-zinc-800 py-5">
                                    <MenuItem className="mb-2">
                                        <Link href="/Projects/Project-List" className={getLinkStyle("/Projects/Project-List")} style={{textDecoration: 'none'}}>Project List</Link>
                                    </MenuItem>
                                    <MenuItem className="mb-2">
                                        <Link href="/Projects/NotVim-Editor" className={getLinkStyle("/Projects/NotVim-Editor")} style={{textDecoration: 'none'}}>NotVim-Editor</Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </li>
                        <li className="max-w-medium">
                            <Menu>
                                <MenuButton className={gamesNavButton}>
                                    Games
                                    <ChevronDownIcon className="size-5" />
                                </MenuButton>
                                <MenuItems anchor="bottom" className="px-6 origin-top-middle rounded-xl bg-zinc-800 py-5">
                                    <MenuItem className="mb-2">
                                        <Link href="/Games/Snake" className={getLinkStyle("/Games/Snake")} style={{textDecoration: 'none'}}>Snake</Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </li>
                        <li className="max-w-medium">
                            <Link href="mailto:nathandavis@nathandavis18.com" title="Email Me" className={otherPage} style={{textDecoration: 'none'}}>Email</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <ul>
                        <li className="max-w-medium">
                            <CloseButton as={Link} href="/" title="About Me" className={getLinkStyle("/")} style={{textDecoration: 'none'}}>Home</CloseButton>
                        </li>
                        <li className="max-w-medium">
                            <CloseButton as={Link} href="/Resume" title="My Resume/CV" className={getLinkStyle("/Resume")} style={{textDecoration: 'none'}}>Resume/CV</CloseButton>
                        </li>
                        <li className="max-w-medium">
                            <Menu>
                                <MenuButton className={projectsNavButton}>
                                    Projects
                                    <ChevronDownIcon className="size-5" />
                                </MenuButton>
                                <MenuItems anchor="bottom" className="px-6 origin-top-middle rounded-xl bg-zinc-800 py-5">
                                    <MenuItem className="mb-2">
                                        <CloseButton as={Link} href="/Projects/Project-List" className={getLinkStyle("/Projects/Project-List")} style={{textDecoration: 'none'}}>Project List</CloseButton>
                                    </MenuItem>
                                    <MenuItem className="mb-2">
                                        <CloseButton as={Link} href="/Projects/NotVim-Editor" className={getLinkStyle("/Projects/NotVim-Editor")} style={{textDecoration: 'none'}}>NotVim-Editor</CloseButton>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </li>
                        <li className="max-w-medium">
                            <Menu>
                                <MenuButton className={gamesNavButton}>
                                    Games
                                    <ChevronDownIcon className="size-5" />
                                </MenuButton>
                                <MenuItems anchor="bottom" className="px-6 origin-top-middle rounded-xl bg-zinc-800 py-5">
                                    <MenuItem className="mb-2">
                                        <CloseButton as={Link} href="/Games/Snake" className={getLinkStyle("/Games/Snake")} style={{textDecoration: 'none'}}>Snake</CloseButton>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </li>
                        <li className="max-w-medium">
                            <CloseButton as="a" href="mailto:nathandavis@nathandavis18.com" title="Email Me" className={otherPage} style={{textDecoration: 'none'}}>Email</CloseButton>
                        </li>
                    </ul>
                </div>
            </DisclosurePanel>
        </Disclosure>
        <hr />
    </>
    );
}