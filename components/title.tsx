import React from "react";

type TitleProps = {
  title: string;
  description?: string;
  position?: string;
  descPosition?: string;
  flagCode?: string;
};

const Title = ({
  title,
  description,
  position,
  descPosition,
  flagCode,
}: TitleProps) => {
  let pos;
  let desc;
  if (!position) {
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 items-start ";
    desc = "max-md:hidden  text-sm md:text-md text-blue-800 dark:text-white";
  } else {
    pos =
      "text-white px-4 rounded-bl-3xl rounded-tr-3xl flex flex-col my-2 " +
      position;
    desc =
      "max-md:hidden text-sm md:text-md text-blue-800 dark:text-white  text-center";
  }

  const flag = "https://flagcdn.Com/w40/" + flagCode + ".png";

  return (
    <div className={pos}>
      <div className="flex gap-2 items-center w-full justify-center">
        {" "}
        <img src={flag} alt="Flag" style={{ width: "3rem" }} />
        <h1 className="uppercase font-bold text-3xl max-md:text-lg text-sky-700 dark:text-sky-500 md:my-4">
          {title.split("_").join(" ")}
        </h1>
      </div>
      <p className={desc}>{description}</p>
    </div>
  );
};

export default Title;
