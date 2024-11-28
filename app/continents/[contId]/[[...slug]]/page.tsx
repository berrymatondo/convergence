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
import { getCountry } from "@/lib/_countryActions";

const DetailPage = async ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;

  const session = await auth();
  const usr: any = session?.user;

  const country = await getCountry(slug ? +slug[0] : 1);

  //console.log("sulg2:", country?.data?.name);

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
    <div>
      <PageLayout
        title={country?.data?.name ? country?.data?.name : " "}
        flagCode={country?.data?.flagCode ? country?.data?.flagCode : "ng"}
        description="Toutes les matières premières enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Commodities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  Matières Premières
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
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
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
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
