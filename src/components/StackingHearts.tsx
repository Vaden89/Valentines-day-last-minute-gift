import { Heart } from "./Heart";

export function StackingHearts() {
  return (
    <>
      <Heart color="#FF8896" className="w-full" />
      <Heart color="black" className="w-2/3" />
      <Heart color="#FF3334" className="w-1/3" />
    </>
  );
}
