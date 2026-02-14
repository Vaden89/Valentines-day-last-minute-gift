import { useRef, useState } from "react";
import {
  useScroll,
  motion,
  type MotionValue,
  useTransform,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const LoveText = () => {
  const container = useRef<HTMLParagraphElement | null>(null);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const currentPoem = poems[currentPoemIndex];
  const words = currentPoem.content.split(" ");

  const handlePrevious = () => {
    setCurrentPoemIndex((prev) => (prev === 0 ? poems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPoemIndex((prev) => (prev === poems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="pt-10 px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-6xl text-[#c8102e]" style={{ fontFamily: "Love" }}>
          POEMS
        </h2>
        <div className="flex items-center gap-2">
          <span
            className="text-sm text-gray-600"
            style={{ fontFamily: "Oswald" }}
          >
            {currentPoemIndex + 1} / {poems.length}
          </span>
        </div>
      </div>

      <p ref={container} style={{ fontFamily: "Oswald" }} className="paragraph">
        {words.map((word, i) => {
          const start = i / words.length;

          const end = start + 1 / words.length;

          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>

      <div className="flex justify-center gap-4 my-8">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-6 py-3 bg-[#c8102e] text-white rounded-full hover:bg-[#a00d24] transition-colors"
          style={{ fontFamily: "Oswald" }}
        >
          <ChevronLeft size={20} />
          <a href="#poems-anchor">Previous</a>
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 bg-[#c8102e] text-white rounded-full hover:bg-[#a00d24] transition-colors"
          style={{ fontFamily: "Oswald" }}
        >
          <a href="#poems-anchor">Next</a>
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="word">
      <span className="shadow">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

interface Poem {
  content: string;
}

const poems: Poem[] = [
  {
    content:
      "She walks in beauty, like the night Of cloudless climes and starry skies; And all that's best of dark and bright Meet in her aspect and her eyes: Thus mellowed to that tender light Which heaven to gaudy day denies. One shade the more, one ray the less, Had half impaired the nameless grace Which waves in every raven tress, Or softly lightens o'er her face; Where thoughts serenely sweet express How pure, how dear their dwelling-place. And on that cheek, and o'er that brow, So soft, so calm, yet eloquent, The smiles that win, the tints that glow, But tell of days in goodness spent, A mind at peace with all below, A heart whose love is innocent!",
  },
  {
    content:
      "How do I love thee? Let me count the ways. I love thee to the depth and breadth and height My soul can reach, when feeling out of sight For the ends of being and ideal grace. I love thee to the level of every day's Most quiet need, by sun and candle-light. I love thee freely, as men strive for right. I love thee purely, as they turn from praise. I love thee with the passion put to use In my old griefs, and with my childhood's faith. I love thee with a love I seemed to lose With my lost saints. I love thee with the breath, Smiles, tears, of all my life; and, if God choose, I shall but love thee better after death.",
  },
  {
    content:
      "Shall I compare thee to a summer's day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer's lease hath all too short a date; Sometime too hot the eye of heaven shines, And often is his gold complexion dimm'd; And every fair from fair sometime declines, By chance or nature's changing course untrimm'd; But thy eternal summer shall not fade, Nor lose possession of that fair thou ow'st; Nor shall death brag thou wander'st in his shade, When in eternal lines to time thou grow'st: So long as men can breathe or eyes can see, So long lives this, and this gives life to thee.",
  },
  {
    content:
      "The fountains mingle with the river And the rivers with the ocean, The winds of heaven mix for ever With a sweet emotion; Nothing in the world is single; All things by a law divine In one spirit meet and mingle. Why not I with thine? See the mountains kiss high heaven And the waves clasp one another; No sister-flower would be forgiven If it disdained its brother; And the sunlight clasps the earth And the moonbeams kiss the sea: What is all this sweet work worth If thou kiss not me?",
  },
  {
    content:
      "O my Luve is like a red, red rose That's newly sprung in June; O my Luve is like the melody That's sweetly played in tune. So fair art thou, my bonnie lass, So deep in luve am I; And I will luve thee still, my dear, Till a' the seas gang dry. Till a' the seas gang dry, my dear, And the rocks melt wi' the sun; I will love thee still, my dear, While the sands o' life shall run. And fare thee weel, my only luve! And fare thee weel awhile! And I will come again, my luve, Though it were ten thousand mile.",
  },
];
