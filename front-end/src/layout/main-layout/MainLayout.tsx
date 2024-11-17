'use client'

import {useEffect, useRef, useState} from "react"
import {Menu, Sun, Moon, Coffee} from 'lucide-react'
import {ListItemProps} from "@/layout/main-layout/MainLayout.interfaces"
import {components} from "@/layout/navigation/Navigation.constants"
import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {toast} from "@/hooks/use-toast.ts";
import {Link} from "react-router-dom";
import RouterUrlHelper from "@/core/utils/RouterUtils"

function ListItem({className = "", title, children, href}: ListItemProps) {
    return (
        <li>
            <a
                href={href}
                className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 ${className}`}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="text-sm leading-snug text-gray-600">{children}</p>
            </a>
        </li>
    )
}

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [clicked, setClicked] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark")
        setIsDarkTheme(isDark)

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setActiveMenu(null)
                setClicked(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleTheme = () => {
        setIsDarkTheme((prev) => !prev)

        if (isDarkTheme) {
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
            document.documentElement.style.colorScheme = "light"
        } else {
            document.documentElement.classList.remove("light")
            document.documentElement.classList.add("dark")
            document.documentElement.style.colorScheme = "dark"
        }
    }

    const handleMouseEnter = (menuName: string) => {
        if (!clicked) {
            setActiveMenu(menuName)
        }
    }

    const handleMouseLeave = () => {
        if (!clicked) {
            setActiveMenu(null)
        }
    }

    const handleMenuClick = (menuName: string) => {
        if (activeMenu === menuName && clicked) {
            setActiveMenu(null)
            setClicked(false)
        } else {
            setActiveMenu(menuName)
            setClicked(true)
        }
    }

    const handleDonation = () => {
        // Here you would typically integrate with a payment provider
        // For this example, we'll just show a toast notification
        toast({
            title: "Thank you!",
            description: "Your donation is appreciated. Enjoy your virtual coffee!",
        })
    }

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
            <div className="flex h-14 items-center px-4 justify-between">
                <div className="mr-4 hidden md:flex">
                    <a
                        className="mr-4 flex items-center space-x-2 lg:mr-6"
                        href="/"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            className="h-6 w-6"
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <line
                                x1="208"
                                y1="128"
                                x2="128"
                                y2="208"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                            />
                            <line
                                x1="192"
                                y1="40"
                                x2="40"
                                y2="192"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="32"
                            />
                        </svg>
                        <span className="hidden font-bold lg:inline-block">
              shadcn/ui
            </span>
                    </a>
                    <nav className="relative flex items-center gap-4 text-sm xl:gap-6">
                        <ul className="flex space-x-4">
                            <li
                                className="relative"
                                onMouseEnter={() =>
                                    handleMouseEnter("gettingStarted")
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    onClick={() =>
                                        handleMenuClick("gettingStarted")
                                    }
                                >
                                    Getting started
                                </button>
                                {activeMenu === "gettingStarted" && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute left-0 mt-2 w-max bg-white shadow-lg"
                                    >
                                        <ul className="grid gap-3 p-6 md:w-96 lg:grid-cols-2">
                                            <li className="row-span-3">
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-gray-100 to-gray-200 p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="h-6 w-6 mb-4">
                                                        <img
                                                            src="/logo.svg"
                                                            alt="Logo"
                                                        />
                                                    </div>
                                                    <div className="mb-2 text-lg font-medium">
                                                        Your Project Name
                                                    </div>
                                                    <p className="text-sm leading-tight text-gray-600">
                                                        Beautifully designed
                                                        components that you can
                                                        copy and paste into your
                                                        apps. Accessible.
                                                        Customizable. Open
                                                        Source.
                                                    </p>
                                                </a>
                                            </li>
                                            <ListItem
                                                href="/docs"
                                                title="Introduction"
                                            >
                                                Re-usable components built using
                                                Radix UI and Tailwind CSS.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/installation"
                                                title="Installation"
                                            >
                                                How to install dependencies and
                                                structure your app.
                                            </ListItem>
                                            <ListItem
                                                href="/docs/primitives/typography"
                                                title="Typography"
                                            >
                                                Styles for headings, paragraphs,
                                                lists...etc
                                            </ListItem>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li
                                className="relative"
                                onMouseEnter={() =>
                                    handleMouseEnter("components")
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <button
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                    onClick={() => handleMenuClick("components")}
                                >
                                    Components
                                </button>
                                {activeMenu === "components" && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute left-0 mt-2 w-max bg-white shadow-lg"
                                    >
                                        <ul className="grid gap-3 p-4 md:w-96 md:grid-cols-2 lg:w-[600px]">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.href}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li className="relative flex items-center">
                                <Link to={RouterUrlHelper.urlMap.projectGallery} className="transition-colors hover:text-foreground/80 text-foreground/60" >
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <MobileNav/>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center gap-2 justify-end">
                    <div className="md:flex-none">
                        <Button
                            variant="outline"
                            className="justify-start text-sm font-normal"
                            onClick={handleDonation}
                        >
                            <Coffee className="h-4 w-4" />
                        </Button>
                    </div>
                    <nav className="flex items-center gap-0.5">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="rounded-md transition-colors"
                        >
                            {isDarkTheme ? (
                                <Sun className="h-5 w-5"/>
                            ) : (
                                <Moon className="h-5 w-5"/>
                            )}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

function MobileNav() {
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="getting-started">
                <AccordionTrigger>Getting Started</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-2">
                        <a href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                            Introduction
                        </a>
                        <a href="/docs/installation" className="text-sm text-muted-foreground hover:text-primary">
                            Installation
                        </a>
                        <a href="/docs/primitives/typography"
                           className="text-sm text-muted-foreground hover:text-primary">
                            Typography
                        </a>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="components">
                <AccordionTrigger>Components</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-2">
                        {components.map((component) => (
                            <a
                                key={component.title}
                                href={component.href}
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                {component.title}
                            </a>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="documentation">
                <AccordionTrigger>
                    <a href="/docs" className="flex w-full">Documentation</a>
                </AccordionTrigger>
            </AccordionItem>
        </Accordion>
    )
}