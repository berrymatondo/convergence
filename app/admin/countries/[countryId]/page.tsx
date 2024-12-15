import { auth } from "@/auth";
import CountryFundingStructure from "@/components/country/countryFundingStructure";
import EquityCountry from "@/components/equity/equityCountry";
import FxCountry from "@/components/fx/fxCountry";
import PageLayout from "@/components/pageLayout";
import Title from "@/components/title";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCountry, getStaticInfoCountry } from "@/lib/_countryActions";
import Link from "next/link";

type CountryPageProps = {
  params: {
    countryId: number;
  };
};

const CountryPage = async ({ params }: CountryPageProps) => {
  const countryId = params.countryId;

  const res = await getCountry(countryId);
  const country = res?.data;

  const session = await auth();
  const usr: any = session?.user;

  if (!usr)
    return (
      <div>
        Please,{" "}
        <Link href="/auth/login" className="underline text-sky-600">
          Log In
        </Link>
      </div>
    );

  const res1 = await getStaticInfoCountry(countryId);
  const staticCountry = res1?.data;
  //console.log("staticCountry", staticCountry);

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

  return (
    <div className="">
      {" "}
      <PageLayout wid="mx-12">
        <CustomBreadcrumb
          name={country?.name ? country?.name?.replaceAll("_", " ") : " "}
        />
        <Title
          flagCode={country?.flagCode ? country?.flagCode : "ng"}
          title={country?.name ? country?.name : " "}
        />
        <div className=" w-full grid md:grid-cols-5 gap-2">
          <Card className="md:col-span-1 h-68 bg-blue-950/30">
            <CardHeader>
              <CardTitle className="text-sky-700 dark:text-sky-500 ">
                GENERAL
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div>
                <p className="text-xl text-orange-600 flex justify-between  font-semibold">
                  <span>GDP Growth Rate</span>
                  <span className=""> {staticCountry?.gdpGrowhtRate} %</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-gray-400">Interest Rate</span>
                  <span> {staticCountry?.interestRate} %</span>
                </p>
                <p className="text-sm flex justify-between">
                  {" "}
                  <span className="text-gray-400">Inflation Rate</span>
                  <span> {staticCountry?.inflationRate} %</span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-gray-400">Unemployment Rate</span>
                  <span> {staticCountry?.unemploymentRate} %</span>{" "}
                </p>
              </div>
              <div>
                <p className="text-orange-600 text-xl flex justify-between  font-semibold">
                  <span>Government Debt to GDP</span>
                  <span className="text-orange-600">
                    {" "}
                    {staticCountry?.debtToGdp} %
                  </span>
                </p>
                <p className="text-sm flex justify-between">
                  {" "}
                  <span className="text-gray-400">
                    Balance of Trade ({staticCountry?.balanceOfTradeCurrency})
                  </span>
                  <span>
                    {new Intl.NumberFormat().format(
                      staticCountry?.balanceOfTrade
                        ? +staticCountry?.balanceOfTrade
                        : 0
                    )}
                  </span>
                </p>
                <p className="text-sm flex justify-between">
                  <span className="text-gray-400">Credit Rating (S&P) </span>
                  <span> {staticCountry?.creditRating}</span>
                </p>
              </div>
              <p className="text-sm flex justify-between">
                <span className="text-gray-400">
                  Default Probability (Starmine){" "}
                </span>
                <span>{staticCountry?.defaultProbability?.toFixed(2)} %</span>
              </p>
              <div className="bg-sky-950 flex items-center justify-center mx-auto mt-4 p-8 rounded-lg text-2xl font-semibold ">
                {buildSum(staticCountry?.country?.staticInfoBond)}
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 ">
            <FxCountry fxList={country?.fxMapping} />
          </div>

          <div className=" md:col-span-2 ">
            <EquityCountry
              equityList={country?.countryIndexMapping?.filter(
                (el: any) => el.assetTypesList == "EQUITY"
              )}
            />
          </div>

          <CountryFundingStructure staticCountry={staticCountry} />
        </div>
      </PageLayout>
    </div>
  );
};

export default CountryPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/countries">Countries</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
