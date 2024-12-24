import React from "react";
import { ContactItem } from "./types/constant";

interface MainLayoutProps{
  contactData:ContactItem;
}

const Reach: React.FC <MainLayoutProps> =({contactData}) => {
  const reachtitle=contactData?.contact[0]?.heading[0]?.reachtitle;
  const reachhighlight=contactData?.contact[0]?.heading[0]?.reachhighlight;

  return (
    <>
      <section className="lg:py-10 h-full flex lg:mb-0 mb-4">
        <div className="container  lg:h-[37rem] w-full bg-white rounded-[2rem] p-5">
          <h2 className="text-3xl font-medium font-poppins text-center mb-2">
            {reachtitle} <span className="text-red-700">{reachhighlight}</span>
          </h2>
          <div className="flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.6906406902926!2d75.86234927478176!3d26.78612946552013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db577a120875b%3A0x3912582d92baafea!2sNessco%20Paper%20Cup%20Machine!5e0!3m2!1sen!2sin!4v1714119835373!5m2!1sen!2sin"
              width="100%"
              height="500"
              className="border-0 rounded-lg"
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reach;
