import { configSidebarlinks } from '@/config-components/links/sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
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

      <SheetContent side="left" className="flex flex-col pt-10">
        {configSidebarlinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant="outline"
            size="lg"
            className="py-8 hover:bg-primary hover:font-black hover:text-black"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </SheetContent>
    </Sheet>
  )
}
