export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  color: string;
}

export interface HistoryState {
  textElements: TextElement[];
  images: CanvasImageData[];
}

export interface CanvasImageData {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
