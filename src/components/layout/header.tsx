'use client';

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePersona } from "@/context/persona-context";
import { Building, Plane, Ship, Warehouse } from 'lucide-react';
import type { PersonaType } from "@/context/persona-context";


const personaIcons: Record<PersonaType, React.ElementType> = {
  Port: Ship,
  Airport: Plane,
  Factory: Warehouse,
  Vessel: Building,
};

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { persona } = usePersona();
  
  const Icon = personaIcons[persona.type];

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <Icon className="h-6 w-6 text-primary" />
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://picsum.photos/seed/user/40/40" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
