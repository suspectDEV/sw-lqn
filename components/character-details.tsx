import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";
import { IArrayPeople } from "./people/schema";

interface IChDetails {
  userID: string;
}

// IArrayPeople

const CharacterDetails = ({ userID }: IChDetails) => {
  const [userData, setUserData] = useState<IArrayPeople>();
  useEffect(() => {
    queryDetailsCharacter(userID).then((res) => {
      setUserData(res.person);
    });
  }, [userID]);

  return (
    <>
      {userData && (
        <div>
          <h3>{userData.name}</h3>
          <p>{userData.birthYear}</p>
          <p>{userData.eyeColor}</p>
          <p>{userData.gender}</p>
          <p>{userData.hairColor}</p>
          <p>{userData.height}</p>
          <p>{userData.mass}</p>
          <p>{userData.skinColor}</p>
          <p>{userData.created}</p>
          <p>{userData.edited}</p>
        </div>
      )}
    </>
  );
};

async function queryDetailsCharacter(userID: string) {
  const client = new ApolloClient({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      {
        person(id: "${userID}") {
          id
          name
          birthYear
          eyeColor
          gender
          hairColor
          height
          mass
          skinColor
          created
          edited
          species {
            id
            name
          }
          homeworld {
            id
            name
          }
          filmConnection {
            films {
              title
              director
            }
          }
        }
      }
    `,
  });
  return data;
}

export async function getStaticProps() {
  return {
    props: {
      saludo: "Hola local",
    },
  };
}

export default CharacterDetails;
