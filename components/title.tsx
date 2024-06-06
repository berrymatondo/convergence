import React from "react";

type TitleProps = {
  title: string;
  description?: string;
  position?: string;
};

const Title = ({ title, description, position }: TitleProps) => {
  let pos;
  if (!position)
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 items-start ";
  else
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 " +
      position;

  return (
    <div className={pos}>
      <h1 className="uppercase font-bold text-3xl max-md:text-sm text-blue-500 md:my-4">
        {title}
      </h1>
      <p className="text-sm md:text-md text-blue-800 dark:text-white">
        {description}
      </p>
    </div>
  );
};

export default Title;
