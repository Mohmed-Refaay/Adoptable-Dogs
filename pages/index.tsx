import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { queryClient, getDogs } from "../src/api";
import { Grid, Card, Title, Image, Text } from "@mantine/core";
import Link from "next/link";

const Home: NextPage = () => {
  const { data } = useQuery(["dogs"], () => getDogs());

  return (
    <div>
      <Grid>
        {data?.dogs.map((f, i) => (
          <Grid.Col
            xs={12}
            md={6}
            lg={4}
            key={[f.name, i].join(":")}
            p={5}
          >
            <Link href={`/dog/${f.name}`} passHref>
              <Card>
                <Card.Section>
                  <Image
                    height={350}
                    src={f.image}
                    alt="green iguana"
                  />
                </Card.Section>
                <Title order={3}>{f.name}</Title>
                <Text>
                  {f.weight} pound {f.ageInWeeks} weeks old{" "}
                  {f.sex.toLowerCase()} {f.breed.toLowerCase()}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery(["dogs"], () => getDogs());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
