"use client"

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react"

import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import cn from "classnames"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const router = useRouter()
  const currentPath = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    const isActive = currentPath === href
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
          isActive
            ? "bg-primary text-white"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        )}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="https://mobilfit.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <Image
                src="https://images.vexels.com/media/users/3/242802/isolated/preview/cef1e58e886cdcb9a641cfe01455e13b-small-car-profile-semi-flat.png"
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 hidden dark:block"
              />
              <Image
                src="https://images.vexels.com/media/users/3/242802/isolated/preview/cef1e58e886cdcb9a641cfe01455e13b-small-car-profile-semi-flat.png"
                alt="Acme"
                width={32}
                height={32}
                className="flex-shrink-0 block dark:hidden"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                Autorepair
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Perbaikkan
                </div>
                <div className="space-y-1">
                  <NavItem href="/register/customer" icon={Home}>
                    Registrasi Baru
                  </NavItem>
                  <NavItem href="/estimations" icon={BarChart2}>
                    Estimasi
                  </NavItem>
                  <NavItem href="/workorders" icon={Building2}>
                    Work Order
                  </NavItem>
                  <NavItem href="/invoices" icon={Folder}>
                    Invoice
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Suku Cadang
                </div>
                <div className="space-y-1">
                  <NavItem href="/inventory/new" icon={Wallet}>
                    Pengadaan
                  </NavItem>
                  <NavItem href="/inventory/search" icon={Receipt}>
                    Pilihan
                  </NavItem>
                  <NavItem href="/inventory/manage" icon={CreditCard}>
                    Aging Stock
                  </NavItem>
                </div>
              </div>
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Analisa
                </div>
                <div className="space-y-1">
                  <NavItem href="/analytics" icon={Users2}>
                    Dashboard
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Manajemen Role
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Shield}>
                    Permissions
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

