import styled from "@emotion/styled";
import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { useEntities } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import { useContext, useEffect, useRef } from "react";
import tw from "twin.macro";
import { ItemTypeFacet } from "../../../../app/gameFacets";
import { Stories } from "../../../../base/enums";
import { useInventory } from "../../hooks/useInventory";
import NormalItemSlot from "./NormalItemSlot";

const useInventoryRef = () => {
  const lsc = useContext(LeanScopeClientContext);
  const inventoryRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (inventoryRef.current && !inventoryRef.current.contains(event.target as Node)) {
      lsc.stories.transitTo(Stories.PLAY_GAME_STORY);
    }
  };

  const handleKeyDown = () => lsc.stories.transitTo(Stories.PLAY_GAME_STORY);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { inventoryRef };
};

const StyledInventoryContainer = styled.div`
  ${tw`w-screen flex items-center h-screen fixed top-0 left-0 bg-black bg-opacity-50`}
`;

const StyledInventoryWrapper = styled.div`
  ${tw` w-[30rem] mx-auto  bg-white p-2 h-fit`}
`;

const StyledInventoryColumn = styled.div`
  ${tw`grid grid-cols-2 gap-4   w-36  h-fit`}
`;

const Inventory = () => {
  const { isInventoryOpen } = useInventory();
  const { inventoryRef } = useInventoryRef();
  const [inventoryItemEntities] = useEntities((e) => e.has(ItemTypeFacet) && !e.has(PositionFacet));

  return (
    isInventoryOpen && (
      <StyledInventoryContainer>
        <StyledInventoryWrapper ref={inventoryRef}>
          <StyledInventoryColumn>
            {Array.from({ length: 8 }).map((_, idx) => (
              <NormalItemSlot key={idx} entity={inventoryItemEntities[idx]} />
            ))}
          </StyledInventoryColumn>
        </StyledInventoryWrapper>
      </StyledInventoryContainer>
    )
  );
};

export default Inventory;
