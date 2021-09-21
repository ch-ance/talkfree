import { createSignal, For } from "solid-js";
import NoTeamsFound from "./NoTeamsFound/NoTeamsFound";
import TeamListItem from "./TeamsListItem";

const TeamsList = () => {
  const [teams, setTeams] = createSignal([]);

  return (
    <ul class="overflow-y-auto">
      <For each={teams()} fallback={<NoTeamsFound />}>
        {(team) => (
          <TeamListItem
            teamName={team.teamName}
            channelGroups={team.channelGroups}
          />
        )}
      </For>
    </ul>
  );
};
export default TeamsList;
