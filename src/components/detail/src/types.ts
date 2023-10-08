export interface FilterType {
  list: string;
  key?: string;
  label?: string;
}

export interface DetailItem {
  label: string;
  value: string;
  fieldName: string;
  span?: number;
  slotName?: string;
  tooltip?: string | ((...args: any) => any);
  icon?: string;
  filters?: FilterType;
}
