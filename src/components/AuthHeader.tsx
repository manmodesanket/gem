"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface AuthHeaderProps {
  className?: string;
}

export function AuthHeader({ className = "" }: AuthHeaderProps) {
  const { user, signOut } = useAuth();

  const getInitials = (
    email: string | undefined,
    username: string | undefined,
  ) => {
    if (username) return username.slice(0, 2).toUpperCase();
    if (email) return email.slice(0, 2).toUpperCase();
    return "U";
  };

  const displayName =
    user?.user_metadata?.username || user?.email?.split("@")[0] || "User";
  const email = user?.email || "";

  return (
    <div className={`flex justify-end items-center ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-7 w-7 cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-blue-500 text-white text-sm">
              {getInitials(user?.email, user?.user_metadata?.username)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
