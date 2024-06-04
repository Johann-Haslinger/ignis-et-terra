import styled from "@emotion/styled";
import { EntityPropsMapper } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import tw from "twin.macro";
import Player from "../player/Player";
import FullScreenCanvas from "./FullScreenCanvas";
import InitializePlayerSystem from "../../systems/InitializePlayerSystem";
import { Box } from "@react-three/drei";
import { AdditionalTags } from "../../../../base/enums";
import { ItemTypeFacet } from "../../../../app/gameFacets";
import WorldItem from "../inventory/WorldItem";
import InitializeWorldItemsSystem from "../../systems/InitializeWorldItemsSystem";

const StyledMapContainer = styled.div`
  ${tw`w-screen h-screen`}
`;

const Map = () => {
  return (
    <StyledMapContainer>
      <InitializePlayerSystem />
      <InitializeWorldItemsSystem />

      <FullScreenCanvas>
        <Box args={[5, 5, 0]} position={[0, 0, 0]}>
          <meshBasicMaterial depthTest={true} transparent color={"white"} />
        </Box>

        <EntityPropsMapper
          query={(e) => e.has(PositionFacet) && e.has(ItemTypeFacet)}
          get={[[PositionFacet, ItemTypeFacet], []]}
          onMatch={WorldItem}
        />

        <EntityPropsMapper query={(e) => e.has(AdditionalTags.PLAYER)} get={[[PositionFacet], []]} onMatch={Player} />
      </FullScreenCanvas>
    </StyledMapContainer>
  );
};

export default Map;
