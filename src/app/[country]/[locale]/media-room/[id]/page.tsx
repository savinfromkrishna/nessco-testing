import MediaRoom from "@/components/StaticBlogs/media-rooms/MediaRoom";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
export default async function KnowYourBusinessPage({
  params: { id },
}: Props) {
  
  
  return <MediaRoom id={id} />;
}
