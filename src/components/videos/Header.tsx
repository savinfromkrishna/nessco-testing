"use client";

import React, { useState } from "react";
import { VideosItem } from "./types/constant";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/ScrollArea";
import { Checkbox } from "../ui/CheckBox";
import YouTube from "../Navbar/NavLayouts/YoutubeSvg";
import BlurImage from "../ui/BlurImage";

interface VideosProps {
  videosData: VideosItem;
}

const VideoGallery: React.FC<VideosProps> = ({ videosData }) => {
  const Header = videosData?.Videos[0]?.Header;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([
    "All Categories",
  ]);
  const [categorySearch, setCategorySearch] = useState("");

  const [tempSelectedCategories, setTempSelectedCategories] = useState<
    string[]
  >(["All Categories"]);
  const [tempSelectedApplications, setTempSelectedApplications] = useState<
    string[]
  >(["All Categories"]);

  const filteredVideos = Header?.VideosRef?.filter((video) => {
    const categoryMatch =
      selectedCategories?.includes("All Categories") ||
      selectedCategories?.includes(video?.tag);
    const applicationMatch =
      selectedApplications?.includes("All Categories") ||
      selectedApplications?.includes(video?.tag);

    return categoryMatch && applicationMatch;
  });

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
    allOption: string
  ) => {
    const { name, checked } = event?.target;
    setSelected((prev) => {
      if (name === allOption) {
        return checked ? [allOption] : [];
      } else {
        const withoutAll = prev?.filter((item) => item !== allOption);
        if (checked) {
          return [...withoutAll, name];
        } else {
          const newSelection = withoutAll?.filter((item) => item !== name);
          return newSelection?.length === 0 ? [allOption] : newSelection;
        }
      }
    });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectionChange(event, setSelectedCategories, "All Categories");
  };

  const FilterContent = ({ isMobile = false }) => (
    <div className={cn("space-y-6", isMobile ? "p-4" : "p-6")}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg hidden lg:flex font-medium text-gray-900">
            {Header?.filter}
          </h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 hidden lg:flex w-6 mt-2"
          >
            <path
              d="M3 7H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M6 12H18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M10 17H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="pl-9 rounded-[1rem] border-gray-200"
          />
        </div>
      </div>

      <ScrollArea
        className={cn(
          "pr-4",
          isMobile ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-240px)]"
        )}
      >
        <div className="space-y-2">
          <p className="font-medium hidden lg:flex mb-2">
            {Header?.byCategory}
          </p>
          {Header?.categories
            .filter((category) =>
              category.title
                .toLowerCase()
                .includes(categorySearch.toLowerCase())
            )
            .map((category) => (
              <label
                key={category.title}
                className="flex items-center space-x-2 cursor-pointer py-1"
              >
                <Checkbox
                  checked={
                    isMobile
                      ? tempSelectedCategories.includes(category.title)
                      : selectedCategories.includes(category.title)
                  }
                  onCheckedChange={(checked) => {
                    const event = {
                      target: {
                        name: category.title,
                        checked: checked === true,
                      },
                    };
                    if (isMobile) {
                      handleSelectionChange(
                        event as React.ChangeEvent<HTMLInputElement>,
                        setTempSelectedCategories,
                        "All Categories"
                      );
                    } else {
                      handleCategoryChange(
                        event as React.ChangeEvent<HTMLInputElement>
                      );
                    }
                  }}
                  id={category.title}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-red-700"
                />
                <span
                  className={cn(
                    "text-sm font-montserrat",
                    isMobile
                      ? tempSelectedCategories.includes(category.title)
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                      : selectedCategories.includes(category.title)
                      ? "text-gray-900 font-medium"
                      : "text-gray-600"
                  )}
                >
                  {category.title}
                </span>
              </label>
            ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="pt-[5.2rem] py-10 lg:px-10 px-5 font-poppins bg-[#f2f2f2]">
      <div className="lg:flex lg:space-x-6">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-[280px] bg-white rounded-xl lg:min-h-screen flex-shrink-0 lg:mr-6">
          <FilterContent />
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl p-5 mt-4 lg:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-[#483d73] text-2xl font-poppins font-medium mb-2">
                {Header?.title}
                <div className="lg:border-t-[0.2rem] border-t-2 border-solid border-red-700 lg:w-[8vw] w-[18vw] mt-[0.4rem]"></div>
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="lg:hidden flex items-center -mt-4 justify-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {Header?.filter}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[90vw] bg-white h-[95vh] p-0">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h2 className="text-lg font-medium">{Header?.filter}</h2>
                      <DialogTrigger asChild></DialogTrigger>
                    </div>
                    <FilterContent isMobile />
                    <div className="flex justify-end space-x-2 p-4 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTempSelectedCategories(["All Categories"]);
                          setTempSelectedApplications(["All Categories"]);
                        }}
                      >
                        {Header?.cancel}
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedCategories(tempSelectedCategories);
                          setSelectedApplications(tempSelectedApplications);
                        }}
                      >
                        {Header?.apply}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {filteredVideos?.map((item, idx) => (
                  <Dialog key={idx}>
                    <DialogTrigger asChild>
                      <div className="w-full h-[10rem] relative group cursor-pointer">
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 rounded-[1rem]" />
                        <BlurImage
                          height={600}
                          width={600}
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                            item.url
                          )}/0.jpg`}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-[1rem]"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <YouTube className="w-12 h-12 text-white opacity-100 " />
                        </div>
                        <div className="absolute top-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-md font-medium truncate">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[70vw] rounded-2xl sm:max-h-[90vh] px-6">
                      <div className="relative w-full rounded-[1rem] h-[80vh]">
                        <iframe
                          className="w-full rounded-2xl h-full"
                          src={`${item.url}${
                            item.url.includes("?") ? "&" : "?"
                          }autoplay=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

const getYouTubeVideoId = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default VideoGallery;
