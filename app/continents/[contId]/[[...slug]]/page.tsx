import { auth } from "@/auth";
import Continent from "@/components/continent/continent";
import AddYield from "@/components/go/addYield";
import Signaletique from "@/components/go/signaletique";
import YieldCurveComp from "@/components/go/yieldCurve";
import YiedlGraphe from "@/components/graphes/yiedlGRaphe";
import PageLayout from "@/components/pageLayout";
import { headers } from "next/headers";
import React, { Suspense } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import BondItem from "@/components/bond/bondItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FxCountry from "@/components/fx/fxCountry";
import EquityCountry from "@/components/equity/equityCountry";
import Loading from "@/components/commo/loading";
import { getContinent } from "@/lib/_continentActions";

const DetailPage = async ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;

  const session = await auth();
  const usr: any = session?.user;

  const country = await getCountry(slug ? +slug[0] : 1);
  const staticCountry = await getStaticInfoCountry(slug ? +slug[0] : 1);

  //console.log("sulg2:", country?.data);
  /*   console.log(
    "sulg2:",
    country?.data?.countryIndexMapping?.filter(
      (el: any) => el.assetTypesList == "EQUITY"
    )
  ); */

  const headersList = headers();
  //const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const continent = fullUrl.split("continents/")[1];

  //console.log(staticCountry);

  //console.log("continent:=" + continent);

  // IF CONTINENT

  const buildSum = (vect: any) => {
    let sum = 0;
    for (let i = 0; i < vect?.length; i++) {
      sum += vect[i]?.amountIssuedUSD;
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(sum);
  };

  const buildMean = (vect: any) => {
    let sum = 0;
    for (let i = 0; i < vect?.length; i++) {
      sum += vect[i]?.couponRate;
    }
    return (sum / vect?.length)?.toFixed(2);
  };

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
          <div className=" w-full grid md:grid-cols-5 gap-2">
            <Card className="md:col-span-1 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  GENERAL
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <p className="text-xl text-orange-600 flex justify-between  font-semibold">
                    <span>GDP Growth Rate</span>
                    <span className="">
                      {" "}
                      {staticCountry?.data?.gdpGrowhtRate} %
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Interest Rate</span>
                    <span> {staticCountry?.data?.interestRate} %</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    {" "}
                    <span className="text-gray-400">Inflation Rate</span>
                    <span> {staticCountry?.data?.inflationRate} %</span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Unemployment Rate</span>
                    <span> {staticCountry?.data?.unemploymentRate} %</span>{" "}
                  </p>
                </div>
                <div>
                  <p className="text-orange-600 text-xl flex justify-between  font-semibold">
                    <span>Government Debt to GDP</span>
                    <span className="text-orange-600">
                      {" "}
                      {staticCountry?.data?.debtToGdp} %
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    {" "}
                    <span className="text-gray-400">
                      Balance of Trade (
                      {staticCountry?.data?.balanceOfTradeCurrency})
                    </span>
                    <span>
                      {new Intl.NumberFormat().format(
                        staticCountry?.data?.balanceOfTrade
                          ? +staticCountry?.data?.balanceOfTrade
                          : 0
                      )}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-400">Credit Rating (S&P) </span>
                    <span> {staticCountry?.data?.creditRating}</span>
                  </p>
                </div>
                <p className="text-sm flex justify-between">
                  <span className="text-gray-400">
                    Default Probability (Starmine){" "}
                  </span>
                  <span>
                    {staticCountry?.data?.defaultProbability?.toFixed(2)} %
                  </span>
                </p>
                <div className="bg-sky-950 flex items-center justify-center mx-auto mt-4 p-8 rounded-lg text-2xl font-semibold ">
                  {buildSum(staticCountry?.data?.country?.staticInfoBond)}
                </div>
              </CardContent>
            </Card>
            <div className="md:col-span-2  h-68 ">
              <Suspense fallback={<Loading />}>
                <FxCountry fxList={country?.data?.fxMapping} />
              </Suspense>
            </div>

            <div className="md:col-span-2  h-68 ">
              <Suspense fallback={<Loading />}>
                <EquityCountry
                  equityList={country?.data?.countryIndexMapping?.filter(
                    (el: any) => el.assetTypesList == "EQUITY"
                  )}
                />{" "}
              </Suspense>
            </div>

            {/*             <Card className="md:col-span-1 h-68">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  FIXED INCOME MARKET
                </CardTitle>
              </CardHeader>
              <CardContent>x</CardContent>
            </Card> */}
            <Card className="md:col-span-5 h-68">
              <CardHeader>
                <CardTitle className="text-center text-sky-700 dark:text-sky-500">
                  FUNDING STRUCTURE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="domestic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="domestic">Domestic Market</TabsTrigger>
                    <TabsTrigger value="international">
                      International Market
                    </TabsTrigger>
                    <TabsTrigger value="other">Other Market</TabsTrigger>
                  </TabsList>
                  <TabsContent value="domestic">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4">
                          <span className="flex flex-col items-center">
                            <Label className="">Issues</Label>
                            <strong className="text-white text-xl">
                              {
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId == st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                ).length
                              }
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name"> Issued Amount USD</Label>
                            <strong className="text-white text-xl">
                              {buildSum(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId == st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                              )}
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name">Average Coupon Rate</Label>
                            <strong className="text-white text-xl">
                              {" "}
                              {buildMean(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId == st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                              )}
                              {"%"}
                            </strong>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <Table>
                            <TableHeader className="">
                              <TableRow className="">
                                <TableHead className="max-md:w-[100px] md:pl-4">
                                  Description
                                </TableHead>
                                <TableHead className="text-center">
                                  Maturity Date
                                </TableHead>
                                <TableHead className="text-center">
                                  Issued Amount USD
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Rate
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Class
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Frequency
                                </TableHead>
                                <TableHead className="text-center">
                                  Principal Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Market of Issue
                                </TableHead>
                                <TableHead className="text-center">
                                  Inflation Linked
                                </TableHead>
                                <TableHead className="text-center">
                                  Dual Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Green Bond
                                </TableHead>
                                <TableHead className="text-right md:pr-4">
                                  ISIN
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="">
                              {staticCountry?.data?.country?.staticInfoBond
                                ?.filter(
                                  (st: any) =>
                                    st.countryId == st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                                ?.sort(
                                  (a: any, b: any) =>
                                    Date.parse(b.date) - Date.parse(a.date)
                                )
                                .map((el: any) => (
                                  <BondItem bond={el} key={el.id} />
                                ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        {/*                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div> */}
                      </CardContent>
                      {/*                <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter> */}
                    </Card>
                  </TabsContent>
                  <TabsContent value="international">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4">
                          <span className="flex flex-col items-center">
                            <Label className="">Issues</Label>
                            <strong className="text-white text-xl">
                              {
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId != st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                ).length
                              }
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name"> Issued Amount USD</Label>
                            <strong className="text-white text-xl">
                              {buildSum(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId != st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                              )}
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name">Average Coupon Rate</Label>
                            <strong className="text-white text-xl">
                              {" "}
                              {buildMean(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) =>
                                    st.countryId != st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                              )}{" "}
                              {"%"}
                            </strong>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <Table>
                            <TableHeader className="">
                              <TableRow className="">
                                <TableHead className="max-md:w-[100px] md:pl-4">
                                  Description
                                </TableHead>
                                <TableHead className="text-center">
                                  Maturity Date
                                </TableHead>
                                <TableHead className="text-center">
                                  Issued Amount USD
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Rate
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Class
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Frequency
                                </TableHead>
                                <TableHead className="text-center">
                                  Principal Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Market of Issue
                                </TableHead>
                                <TableHead className="text-center">
                                  Inflation Linked
                                </TableHead>
                                <TableHead className="text-center">
                                  Dual Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Green Bond
                                </TableHead>
                                <TableHead className="text-right md:pr-4">
                                  ISIN
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="">
                              {staticCountry?.data?.country?.staticInfoBond
                                ?.filter(
                                  (st: any) =>
                                    st.countryId != st.marketOfIssueId &&
                                    st.issuerType == "SOVEREIGN"
                                )
                                ?.sort(
                                  (a: any, b: any) =>
                                    Date.parse(b.date) - Date.parse(a.date)
                                )
                                .map((el: any) => (
                                  <BondItem bond={el} key={el.id} />
                                ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        {/*                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div> */}
                      </CardContent>
                      {/*                <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter> */}
                    </Card>
                  </TabsContent>
                  <TabsContent value="other">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4">
                          <span className="flex flex-col items-center">
                            <Label className="">Issues</Label>
                            <strong className="text-white text-xl">
                              {
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) => st.issuerType != "SOVEREIGN"
                                ).length
                              }
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name"> Issued Amount USD</Label>
                            <strong className="text-white text-xl">
                              {buildSum(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) => st.issuerType != "SOVEREIGN"
                                )
                              )}
                            </strong>
                          </span>
                          <span className="flex flex-col items-center">
                            <Label htmlFor="name">Average Coupon Rate</Label>
                            <strong className="text-white text-xl">
                              {" "}
                              {buildMean(
                                staticCountry?.data?.country?.staticInfoBond?.filter(
                                  (st: any) => st.issuerType != "SOVEREIGN"
                                )
                              )}
                              {"%"}
                            </strong>
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <Table>
                            <TableHeader className="">
                              <TableRow className="">
                                <TableHead className="max-md:w-[100px] md:pl-4">
                                  Description
                                </TableHead>
                                <TableHead className="text-center">
                                  Maturity Date
                                </TableHead>
                                <TableHead className="text-center">
                                  Issued Amount USD
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Rate
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Class
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Frequency
                                </TableHead>
                                <TableHead className="text-center">
                                  Principal Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Coupon Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Market of Issue
                                </TableHead>
                                <TableHead className="text-center">
                                  Inflation Linked
                                </TableHead>
                                <TableHead className="text-center">
                                  Dual Currency
                                </TableHead>
                                <TableHead className="text-center">
                                  Green Bond
                                </TableHead>
                                <TableHead className="text-right md:pr-4">
                                  ISIN
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody className="">
                              {staticCountry?.data?.country?.staticInfoBond
                                ?.filter(
                                  (st: any) => st.issuerType != "SOVEREIGN"
                                )
                                ?.sort(
                                  (a: any, b: any) =>
                                    Date.parse(b.date) - Date.parse(a.date)
                                )
                                .map((el: any) => (
                                  <BondItem bond={el} key={el.id} />
                                ))}
                            </TableBody>
                          </Table>
                        </ScrollArea>
                        {/*                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div> */}
                      </CardContent>
                      {/*                <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter> */}
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
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
