import { AudioNotes } from "@/components/AudioNotes";
import { LoveText } from "@/components/LoveText";
import { StackingHearts } from "@/components/StackingHearts";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="w-full min-h-screen">
      <section>
        <div className="w-full h-dvh flex flex-col justify-center items-center bg-[#c8102e]  px-6 relative text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: "Love" }}
            className="text-5xl text-white tracking-wide z-50"
          >
            Happy Valentines Day
          </motion.span>
          <StackingHearts />
        </div>

        <button
          id="poems-anchor"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronUp color="white" size={40} />
        </button>
      </section>
      <LoveText />
      <AudioNotes />
    </main>
  );
}
