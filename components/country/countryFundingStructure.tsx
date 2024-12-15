import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import BondItem from "../bond/bondItem";

type CountryFundingStructureProps = {
  staticCountry: any;
};
const CountryFundingStructure = ({
  staticCountry,
}: CountryFundingStructureProps) => {
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
    <Card className=" md:col-span-5 h-68">
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
                        ?.filter((st: any) => st.issuerType != "SOVEREIGN")
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
  );
};

export default CountryFundingStructure;
