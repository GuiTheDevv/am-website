import Title from "./components/atoms/title";
import Container from "./components/atoms/container";
import Subtitle from "./components/atoms/subtitle";
import BodyText from "./components/atoms/bodyText";
import Card from "./components/atoms/card";

export default function Home() {
  return (
    <Container>
      <Title>Title</Title>
      <Subtitle>Subtitle</Subtitle>
      <BodyText>Body Text</BodyText>
      <Card>
        <BodyText className="text-black">Card </BodyText>
      </Card>
    </Container>
  );
}
