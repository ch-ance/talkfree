import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {},
}));

interface IBlog {}

const BlogPost = ({}) => {
  const classes = useStyles();
  return <Container className={classes.container}>h3loo</Container>;
};

export default BlogPost;
