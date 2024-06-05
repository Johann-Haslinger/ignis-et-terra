import styled from "@emotion/styled";
import { EntityPropsMapper } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import tw from "twin.macro";
import { ItemTypeFacet } from "../../../../app/gameFacets";
import Inventory from "../inventory/Inventory";
import WorldItem from "../inventory/WorldItem";
import Player from "../player/Player";
import FullScreenCanvas from "./FullScreenCanvas";

const StyledMapContainer = styled.div`
  ${tw`w-screen h-screen`}
`;

const Map = () => {
  return (
    <StyledMapContainer>
      <FullScreenCanvas>
        <Box args={[5, 5, 0]} position={[0, 0, 0]}>
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
      </FullScreenCanvas>

      <Inventory />
    </StyledMapContainer>
  );
};

export default Map;
