import styled from "@emotion/styled";
import { Entity } from "@leanscope/ecs-engine";
import tw from "twin.macro";
import { ItemNameFacet } from "../../../../app/gameFacets";
import { displayItemName } from "../../functions/displayItemName";
import { useAccuratPlayerPosition } from "../../hooks/useAccuratPlayerPosition";
import { PositionFacet } from "@leanscope/ecs-models";

const StyledSlotWrapper = styled.div<{ hasItem: boolean }>`
  ${tw` w-16 pt-4 bg-slate-200 h-16 border border-black`}
  ${({ hasItem }) => hasItem && tw`bg-slate-300 hover:bg-red-500`}
`;

const StyledItemName = styled.div`
  ${tw`mx-auto `}
`;

const StyledDropItemButton = styled.div`
  ${tw`text-green-500 hover:text-black transition-all`}
`;
interface NormalItemSlotProps {
  entity?: Entity;
}

const NormalItemSlot = (props: NormalItemSlotProps) => {
  const { entity } = props;
  const { playerPositionX, playerPositionY } = useAccuratPlayerPosition();

  const dropItem = () => {
    entity?.add(new PositionFacet({ positionX: playerPositionX - 0.5, positionY: playerPositionY, positionZ: 0 }));
  };

  return (
    <StyledSlotWrapper hasItem={!!entity}>
      <StyledItemName>{entity && displayItemName(entity?.get(ItemNameFacet)?.props.itemName)}</StyledItemName>
      {!!entity && <StyledDropItemButton onClick={dropItem}>drop</StyledDropItemButton>}
    </StyledSlotWrapper>
  );
};

export default NormalItemSlot;
