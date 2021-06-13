import type { Row } from "./Row";

export interface TitlePack {
  type: "title";
  rows: [Row];
}

export interface Title {
  type: "title";
  text: string;
}

export const convertToTitle = (pack: TitlePack): Title => {
  return {
    type: "title",
    text: pack.rows[0].text,
  };
};
