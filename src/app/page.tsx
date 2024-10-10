import Image from "next/image";
import Title from "./components/atoms/title";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <Title className="font-montserrat text-white">Welcome to Next.js!</Title>
    </div>
  );
}
