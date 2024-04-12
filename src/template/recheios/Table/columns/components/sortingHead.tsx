import * as S from "./styles";

import { Button } from "@/components/ui/button";

interface SortingHeadProps {
  label: string;
  toggleSorting: () => void;
}
export const SortingHead = ({ label, toggleSorting }: SortingHeadProps) => {
  return (
    <Button variant="ghost" onClick={toggleSorting}>
      {label}
      <S.headArrowUpDownIcon />
    </Button>
  );
};
