export interface CommunityStat {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  description: string;
  isPlaceholder?: boolean;
}
