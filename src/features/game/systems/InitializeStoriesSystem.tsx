import { EntityCreator } from "@leanscope/ecs-engine";
import { IdentifierFacet, StoryFacet, Tags } from "@leanscope/ecs-models";
import { Stories } from "../../../base/enums";

const InitializeStoriesSystem = () => {
  // const lsc = useContext(LeanScopeClientContext);

  // useEffect(() => {
  //   const newPlayGameStory = new Entity();
  //   lsc.engine.addEntity(newPlayGameStory);
  //   newPlayGameStory.add(new IdentifierFacet({ guid: Stories.PLAY_GAME_STORY }));
  //   newPlayGameStory.add(StoryFacet);
  //   newPlayGameStory.addTag(Tags.CURRENT);

  //   const newPauseGameStory = new Entity();
  //   lsc.engine.addEntity(newPauseGameStory);
  //   newPauseGameStory.add(new IdentifierFacet({ guid: Stories.PAUSE_GAME_STORY }));
  //   newPauseGameStory.add(StoryFacet);

  //   const newObservingInventoryStory = new Entity();
  //   lsc.engine.addEntity(newObservingInventoryStory);
  //   newObservingInventoryStory.add(new IdentifierFacet({ guid: Stories.OBSERVING_INVENTORY_STORY }));
  //   newObservingInventoryStory.add(StoryFacet);
  // }, []);

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
