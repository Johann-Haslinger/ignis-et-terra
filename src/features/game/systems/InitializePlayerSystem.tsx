import { EntityCreator } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet, Tags } from "@leanscope/ecs-models";
import { PLAYER_START_POSITION } from "../../../base/constants";
import { AdditionalTags } from "../../../base/enums";

const InitializePlayerSystem = () => {
  return (
    <EntityCreator
      facets={[
        new PositionFacet({ positionX: PLAYER_START_POSITION.x, positionY: PLAYER_START_POSITION.y, positionZ: 0 }),
        new IdentifierFacet({ guid: "player" }),
      ]}
      tags={[Tags.CURRENT, AdditionalTags.PLAYER]}
    />
  );
};

export default InitializePlayerSystem;
