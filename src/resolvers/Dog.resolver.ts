import { Resolver, Query, Arg } from "type-graphql";
import { Dog } from "../schema/Dog.schema";
import dogs from "../schema/dogs.json";

@Resolver()
export class DogResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return dogs;
  }

  @Query(() => Dog, { nullable: true })
  dog(@Arg("name") name: string): Dog | undefined {
    return dogs.find((dog) => dog.name === name);
  }
}
