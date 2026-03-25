"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans text-black">
      <div
        className="cursor-pointer hover:text-orange-600"
        onClick={() => {
          router.push("event");
        }}
      >
        stream event
      </div>
    </div>
  );
}
