type ViteGlobModule = { default: string };

export const extractImages = (pattern: string) => {
  const allGlobs = import.meta.glob<ViteGlobModule>("./assets/**/*", {
    eager: true,
  });

  return Object.fromEntries(
    Object.entries(allGlobs).filter(([path]) => path.includes(pattern)),
  );
};

export type ImageMap = Record<string, { default: string }>;
