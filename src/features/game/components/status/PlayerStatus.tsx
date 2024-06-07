import tw from "twin.macro";
import styled from "styled-components";
import { usePlayer } from "../../hooks/usePlayer";

const StyledPlayerStatusWrapper = styled.div`
  ${tw`fixed space-y-2 top-0 left-0 `}
`;
const StyledHealthPoint = styled.div<{ isFull: boolean }>`
  ${tw`w-8 h-8`}
 background-color: ${({ isFull }) => (isFull ? "red" : "gray")};
`;

const StyledManaPoint = styled.div`
  ${tw`w-4 h-4  rounded-full`}
  background-color: blue;
`;

const StyledHealhPointsWrapper = styled.div`
  ${tw`flex space-x-2`}
`;

const StyledManaPointsWrapper = styled.div`
  ${tw`flex space-x-1`}
`;

const PlayerStatus = () => {
  const { playerHealthCount, playerManaCount, plaxerMaxHealthCount } = usePlayer();

  return (
    <StyledPlayerStatusWrapper>
      <StyledHealhPointsWrapper>
        {Array.from({ length: plaxerMaxHealthCount || 0 }).map((_, idx) => (
          <StyledHealthPoint isFull={playerHealthCount && playerHealthCount >= idx + 1 ? true : false} key={idx} />
        ))}
      </StyledHealhPointsWrapper>

      <StyledManaPointsWrapper>
        {Array.from({ length: playerManaCount || 0 }).map((_, idx) => (
          <StyledManaPoint key={idx} />
        ))}
      </StyledManaPointsWrapper>
    </StyledPlayerStatusWrapper>
  );
};

export default PlayerStatus;
