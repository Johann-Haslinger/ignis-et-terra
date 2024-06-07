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
import { usePlayer } from "../../hooks/usePlayer";

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
  ${tw`w-screen flex items-center h-screen fixed top-0 left-0  bg-black bg-opacity-50`}
`;

const StyledInventoryWrapper = styled.div`
  ${tw` w-[30rem] mx-auto  bg-white p-2 h-fit`}
`;

const StyledInventorySpacer = styled.div`
  ${tw`w-full`}
`;

const StyledInventoryColumn = styled.div`
  ${tw`grid grid-cols-2 gap-4   w-36  h-fit`}
`;

const StyledManaCountWrapper = styled.div`
  ${tw`flex mx-auto bg-white w-32 h-10 mb-2 items-center`}
`;

const StyledManaPoint = styled.div`
  ${tw`w-4 h-4 bg-blue-500 rounded-full`}
`;



const Inventory = () => {
  const { isInventoryOpen } = useInventory();
  const { inventoryRef } = useInventoryRef();
  const [inventoryItemEntities] = useEntities((e) => e.has(ItemTypeFacet) && !e.has(PositionFacet));
  const { playerManaCount } = usePlayer();

  return (
    isInventoryOpen && (
      <StyledInventoryContainer>
        <StyledInventorySpacer>
          <StyledManaCountWrapper>
            Mana:
            {Array.from({ length: playerManaCount || 0 }).map((_, idx) => (
              <StyledManaPoint key={idx} />
            ))}
          </StyledManaCountWrapper>
          <StyledInventoryWrapper ref={inventoryRef}>
            <StyledInventoryColumn>
              {Array.from({ length: 8 }).map((_, idx) => (
                <NormalItemSlot key={idx} entity={inventoryItemEntities[idx]} />
              ))}
            </StyledInventoryColumn>
          </StyledInventoryWrapper>
        </StyledInventorySpacer>
      </StyledInventoryContainer>
    )
  );
};

export default Inventory;
