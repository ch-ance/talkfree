import vurt from "../../../../vurt";
import { v4 as uuidv4 } from "uuid";
import { useVurt } from "../../../../store/useVurt";

const CreateTeamButton = () => {
  const { identity } = useVurt();
  return (
    <button
      class="rounded border-2 border-blue-900 w-full"
      onclick={async (e) => {
        e.preventDefault();
        const teamName = prompt("what's your team's name?");
        if (!teamName) return;
        console.log(identity());
        let team: any = {
          teamName,
          id: uuidv4(),
          createdBy: identity().public.verifyKey,
        };
        team.signature = await vurt.sign(team);
        console.log(team);

        const addedToIpfs = await vurt.ipfs.add(JSON.stringify(team));
        console.log("addedToIpfs", addedToIpfs);
      }}
    >
      Create a new team
    </button>
  );
};

export default CreateTeamButton;
