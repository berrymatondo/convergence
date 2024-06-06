import React from "react";

type TitleProps = {
  title: string;
  description?: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="">
      <div className=" text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col items-start my-2 ">
        <h1 className="uppercase font-bold text-lg max-md:text-sm text-orange-400">
          {title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Title;
