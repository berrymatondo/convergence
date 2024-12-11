export const buildSma = async (probabilite_defaut: any) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("ici", probabilite_defaut);

  let bodyContent = JSON.stringify({
    probabilite_defaut: probabilite_defaut ? +probabilite_defaut : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/analyse_probabilite_defaut",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("LOG: response: ", response);
    //console.log("LOG: data: ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};
