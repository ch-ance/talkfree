import CreateTeamButton from "./CreateTeamButton";
import JoinTeamButton from "./JoinTeamButton";

const NoTeamsFound = () => {
  return (
    <ul class="text-center">
      <li class="mb-4">
        <CreateTeamButton />
      </li>
      <li>
        <JoinTeamButton />
      </li>
    </ul>
  );
};

export default NoTeamsFound;
