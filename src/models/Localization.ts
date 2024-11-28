export type Localizer = (s: string) => string;

export type LocalizerBase = "Layer" | "Map" | "other";

export const createLocalizerInternal: (base: LocalizerBase[]) => Localizer = (
  base: LocalizerBase[]
) => {
  // TODO: implement
  return (s) => s;
};

export const createLocalizer: (base: LocalizerBase) => Localizer = (
  base: LocalizerBase
) => {
  return createLocalizerInternal([base]);
};
