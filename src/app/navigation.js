'use client';

import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
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
    return otherPage;
}
export default function Navigation(){
    const menuButtonText = `${getLinkStyle("/Games")} inline-flex items-center rounded-md`;
    return(
        <>
        <nav className="bg-white bg-zinc-900 py-2">
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 text-xl">
                <Link href="/" className="self-center text-2xl dark:text-white pr-8" style={{textDecoration: 'none'}}>Nathan Davis</Link>
                <div className="hidden md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0" style={{listStyleType: 'none'}}>
                        <li className="max-w-medium">
                            <Link href="/" title="About Me" className={getLinkStyle("/")} style={{textDecoration: 'none'}}>Home</Link>
                        </li>
                        <li className="max-w-medium">
                            <Link href="/Resume" title="My Resume/CV" className={getLinkStyle("/Resume")} style={{textDecoration: 'none'}}>Resume/CV</Link>
                        </li>
                        <li className="max-w-medium">
                            <Link href="/Projects" title="A list of all my projects" className={getLinkStyle("/Projects")} style={{textDecoration: 'none'}}>Projects</Link>
                        </li>
                        <li className="max-w-medium">
                            <Menu>
                                <MenuButton className={menuButtonText}>
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
        </nav>
        <hr />
        </>
    );
}