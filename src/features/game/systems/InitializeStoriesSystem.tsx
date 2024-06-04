import { EntityCreator } from "@leanscope/ecs-engine";
import { IdentifierFacet, StoryFacet, Tags } from "@leanscope/ecs-models";
import { Stories } from "../../../base/enums";

const InitializeStoriesSystem = () => {
  return (
    <div>
      <EntityCreator
        facetClasses={[StoryFacet]}
        facets={[
          new IdentifierFacet({
            guid: Stories.PLAY_GAME_STORY,
            displayName: Stories.PLAY_GAME_STORY,
          }),
        ]}
        tags={[Tags.CURRENT]}
      />
      <EntityCreator
        facetClasses={[StoryFacet]}
        facets={[
          new IdentifierFacet({
            guid: Stories.PAUSE_GAME_STORY,
            displayName: Stories.PAUSE_GAME_STORY,
          }),
        ]}
      />
      <EntityCreator
        facetClasses={[StoryFacet]}
        facets={[
          new IdentifierFacet({
            guid: Stories.OBSERVING_INVENTORY_STORY,
            displayName: Stories.OBSERVING_INVENTORY_STORY,
          }),
        ]}
      />
    </div>
  );
};

export default InitializeStoriesSystem;
