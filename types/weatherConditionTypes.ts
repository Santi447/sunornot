type weatherConditionProps = {
  id?: string;
  icon?: string;
  label?: string;
  value?: string | number;
  unit?: string;
};
type weatherConditionListProps = {
  data?: weatherConditionProps[];
};

export type { weatherConditionProps, weatherConditionListProps  };