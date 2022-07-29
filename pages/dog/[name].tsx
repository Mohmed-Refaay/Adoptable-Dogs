import type { NextPage, GetServerSideProps } from "next";
import { dehydrate, useQuery } from "@tanstack/react-query";
import { queryClient, getDogByName } from "../../src/api";
import { Grid, Card, Title, Image, Text } from "@mantine/core";
import Link from "next/link";

const Dog: NextPage<{ name: string }> = ({ name }) => {
  const { data } = useQuery(["dog"], () =>
    getDogByName({ name: name }),
  );

  return (
    <div>
      <Image
        height={350}
        src={data?.dog?.image}
        width={400}
        alt="green iguana"
      />

      <Title order={3} my={5}>
        {data?.dog?.name}
      </Title>
      {data?.dog?.description.map((d) => (
        <Text dangerouslySetInnerHTML={{ __html: d }} />
      ))}

      <Text my={5}>
        {data?.dog?.weight} pound {data?.dog?.ageInWeeks} weeks old{" "}
        {data?.dog?.sex.toLowerCase()}{" "}
        {data?.dog?.breed.toLowerCase()}
      </Text>
    </div>
  );
};

export default Dog;

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  await queryClient.prefetchQuery(["dog"], () =>
    getDogByName({
      name: params?.name as string,
    }),
  );

  return {
    props: {
      name: params?.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

type Props = ReturnType<typeof getServerSideProps>;
