'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { revalidateAllTags, revalidateHomeDataTag, revalidateCountryDataTag, revalidateHomePath } from './actions'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, RefreshCw, Search, Filter } from 'lucide-react'

const revalidationItems = [
  { 
    name: 'Home Data Tag', 
    type: 'tag',
    key: 'home-data',
    description: 'Revalidates the home page data cache',
    action: revalidateHomeDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Country Data Tag', 
    type: 'tag',
    key: 'country-data',
    description: 'Revalidates the country data cache',
    action: revalidateCountryDataTag,
    image: '/placeholder.svg?height=300&width=300&text=Country'
  },
  { 
    name: 'Home Path', 
    type: 'path',
    key: '/',
    description: 'Revalidates the entire home page',
    action: revalidateHomePath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
]

export default function RevalidationTable() {
  const [isRevalidatingAll, setIsRevalidatingAll] = useState(false)
  const [revalidationStatus, setRevalidationStatus] = useState<{ [key: string]: string }>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [dialogState, setDialogState] = useState<{ isOpen: boolean; item: (typeof revalidationItems)[0] | null }>({
    isOpen: false,
    item: null,
  })

  const handleRevalidateAll = async () => {
    setIsRevalidatingAll(true)
    try {
      const result = await revalidateAllTags()
      setRevalidationStatus({ 
        all: result.success ? 'Success' : 'Failed',
        ...Object.fromEntries(revalidationItems.map(item => [item.key, result.success ? 'Success' : 'Failed']))
      })
    } catch (error) {
      setRevalidationStatus({ all: 'Failed' })
    } finally {
      setIsRevalidatingAll(false)
    }
  }

  const handleRevalidateItem = async (item: (typeof revalidationItems)[0]) => {
    setRevalidationStatus(prev => ({ ...prev, [item.key]: 'Pending' }))
    try {
      const result = await item.action()
      setRevalidationStatus(prev => ({ ...prev, [item.key]: result.success ? 'Success' : 'Failed' }))
    } catch (error) {
      setRevalidationStatus(prev => ({ ...prev, [item.key]: 'Failed' }))
    }
    setDialogState({ isOpen: false, item: null })
  }

  const filteredItems = revalidationItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || item.type === filterType)
  )

  return (
    <Card className="overflow-hidden border-0 rounded-2xl  h-full shadow-2xl bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-4xl font-bold text-gray-800 tracking-tight">Tag and Path Revalidation</h2>
          <Button 
            onClick={handleRevalidateAll} 
            disabled={isRevalidatingAll}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRevalidatingAll ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Revalidating All...
              </>
            ) : (
              <>
                <RefreshCw className="mr-3 h-5 w-5" />
                Revalidate All
              </>
            )}
          </Button>
        </div>
        {revalidationStatus.all && (
          <div className={`mb-8 p-6 rounded-xl ${revalidationStatus.all === 'Success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            <p className="font-semibold text-lg">Revalidate All: {revalidationStatus.all}</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="relative flex-grow">
            <Input
              placeholder="Search revalidation items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 transition duration-300 ease-in-out"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px] rounded-full border-2 border-gray-200 focus:border-blue-500 transition duration-300 ease-in-out">
              <Filter className="mr-2 h-5 w-5 text-gray-400" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tag">Tag</SelectItem>
              <SelectItem value="path">Path</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold text-gray-700 py-4">Item</TableHead>
                <TableHead className="font-bold text-gray-700 py-4">Type</TableHead>
                <TableHead className="hidden md:table-cell font-bold text-gray-700 py-4">Description</TableHead>
                <TableHead className="font-bold text-gray-700 py-4">Status</TableHead>
                <TableHead className="text-right font-bold text-gray-700 py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.key} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                  <TableCell className="font-medium py-4">
                    <div className="flex items-center space-x-4">
                      <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-lg object-cover" />
                      <span className="text-lg">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${item.type === 'tag' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'} px-3 py-1 rounded-full text-sm font-medium`}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  </TableCell>
                  <TableCell>
                    {revalidationStatus[item.key] ? (
                      <Badge 
                        className={`
                          ${revalidationStatus[item.key] === 'Success' ? 'bg-green-100 text-green-800' : 
                            revalidationStatus[item.key] === 'Failed' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}
                          px-3 py-1 rounded-full text-sm font-medium
                        `}
                      >
                        {revalidationStatus[item.key]}
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">Not revalidated</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      className="bg-white hover:bg-gray-100 text-gray-800 border-gray-300 shadow-sm hover:shadow transition duration-300 ease-in-out rounded-full px-6"
                      onClick={() => setDialogState({ isOpen: true, item })}
                    >
                      Revalidate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog open={dialogState.isOpen} onOpenChange={(isOpen) => setDialogState(prev => ({ ...prev, isOpen }))}>
        <DialogContent className="sm:max-w-[600px] bg-white p-6 w-11/12 max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">Confirm Revalidation</DialogTitle>
            <DialogDescription className="text-gray-600 text-lg">
              Are you sure you want to revalidate the following item?
            </DialogDescription>
          </DialogHeader>
          {dialogState.item && (
            <div className="grid gap-6 py-6">
              <div className="flex items-center space-x-6">
                <Image src={dialogState.item.image} alt={dialogState.item.name} width={200} height={200} className="rounded-xl object-cover" />
                <div>
                  <h3 className="font-semibold text-2xl text-gray-900 mb-2">{dialogState.item.name}</h3>
                  <p className="text-lg text-gray-500">Type: {dialogState.item.type}</p>
                </div>
              </div>
              <p className="text-lg text-gray-600">{dialogState.item.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={() => dialogState.item && handleRevalidateItem(dialogState.item)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
            >
              Confirm Revalidation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

