import { auth } from "@/auth";
import BondViews from "@/components/bond/bondViews";
import CommoBody from "@/components/commo/commoBody";
import CommoViews from "@/components/commo/commoViews";
import HistoCommoItem from "@/components/commo/histoCommoItem";
import Loading from "@/components/commo/loading";
import FundViews from "@/components/fund/fundViews";
import NotConnected from "@/components/notConnected";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";

import { getBond } from "@/lib/_bondActions";

import { getIndex } from "@/lib/_indexActions";

import React, { Suspense } from "react";

type BondDetailPageProps = {
  params: {
    bondId: number;
  };
};

const BondDetailPage = async ({ params }: BondDetailPageProps) => {
  const resu = await getIndex(22);
  const defFund = resu?.data;

  const resu23 = await getIndex(23);
  const defFund23 = resu23?.data;

  const res = await getBond(params.bondId);
  const bond = res?.data;

  //console.log("fund", fund);

  const session = await auth();
  const usr: any = session?.user;

  if (!usr) return <NotConnected />;

  //console.log("bond", bond?.callable);

  return (
    <div className="">
      {" "}
      <PageLayout
        wid="mx-12"
        title={bond?.description}
        description="This page gives the details of a bond"
      >
        <CustomBreadcrumb name="Bonds" />

        <div className="grid md:grid-cols-5 max-md:w-full">
          <div className=" md:col-span-3 md:grid md:grid-cols-2 gap-2 max-md:w-full">
            <div className="w-full text-sm bg-blue-950/30 col-span-1 border rounded-lg px-2">
              <h1 className=" text-center font-semibold  p-2 text-sky-400">
                Issue Details
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Instrument Type:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.instrumentType}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">ISIN:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.isin}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Issuer:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.issuer}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Seniority:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.seniority}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Market Of Issue:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.market?.name?.replaceAll("-", " ")}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Issue Date:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.issueDate}
                </strong>
              </p>
              {/*               <p className="flex justify-between mt-1">
                <span className="font-thin">ISIN:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.isin}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Lipper Classification Scheme:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.lipperClassificationScheme}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Instrument Type:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.instrumentType}
                </strong>
              </p> */}
            </div>
            <div className="text-sm bg-blue-950/30 col-span-1 border rounded-lg px-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Bond Summary
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Coupon Class:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.couponClass}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Coupon Rate:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.couponRate}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Coupon Frequency:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.couponFrequency}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Coupon Currency:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.couponCurrency?.currency}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Principal Currency:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.principalCurrency?.currency}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Maturity Date:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.maturity}
                </strong>
              </p>
            </div>

            <div className="text-sm bg-blue-950/30 col-span-1 border rounded-lg px-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Issuer Information
              </h1>
              <Separator className="my-1" />

              <p className="flex justify-between mt-1">
                <span className="font-thin">Issuer Type:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.issuerType}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Issuer country:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.market?.name?.replaceAll("_", " ")}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Issuer Sector:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.sector}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Details:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.details}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Guarantee:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.guaranteed ? "YES" : "NO"}
                </strong>
              </p>

              {/*           {fund?.fundCountryRegisteredForSales?.map((el: any) => (
                  <div key={el.id}>{el?.country?.name}</div>
                ))} */}
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Financial Details
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Issue Price:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.issuePrice}%
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Amount Issued (USD):</span>
                <strong className="font-thin text-orange-400">
                  {bond?.amountIssuedUSD
                    ? new Intl.NumberFormat("en-DE").format(
                        +bond?.amountIssuedUSD
                      )
                    : 0}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Outstanding Amound(USD):</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Bond Grade:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.bondGrade}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Coupon Structure:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              {/*               <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundAdministrators(fund?.fundAdministratorsMapping)}
                </strong>
                fund
              </p> */}
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Additionnal Futures
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Callable:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.callable ? "YES" : "NO"}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Putable:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.putable ? "YES" : "NO"}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Inflation Linked:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.inflationLinked ? "YES" : "NO"}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Convertible:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Dual Currency:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.dualCurrency ? "YES" : "NO"}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Green Bond:</span>
                <strong className="font-thin text-orange-400">
                  {bond?.greenBond ? "YES" : "NO"}
                </strong>
              </p>
              {/*               <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundPromoters(fund?.fundPromotersMapping)}
                </strong>
              </p> */}
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Risk Analysis
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Credit Rating:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Rating:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Rating History:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Current Yield:</span>
                <strong className="font-thin text-orange-400">{"-"}</strong>
              </p>
              {/*               <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundPrometerManager(fund?.fundPromotersManagerMapping)}
                </strong>
              </p> */}
            </div>
          </div>
          <div className="md:col-span-2">
            {" "}
            <Suspense fallback={<Loading />}>
              <BondViews fund={defFund} fund23={defFund23} />
            </Suspense>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default BondDetailPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/bonds">Bonds</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
