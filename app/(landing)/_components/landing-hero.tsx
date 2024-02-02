"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Typewriter from "typewriter-effect";
export const LandingHero = () => {
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Trại Code EC2</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          <Typewriter
            options={{
              strings: ["Learn", "Code", "Better"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        A Better Way to Learn Coding
      </div>
      <div>
        <Link href="/courses">
          <Button className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};
