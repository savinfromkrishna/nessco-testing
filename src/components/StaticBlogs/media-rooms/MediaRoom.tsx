"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, Facebook, Twitter, Linkedin } from "lucide-react";
import { blogPosts } from "../data/mediaData";
import { ContentBlock, ListContent, SectionContent } from "../types/blogs";
import ImageBlock from "@/components/StaticBlogs/ImageBlock";
import TableBlock from "@/components/StaticBlogs/TableBlock";
import TextBlock from "@/components/StaticBlogs/TextBlock";
import ListBlock from "../ListBlock";
import { Card, CardContent } from "@/components/ui/card";
import BlurImage from "@/components/ui/BlurImage";

interface BlogGenericProps {
  id?: string;
}

const BlogGeneric: React.FC<BlogGenericProps> = ({ id }) => {
  const formatString = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLElement | null)[]>([]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 300);

      contentRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveIndex(idx);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContentClick = (index: number) => {
    setActiveIndex(index);
    const element = contentRefs.current[index];
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderContent = (block: ContentBlock) => {
    switch (block.type) {
      case "text":
        return <TextBlock block={block} />;
      case "image":
        return (
          <ImageBlock content={block.content as { src: string; alt: string }} />
        );
      case "table":
        return <TableBlock content={block.content as string[][]} />;
      case "list":
        return <ListBlock content={block.content as ListContent} />;
      case "section":
        const sectionContent = block.content as SectionContent;
        return (
          <div>
            {sectionContent?.intro && <p>{sectionContent.intro}</p>}
            {sectionContent?.blocks?.map((subBlock, index) => (
              <div key={index}>{renderContent(subBlock)}</div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans min-h-screen lg:px-12 px-4 py-20 bg-[#f2f2f2]">
      {/* Header Image Section */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full relative h-full flex flex-col justify-center items-center bg-black lg:rounded-t-[1rem] rounded-t-[0.8rem] py-4 lg:py-8 lg:px-[10%] px-4"
        >
          <h1 className="flex text-white item-center justify-center text-center lg:text-3xl text-lg">
            {post?.header?.heading}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 bg-black lg:h-[18rem] h-[5rem] w-full lg:rounded-b-[1rem] rounded-b-[0.8rem]"
        >
          <div className="lg:px-[10%] px-[4%] absolute top-4 lg:top-8 right-0 left-0">
            {post?.header?.headingImage &&
              (/\.(mp4|webm|ogg)$/i.test(post?.header?.headingImage) ? (
                <video
                  className="object-cover z-50 h-full w-full lg:rounded-[1rem] rounded-[0.8rem] shadow-2xl"
                  autoPlay
                  loop
                  muted
                >
                  <source src={post?.header?.headingImage} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <BlurImage
                  className="object-contain w-full z-50 h-full lg:rounded-[1rem] rounded-[0.8rem] shadow-2xl"
                  layout="responsive"
                  width={900}
                  height={500}
                  priority
                  src={post?.header?.headingImage}
                  alt={post?.slug || "Blog post header image"}
                />
              ))}
          </div>
        </motion.div>
        <div className="bg-white lg:rounded-t-[1rem] rounded-t-[0.8rem] lg:h-[20rem] h-[6rem] w-full lg:mt-8 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="lg:py-8 py-4 px-4 lg:px-8 bg-white lg:rounded-b-[1rem] rounded-b-[0.8rem]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Table of Contents */}
          <div className="md:w-1/4 ">
            <Card
              className={`${
                isSticky ? "md:sticky md:top-16 h-auto border-r rounded-lg" : ""
              }`}
            >
              <CardContent className="p-4 ">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                  className="flex items-center space-x-2 mb-16 "
                >
                  <BlurImage
                    src={
                      post?.author?.avatar ||
                      "https://www.nesscoindia.com/Assets/images/logo.webp"
                    }
                    alt={post?.author?.name || "Author avatar"}
                    width={64}
                    height={64}
                    className="rounded-full h-12 w-12 shadow-lg border-2 border-white"
                  />
                  <div className="text-center">
                    <span className="text-gray-800 font-semibold text-lg">
                      {post?.author?.name}
                    </span>
                    <div className="flex  items-center mt-2 space-x-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-7" />
                        <span className="flex flex-wrap w-[4rem]">
                          {post?.date}
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <Clock className="w-5" />
                        <span className="flex flex-wrap w-[4rem]">
                          {post?.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <h2 className="font-semibold text-lg mb-4">
                  Table of Contents
                </h2>
                <div className="space-y-3">
                  {post?.content?.map((block, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleContentClick(idx)}
                      className={`pl-3 py-1 border-l cursor-pointer ${
                        idx === activeIndex
                          ? "bg-blue-50 border-l-2 border-blue-500"
                          : ""
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          idx === activeIndex
                            ? "text-blue-900"
                            : "text-gray-600 hover:text-blue-500"
                        }`}
                      >
                        {block.heading ||
                          (block.type === "text"
                            ? (block?.content as string).slice(0, 30) + "..."
                            : block?.type)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Connect Section */}
                <div className="mt-8 space-y-4">
                  <h2 className="font-semibold text-lg">Share</h2>
                  <div className="flex gap-2">
                    {[
                      {
                        Icon: Facebook,
                        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href
                        )}`,
                      },
                      {
                        Icon: Twitter,
                        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(post?.title || "")}`,
                      },
                      {
                        Icon: Linkedin,
                        url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                          window.location.href
                        )}&title=${encodeURIComponent(post?.title || "")}`,
                      },
                      {
                        Icon: () => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16.05 12.42a6 6 0 11-8.49 0M15.5 16a6.48 6.48 0 01-7-6c.8.6 2 1.2 3.5 1.5.63-.8 1.8-2 2.62-2.5a4.5 4.5 0 016.38 6.3z"
                            />
                          </svg>
                        ),
                        url: `https://wa.me/?text=${encodeURIComponent(
                          `${post?.title || ""} - ${window.location.href}`
                        )}`,
                      },
                    ].map(({ Icon, url }, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                    {/* Copy Link Button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-link"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="md:w-3/4">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <TagList tags={post?.tags} />
            </motion.div> */}

            <div className="space-y-8">
              <AnimatePresence>
                {post?.content?.map((block, index) => (
                  <motion.div
                    key={index}
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-6"
                  >
                    {block?.heading && (
                      <h2 className="text-3xl font-bold text-gray-800 leading-tight">
                        {block?.heading}
                      </h2>
                    )}
                    {block?.image && (
                      <div className="my-8">
                        <BlurImage
                          src={block?.image}
                          alt={block?.heading || ""}
                          width={800}
                          height={400}
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    )}
                    {block?.subheading && (
                      <h3 className="text-xl font-semibold text-gray-700 leading-tight">
                        {block?.subheading}
                      </h3>
                    )}
                    {renderContent(block)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogGeneric;
