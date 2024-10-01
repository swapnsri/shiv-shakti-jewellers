"use client";
import Connect from "@/app/components/connect";
import Search from "@/app/components/search";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/SSJ1.png";
import FilterDropdown from "./components/filter";
import Profile from "./components/profile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStateSession } from "@/app/utils";

export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!loadStateSession("login")) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <header className="relative p-3 flex gap-10 items-center bg-[var(--brand-color2-400)]">
        <div>
          <Link href={"/"}>
            <Image src={Logo} alt="" width={77} />
          </Link>
        </div>
        <div className="w-[800px]">
          <Search />
        </div>
        <div>
          <FilterDropdown />
        </div>
        <div>
          <Profile />
        </div>
      </header>
      {/* {props.modal} */}
      {props.children}

      <div className="ml-auto">
        <Connect />
      </div>

      <footer className="my-[20px]  text-center flex justify-center w-full">
        © 2024 SSJ. All Rights Reserved
      </footer>
    </>
  );
}
