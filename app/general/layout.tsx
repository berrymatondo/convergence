import { ContinentsList } from "@prisma/client";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <div className="flex gap-4">
        <ul>
          {Object.values(ContinentsList).map((cont: any) => (
            <div key={cont}>
              <Link href={`/general/${cont}`}>{cont}</Link>
            </div>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
}
