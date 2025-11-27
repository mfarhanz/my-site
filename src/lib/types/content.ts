export interface ContentItem {
  src?: string;
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  route?: string;
  callback?: () => void;
}
