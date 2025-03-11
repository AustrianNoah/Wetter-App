"use client"

import type React from "react"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Stadtname eingeben..."
          className="pl-8 h-10 sm:h-11 text-sm sm:text-base"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading || !city.trim()}
        className="h-10 sm:h-11 text-sm sm:text-base whitespace-nowrap"
      >
        {isLoading ? 'Suche...' : 'Suchen'}
      </Button>
    </form>
  )
}
