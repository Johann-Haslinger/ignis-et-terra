import styled from "@emotion/styled";
import { EntityPropsMapper } from "@leanscope/ecs-engine";
import tw from "twin.macro";
import { ItemNameFacet, ItemNameProps } from "../../../../app/gameFacets";
import { AdditionalTags } from "../../../../base/enums";
import { displayItemName } from "../../functions/displayItemName";

const StyledNotificationWrapper = styled.div`
  ${tw`w-full h-10 bg-black text-white`}
`;

const Notification = (props: ItemNameProps) => {
  const { itemName } = props;
  return <StyledNotificationWrapper>{displayItemName(itemName)}</StyledNotificationWrapper>;
};

const StyledNotificationsContainer = styled.div`
  ${tw`fixed z-40 space-y-2 right-10 bottom-10 h-fit flex flex-wrap w-60 items-end`}
`;

const CollectItemNotifications = () => {
  return (
    <StyledNotificationsContainer>
      <EntityPropsMapper
        query={(e) => e.has(AdditionalTags.NOTIFICATION) && e.has(ItemNameFacet)}
        get={[[ItemNameFacet], []]}
        onMatch={Notification}
      />
    </StyledNotificationsContainer>
  );
};

export default CollectItemNotifications;
