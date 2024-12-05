import Image from "next/image";
import React from "react";
import spinner from "../../public/sf.gif";

const Loading = () => {
  /*   let tt: any = [];
  for (let i = 0; i < 5; i++) tt.push(i); */
  return (
    <div className=" flex justify-center items-center h-full overflow-hidden w-full ">
      <Image
        alt="home"
        src={spinner}
        quality={100}
        className="hover:cursor-pointer p-2  rounded-full text-center "
      />

      {/*       <p className="text-3xl">Loading...</p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        {tt?.map((i: any) => (
          <li key={i}>
            <span
              className="inline-block h-5 animate-pulse w-full "
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "1s",
              }}
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Loading;
