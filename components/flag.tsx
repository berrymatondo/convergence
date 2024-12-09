import React from "react";

const Flag = async (flagCode: any) => {
  console.log("flag", flagCode);

  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div>
      {flagCode && <img src={flag} alt="Flag" style={{ width: "1.5rem" }} />}
    </div>
  );
};

export default Flag;
