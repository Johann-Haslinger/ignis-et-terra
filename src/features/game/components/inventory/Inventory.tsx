import styled from "@emotion/styled";
import { useEntities } from "@leanscope/ecs-engine";
import tw from "twin.macro";
import { ItemNameFacet, ItemTypeFacet } from "../../../../app/gameFacets";
import { useInventory } from "../../hooks/useInventory";
import { PositionFacet } from "@leanscope/ecs-models";
import { displayItemName } from "../../functions/displayItemName";

const StyledInventoryContainer = styled.div`
  ${tw`w-screen flex items-center h-screen fixed top-0 left-0 bg-black bg-opacity-50`}
`;

const StyledInventoryWrapper = styled.div`
  ${tw` w-96 mx-auto  bg-white  h-60`}
`;

const Inventory = () => {
  const { isInventoryOpen } = useInventory();
  const [inventoryItemEntities] = useEntities((e) => e.has(ItemTypeFacet) && !e.has(PositionFacet));

  return (
    isInventoryOpen && (
      <StyledInventoryContainer>
        <StyledInventoryWrapper>
          Inventory
          {inventoryItemEntities.map((item, idx) => (
            <div key={idx}>{displayItemName(item.get(ItemNameFacet)?.props.itemName)}</div>
          ))}
        </StyledInventoryWrapper>
      </StyledInventoryContainer>
    )
  );
};

export default Inventory;
