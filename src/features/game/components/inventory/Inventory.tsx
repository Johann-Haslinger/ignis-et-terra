import styled from "@emotion/styled";
import tw from "twin.macro";
import { useInventory } from "../../hooks/useInventory";

const StyledInventoryContainer = styled.div`
  ${tw`w-screen flex items-center h-screen fixed top-0 left-0 bg-black bg-opacity-50`}
`;

const StyledInventoryWrapper = styled.div`
  ${tw` w-96 mx-auto  bg-white  h-60`}
`;

const Inventory = () => {
  const { isInventoryOpen } = useInventory();

  return (
    isInventoryOpen && (
      <StyledInventoryContainer>
        <StyledInventoryWrapper>Inventory</StyledInventoryWrapper>
      </StyledInventoryContainer>
    )
  );
};

export default Inventory;
