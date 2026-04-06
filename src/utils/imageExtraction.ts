import METADATA from "@/data/media/gallery-images.json";
import type { ViteGlobModule } from "@/pages/Gallery/Gallery";

type MediaCategory = "brasserie" | "normal";

type Media = {
  category: MediaCategory;
  src: string;
  label: string;
};

const NORMAL_IMAGES = import.meta.glob<ViteGlobModule>(
  "@/assets/NORMAL_WEBP/*.webp",
  { eager: true },
);

const BRASSERIE_WEBP = import.meta.glob<ViteGlobModule>(
  "@/assets/BRASSERIE_WEBP/*.webp",
  { eager: true },
);

const globs = { ...BRASSERIE_WEBP, ...NORMAL_IMAGES };

export const ALL_MEDIA: Media[] = Object.entries(globs).map(([path, mod]) => {
  const filename = path.split("/").at(-1) ?? "";
  // Match by just the filename since category determines the folder
  const metadata = METADATA.find((m) => {
    const mFilename = m.src.split("/").at(-1);
    return mFilename === filename;
  });

  console.log({ metadata });

  return {
    src: mod.default,
    label: metadata?.label ?? "",
    category: (metadata?.category as MediaCategory) ?? "normal",
  };
});
