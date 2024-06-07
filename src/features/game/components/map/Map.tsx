import styled from "@emotion/styled";
import { EntityPropsMapper } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import tw from "twin.macro";
import { DirectionFacet, ItemTypeFacet } from "../../../../app/gameFacets";
import Inventory from "../inventory/Inventory";
import WorldItem from "../inventory/WorldItem";
import Player from "../player/Player";
import FullScreenCanvas from "./FullScreenCanvas";
import WorldItemsCollisionWithPlayerSystem from "../../systems/WorldItemsCollisionWithPlayerSystem";
import { AdditionalTags } from "../../../../base/enums";
import UpdateFireballPositionSystem from "../../systems/UpdateFireballPositionSystem";
import Fireball from "../player/Fireball";
import PlayerStatus from "../status/PlayerStatus";
import CollectItemNotifications from "../status/CollectItemNotification";

const StyledMapContainer = styled.div`
  ${tw`w-screen h-screen`}
`;

const Map = () => {
  return (
    <StyledMapContainer>
      <WorldItemsCollisionWithPlayerSystem />
      <FullScreenCanvas>
        <UpdateFireballPositionSystem />

        <Box args={[16, 16, 0]} position={[0, 0, 0]}>
          <meshBasicMaterial depthTest={true} transparent color={"white"} />
        </Box>

        <EntityPropsMapper
          query={(e) => e.has(PositionFacet) && e.has(ItemTypeFacet)}
          get={[[PositionFacet, ItemTypeFacet], []]}
          onMatch={WorldItem}
        />

        <EntityPropsMapper
          query={(e) => e.get(IdentifierFacet)?.props.guid == "player"}
          get={[[PositionFacet], []]}
          onMatch={Player}
        />

        <EntityPropsMapper
          query={(e) => e.has(AdditionalTags.FIREBALL)}
          get={[[PositionFacet, DirectionFacet], []]}
          onMatch={Fireball}
        />
      </FullScreenCanvas>
      <PlayerStatus />
      <CollectItemNotifications />
      <Inventory />
    </StyledMapContainer>
  );
};

export default Map;
