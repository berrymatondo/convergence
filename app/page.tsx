import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */ <div className="py-24 flex justify-center my-auto">
      <Link href="/auth/login" className="py-2 px-4 bg-blue-600 rounded-lg">
        START HERE !
      </Link>
    </div>
  );
}
