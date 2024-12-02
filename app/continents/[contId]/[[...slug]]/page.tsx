import { auth } from "@/auth";
import Continent from "@/components/continent/continent";
import AddYield from "@/components/go/addYield";
import Signaletique from "@/components/go/signaletique";
import YieldCurveComp from "@/components/go/yieldCurve";
import YiedlGraphe from "@/components/graphes/yiedlGRaphe";
import PageLayout from "@/components/pageLayout";
import { headers } from "next/headers";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCountry, getStaticInfoCountry } from "@/lib/_countryActions";
import Title from "@/components/title";

const DetailPage = async ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;

  const session = await auth();
  const usr: any = session?.user;

  const country = await getCountry(slug ? +slug[0] : 1);
  const staticCountry = await getStaticInfoCountry(slug ? +slug[0] : 1);

  console.log("sulg2:", staticCountry);

  const headersList = headers();
  //const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const continent = fullUrl.split("continents/")[1];

  //console.log(fullUrl);

  //console.log("continent:=" + continent);

  // IF CONTINENT
  if (!slug) {
    return (
      <div className="max-md:w-full w-1/2">
        <YieldCurveComp continent={continent} />
      </div>
    );
  }
  return (
    <div className=" pt-8">
      <Title
        flagCode={country?.data?.flagCode ? country?.data?.flagCode : "ng"}
        title={country?.data?.name ? country?.data?.name : " "}
      />
      <div
      // title={country?.data?.name ? country?.data?.name : " "}
      // flagCode={country?.data?.flagCode ? country?.data?.flagCode : "ng"}
      // description="Toutes les matières premières enregistrées dans le système"
      >
        <div className="px-2 w-full ">
          {/*           <CustomBreadcrumb name="Commodities" />
           */}{" "}
          <div className=" w-full grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-2 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  GENERAL
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <p className="text-xl flex justify-between">
                    <span>GDP Growth Rate</span>
                    <span className="text-sky-600">
                      {" "}
                      {staticCountry?.data?.gdpGrowhtRate} %
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Interest Rate</span>
                    <span> 23 %</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    {" "}
                    <span className="text-gray-400">Inflation Rate</span>
                    <span> 19 %</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Unemployment Rate</span>
                    <span> 15 %</span>{" "}
                  </p>
                </div>
                <div>
                  <p className="text-xl flex justify-between">
                    <span>Government Debt to GDP</span>
                    <span className="text-sky-600"> 54 %</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    {" "}
                    <span className="text-gray-400">
                      Balance of Trade (NGN Millions){" "}
                    </span>
                    <span>2.158.251</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Credit Rating (S&P) </span>
                    <span>B </span>
                  </p>
                </div>
                <p className="text-sm flex justify-between">
                  <span className="text-gray-400">
                    Default Probability (Starmine){" "}
                  </span>
                  <span>11 %</span>
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  USD/NGN SPOT
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
            <Card className="md:col-span-2 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  EQUITY MARKET NSE 30
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/*                 <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-start gap-2">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        xxxxxx
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>description</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-start gap-2">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        info
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>content</AccordionContent>
                  </AccordionItem>
                </Accordion> */}
              </CardContent>
            </Card>
            <Card className="md:col-span-2 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  FIXED INCOME MARKET
                </CardTitle>
              </CardHeader>
              <CardContent>x</CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/*       <div className="grid md:grid-cols-4 gap-2 ">
        <div className="md:col-span-1 ">
          <Signaletique slug={slug} />
        </div>

        <div className="col-span-1 ">
          <YieldCurveComp slug={slug} title="Fixed Income Market" />
        </div>
        <div className="col-span-1">
          <YieldCurveComp slug={slug} title="Commodities" />
        </div>
        <div className="col-span-1">
          <YieldCurveComp slug={slug} title="African Equity Market" />
        </div>
      </div>
      <div className=" md:grid-cols-5 gap-1 rounded-lg overflow-hidden my-2 grid">
        <div className="md:col-span-1"></div>
        <div className="md:col-span-3">
          <YieldCurveComp slug={slug} title="SOVEREIGN BONDS MODEL PRICE" />
        </div>
        <div className="md:col-span-1"></div>
      </div>
      <div className="grid md:grid-cols-6 gap-1 rounded-lg overflow-hidden my-2">
        <div className="md:col-span-2">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
        <div className="md:col-span-2">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
        <div className="md:col-span-2">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
      </div> */}
    </div>
  );
};

export default DetailPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
            <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
