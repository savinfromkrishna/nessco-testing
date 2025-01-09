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
import { revalidateAllTags, revalidateHomeDataTag, revalidateAboutDataTag, revalidateVisionDataTag, revalidateThepinkcityDataTag, revalidateSustainabilityDataTag, revalidateProjectsDataTag, revalidateOurstrengthDataTag, revalidateOurcompanyDataTag, revalidateApplicationDataTag, revalidateBlogDataTag, revalidateClienteleDataTag, revalidateContactDataTag, revalidateFaqDataTag, revalidateKnowledgecenterDataTag, revalidateMediaroomDataTag, revalidateProductsDataTag, revalidateResourcesDataTag, revalidateSupportDataTag, revalidateCountryDataTag, revalidateHomePath, revalidateAboutPath, revalidateVisionPath, revalidateThepinkcityPath, revalidateProjectsPath, revalidateSustainabilityPath, revalidateOurstrengthPath, revalidateOurcompanyPath, revalidateApplicationPath, revalidateBlogPath, revalidateClientelePath, revalidateContactPath, revalidateFaqPath, revalidateKnowledgecenterPath, revalidateMediaroomPath, revalidateProductsPath, revalidateResourcesPath, revalidateSupportPath } from './actions'
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
    name: 'About Data Tag', 
    type: 'tag',
    key: 'about-data',
    description: 'Revalidates the home page data cache',
    action: revalidateAboutDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Vision Data Tag', 
    type: 'tag',
    key: 'vision-data',
    description: 'Revalidates the home page data cache',
    action: revalidateVisionDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Thepinkcity Data Tag', 
    type: 'tag',
    key: 'thepinkcity-data',
    description: 'Revalidates the home page data cache',
    action: revalidateThepinkcityDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Sustainability Data Tag', 
    type: 'tag',
    key: 'sustainability-data',
    description: 'Revalidates the home page data cache',
    action: revalidateSustainabilityDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Projects Data Tag', 
    type: 'tag',
    key: 'projects-data',
    description: 'Revalidates the home page data cache',
    action: revalidateProjectsDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Ourcompany Data Tag', 
    type: 'tag',
    key: 'ourcompany-data',
    description: 'Revalidates the home page data cache',
    action: revalidateOurcompanyDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Ourstrength Data Tag', 
    type: 'tag',
    key: 'ourstrength-data',
    description: 'Revalidates the home page data cache',
    action: revalidateOurstrengthDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Application Data Tag', 
    type: 'tag',
    key: 'application-data',
    description: 'Revalidates the home page data cache',
    action: revalidateApplicationDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Blog Data Tag', 
    type: 'tag',
    key: 'blog-data',
    description: 'Revalidates the home page data cache',
    action: revalidateBlogDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Clientele Data Tag', 
    type: 'tag',
    key: 'clientele-data',
    description: 'Revalidates the home page data cache',
    action: revalidateClienteleDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Contact Data Tag', 
    type: 'tag',
    key: 'contact-data',
    description: 'Revalidates the home page data cache',
    action: revalidateContactDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Faq Data Tag', 
    type: 'tag',
    key: 'faq-data',
    description: 'Revalidates the home page data cache',
    action: revalidateFaqDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Knowledgecenter Data Tag', 
    type: 'tag',
    key: 'knowledgecenter-data',
    description: 'Revalidates the home page data cache',
    action: revalidateKnowledgecenterDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Mediaroom Data Tag', 
    type: 'tag',
    key: 'mediaroom-data',
    description: 'Revalidates the home page data cache',
    action: revalidateMediaroomDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Products Data Tag', 
    type: 'tag',
    key: 'products-data',
    description: 'Revalidates the home page data cache',
    action: revalidateProductsDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Resources Data Tag', 
    type: 'tag',
    key: 'resources-data',
    description: 'Revalidates the home page data cache',
    action: revalidateResourcesDataTag,
    image: 'https://i.pinimg.com/474x/ca/69/0f/ca690fe8c2896b6779623cb0bbc8eba6.jpg'
  },
  { 
    name: 'Support Data Tag', 
    type: 'tag',
    key: 'support-data',
    description: 'Revalidates the home page data cache',
    action: revalidateSupportDataTag,
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
  { 
    name: 'About Path', 
    type: 'path',
    key: '/about',
    description: 'Revalidates the entire home page',
    action: revalidateAboutPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Vision Path', 
    type: 'path',
    key: '/about/vision',
    description: 'Revalidates the entire home page',
    action: revalidateVisionPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Thepinkcity Path', 
    type: 'path',
    key: '/about/the-pink-city',
    description: 'Revalidates the entire home page',
    action: revalidateThepinkcityPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Sustainability Path', 
    type: 'path',
    key: '/about/sustainability',
    description: 'Revalidates the entire home page',
    action: revalidateSustainabilityPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Projects Path', 
    type: 'path',
    key: '/about/projects',
    description: 'Revalidates the entire home page',
    action: revalidateProjectsPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Ourstrength Path', 
    type: 'path',
    key: '/about/our-strength',
    description: 'Revalidates the entire home page',
    action: revalidateOurstrengthPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Ourcompany Path', 
    type: 'path',
    key: '/about/our-company',
    description: 'Revalidates the entire home page',
    action: revalidateOurcompanyPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Application Path', 
    type: 'path',
    key: '/application',
    description: 'Revalidates the entire home page',
    action: revalidateApplicationPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Blog Path', 
    type: 'path',
    key: '/blog',
    description: 'Revalidates the entire home page',
    action: revalidateBlogPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Clientele Path', 
    type: 'path',
    key: '/clientele',
    description: 'Revalidates the entire home page',
    action: revalidateClientelePath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Contact Path', 
    type: 'path',
    key: '/contact',
    description: 'Revalidates the entire home page',
    action: revalidateContactPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Faq Path', 
    type: 'path',
    key: '/faq',
    description: 'Revalidates the entire home page',
    action: revalidateFaqPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Knowledgecenter Path', 
    type: 'path',
    key: '/knowledge-center',
    description: 'Revalidates the entire home page',
    action: revalidateKnowledgecenterPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Mediaroom Path', 
    type: 'path',
    key: '/media-room',
    description: 'Revalidates the entire home page',
    action: revalidateMediaroomPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Products Path', 
    type: 'path',
    key: '/products',
    description: 'Revalidates the entire home page',
    action: revalidateProductsPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Resources Path', 
    type: 'path',
    key: '/resources',
    description: 'Revalidates the entire home page',
    action: revalidateResourcesPath,
    image: '/placeholder.svg?height=300&width=300&text=Home+Path'
  },
  { 
    name: 'Support Path', 
    type: 'path',
    key: '/support',
    description: 'Revalidates the entire home page',
    action: revalidateSupportPath,
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

