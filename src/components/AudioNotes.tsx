import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioNote {
  id: string;
  title: string;
  filename: string;
  duration?: string;
}

// Define your audio notes here - user will add mp3 files to public folder
const audioNotes: AudioNote[] = [
  { id: "1", title: "VOICE LOG 1", filename: "day-1.mp3", duration: "1:02" },
  { id: "2", title: "VOICE LOG 2", filename: "day-2.mp3", duration: "1:10" },
  { id: "3", title: "VOICE LOG 3", filename: "day-3.mp3", duration: "1:00" },
  { id: "4", title: "VOICE LOG 4", filename: "day-4.mp3", duration: "1:41" },
  { id: "5", title: "VOICE LOG 5", filename: "day-5.mp3", duration: "0:40" },
  { id: "6", title: "VOICE LOG 6", filename: "day-6.mp3", duration: "0:40" },
];

export const AudioNotes = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  // Pause all other audio when one starts playing
  const handlePlayPause = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (currentlyPlaying === id) {
      // Pause current audio
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Pause any currently playing audio
      if (currentlyPlaying) {
        const currentAudio = audioRefs.current[currentlyPlaying];
        if (currentAudio) {
          currentAudio.pause();
        }
      }
      // Play selected audio
      audio.play();
      setCurrentlyPlaying(id);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      Object.keys(audioRefs.current).forEach((id) => {
        const audio = audioRefs.current[id];
        if (audio && !audio.paused) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          setProgress((prev) => ({ ...prev, [id]: progressPercent }));
        }
      });
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-dvh pt-10 p-6 bg-gradient-to-br from-pink-50 via-red-50 to-pink-100">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-6xl text-[#c8102e] mb-12 text-center"
          style={{ fontFamily: "Love" }}
        >
          Audio Notes
        </h2>

        <div className="space-y-6">
          {audioNotes.map((note) => {
            const isPlaying = currentlyPlaying === note.id;
            const currentProgress = progress[note.id] || 0;

            return (
              <div
                key={note.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-200"
              >
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => handlePlayPause(note.id)}
                    className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#c8102e] to-[#9e0d24] text-white flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" fill="white" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" fill="white" />
                    )}
                  </button>

                  {/* Audio Info */}
                  <div
                    style={{ fontFamily: "Oswald" }}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl tracking-wider font-semibold text-gray-800 truncate">
                        {note.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-sm">{note.duration}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c8102e] to-pink-500 transition-all duration-100 rounded-full"
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hidden Audio Element */}
                <audio
                  ref={(el) => {
                    audioRefs.current[note.id] = el;
                  }}
                  src={`/audio/${note.filename}`}
                  onEnded={() => {
                    setCurrentlyPlaying(null);
                    setProgress((prev) => ({ ...prev, [note.id]: 0 }));
                  }}
                  onPause={() => {
                    if (currentlyPlaying === note.id) {
                      setCurrentlyPlaying(null);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
