import { getAllStaticCommo } from "@/lib/_commoActions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
  //const url = new URL(request.url);
  //getAllStaticCommo

  try {
    const res = await getAllStaticCommo();

    //console.log("results", rgdp);

    return NextResponse.json({ message: "OK", res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
};
