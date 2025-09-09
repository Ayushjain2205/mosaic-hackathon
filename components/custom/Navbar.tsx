"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/custom/Mascot";
import { BookOpen, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Explore",
      href: "/explore",
      icon: <Sparkles className="h-4 w-4 mr-2" />,
    },
    {
      name: "My Courses",
      href: "/course",
      icon: <BookOpen className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="w-full border-b border-primary/10 bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Name - clicking this navigates to home */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden">
            <img
              src="/images/logo.svg"
              alt="Miss Nova Logo"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <span className="font-heading text-xl font-bold text-primary">
            Miss Nova
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center font-body text-sm transition-colors hover:text-primary ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Create Course Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="w-full">
            <Button className="w-full btn-playful font-body" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-primary/10"
          >
            <div className="container py-4 space-y-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center py-2 font-body transition-colors hover:text-primary ${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
              <Link href="/#create-course" className="w-full">
                <Button
                  className="w-full btn-playful font-body bg-primary text-white hover:bg-primary/90"
                  size="sm"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
