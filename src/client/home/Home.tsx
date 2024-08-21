import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import apt from "../static/images/apt.jpg";
const CardStyle = styled("div")(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(5),
}));

const Title = styled("div")(({ theme }) => ({
  padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
    2
  )}px`,
  color: theme.palette.secondary.main,
}));

const Media = styled("div")(({ theme }) => ({
  minHeight: 400,
  image: { apt },
  title: "Unicorn Bicycle",
}));

export function Home() {
  return (
    <CardStyle>
      <Card>
        <Title>
          <Typography variant="h6">Home Page</Typography>
        </Title>
        <Media>
          <CardMedia image={apt} component="img" />
        </Media>

        <CardContent>
          <Typography variant="body2" component="p">
            Where Neighbors Come Together
          </Typography>
        </CardContent>
      </Card>
    </CardStyle>
  );
}
