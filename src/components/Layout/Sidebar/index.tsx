import { configSidebarlinks } from '@/config-components/links/sidebar'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col overflow-scroll pt-10">
        <SheetTitle className="hidden">menu</SheetTitle>
        {configSidebarlinks.map((link) => (
          // <Button
          //   key={link.href}
          //   asChild
          //   variant="link"
          //   size="lg"
          //   className="py-1 text-start hover:bg-primary hover:font-black hover:text-black"
          // >
          <Link
            key={link.href}
            href={link.href}
            className="rounded px-2 py-2 font-medium text-primary underline decoration-2 underline-offset-4 transition-transform duration-200 hover:translate-x-2 hover:bg-gray-300 hover:font-black hover:text-black"
          >
            <p className="">{link.label}</p>
          </Link>
          // </Button>
        ))}
      </SheetContent>
    </Sheet>
  )
}
