import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BlogPost from "./BlogPost";

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.main,
    marginTop: 0,
    paddingTop: 50,
    color: "whitesmoke",
  },
  postContainer: {
    border: "2px solid green",
    borderRadius: "5px",
    padding: "25px",
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid gray",
    alignItems: "flex-end",
    paddingBottom: 15,
  },
  title: {},
  date: {},
  bodyText: {
    marginTop: 25,
    letterSpacing: "3px",
    fontSize: "1.4rem",
  },
}));

const Blog = () => {
  const classes = useStyles();

  const IntroductionPost = () => {
    return (
      <Container className={classes.postContainer}>
        <div className={classes.postHeader}>
          <Typography className={classes.title} variant="h2">
            Introduction
          </Typography>
          <Typography className={classes.date}>Sep 10, 2021</Typography>
        </div>
        <Typography className={classes.bodyText} variant="body1">
          Hi! Welcome to the developer journal for TalkFree.
          <br />
          <br />
          My name is Chance, and I'm creating a distributed, real-time chat
          application called TalkFree. The goal of this project is to create a
          space that is resistant to censorship, free to use, and provides a
          user experience that can compete with the big dogs like Discord and
          WhatsApp.
          <br />
          <br />
          Let's talk tech! Here's a summary of the technologies used in
          TalkFree, as well as some notes regarding why I picked this particular
          stack.
          <br />
          <ul>
            <li>React with Typescript</li>
            <ol>
              <li>
                I'm familiar with it, and Typescript's developer experience is
                amazing
              </li>
              <li>
                Runs in the browser and on native apps so it's accessible
                anywhere
              </li>
              <li>
                It should be fast enough for our needs. I'm considering moving
                to SolidJS, a similar UI framework to React that has increased
                performance benefits, but we'll talk more about that if it
                becomes necessary
              </li>
            </ol>
            <li>GunJS</li>
            <ol>
              <li>Easy to use API</li>
              <li>
                Lets us manage data peer-to-peer without a centralized server
              </li>
              <li>
                Amazing community that is super helpful whenever I have
                questions
              </li>
            </ol>
            <li>Material-UI</li>
            <ol>
              <li>Easy to use and highly customizable</li>
              <li>It's beautiful!</li>
            </ol>
          </ul>
          <br />
          And that's about it! I'm also using React-Router, but that's pretty
          standard for React apps so there's not a lot to say about that. I hope
          to keep the tech stack lean so that new developers can easily pick up
          the tech, and if I can keep the bundle size low that is of course a
          great benefit.
        </Typography>
      </Container>
    );
  };

  const WhereWereAtPost = () => {
    return (
      <Container className={classes.postContainer}>
        <div className={classes.postHeader}>
          <Typography className={classes.title} variant="h2">
            Where We're Currently At
          </Typography>
          <Typography className={classes.date}>Sep 10, 2021</Typography>
        </div>
        <Typography className={classes.bodyText} variant="body1">
          Now that we've talked a bit about the project, let me catch you up
          with the current status of the app.
          <br />
          <br />
          So far, there's a very rudimentary chat system set up. You can create
          channels and send messages to them, as well as create users. However,
          every channel is currently public (and every user is in every
          channel), so that's one of the first things that needs fixed before we
          get any real users.
          <br />
          <br />I plan to have 3 "modes" in TalkFree: Public, Private, and Spy.
          <br />
          <br />
          Public is just like it sounds. All messages are public, unencrypted,
          and stored in easily accessible Gun Nodes. Public Channels should be
          ideal for certain community chats, where you want as much exposure as
          possible.
          <br />
          <br />
          Private means messages are encrypted end-to-end. They are still stored
          in Gun Nodes, but to anyone without a particular private key, they
          will be completely unintelligable. Private Channels should work well
          for group chats with friends, workplaces, or anyone that isn't super
          fond of all of their communication happening in the open.
          <br />
          <br />
          Spy Mode is where things get a little interesting. In a Spy Channel,
          messages are not saved anywhere other than the user's device, and they
          are relayed entirely using WebRTC. There is end-to-end encryption, and
          no key exchange is implemented. This means messages may take a second
          longer to send/receive, but you don't have to worry about anyone
          finding a flaw in Diffie-Helman and breaking the security of your
          chat. Long term I would also like to implement the Whisper protocol,
          where messages are relayed through a Tor-like system, which obfuscates
          who is sending and receiving the message. Spy Channels are meant for
          cases where a person or group is potentially in danger if their
          messages are exposed, such as whistleblowers and people living under
          oppressive regimes.
          <br />
          <br />
          The current problem I'm working to fix is the issue of pagination, or
          how to load and render messages in the correct order. Gun takes care
          of this pretty well on its own, but there is currently a bug with
          reverse lexical queries that prevents you from fetching the most
          recent data first. Messages are eventually sorted, but this can take a
          few seconds and will only become a larger problem when there are more
          messages in a channel.
          <br />
          <br />
          Luckily, someone in the Gun community discord helped me find a
          solution. All we need to do is build an index table on the user's
          device, and store the timestamp of the message as well as the key to
          find it in Gun.
          <br />
          <br />
          We query our index table, find which order to fetch the data from Gun,
          and just like that we have reverse sorting working similarly to if it
          was done on the server.
        </Typography>
      </Container>
    );
  };

  return (
    <Container className={classes.container}>
      <IntroductionPost />
      <div style={{ marginTop: "25px", marginBottom: "25px" }} />
      <WhereWereAtPost />
      <div style={{ paddingBottom: "100px" }} />
    </Container>
  );
};

export default Blog;
