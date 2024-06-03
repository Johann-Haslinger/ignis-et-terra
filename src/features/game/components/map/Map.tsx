import styled from "@emotion/styled";
import { EntityPropsMapper } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import tw from "twin.macro";
import { AdditionalTags } from "../../../../base/constants";
import Player from "../player/Player";
import FullScreenCanvas from "./FullScreenCanvas";
import InitializePlayerSystem from "../../systems/InitializePlayerSystem";

const StyledMapContainer = styled.div`
  ${tw`w-screen h-screen`}
`;

const Map = () => {
  return (
    <StyledMapContainer>
      <InitializePlayerSystem />
      
      <FullScreenCanvas>
        <EntityPropsMapper query={(e) => e.has(AdditionalTags.PLAYER)} get={[[PositionFacet], []]} onMatch={Player} />
      </FullScreenCanvas>
    </StyledMapContainer>
  );
};

export default Map;
