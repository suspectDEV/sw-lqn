import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Main } from "../styles/Home.styles";

// ..Components
import { Avatar, Fade, Subheader } from "../components/subheader";
import PeopleList from "../components/list-character";
import CharacterDetails from "../components/modal-character-details";
import { API } from "../services/constants";
import FooterComponent from "../components/footer";

interface IHome {
  arrPeople: any[];
  totalCount: number;
}

export default function Home({ arrPeople, totalCount }: IHome) {
  const initialState = arrPeople;
  const router = useRouter();
  const chID = "" + router.query.character;

  return (
    <div>
      <Head>
        <title>Star Wars - Prueba LQN</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {router.query.character && <CharacterDetails userID={chID} />}

      <Subheader>
        <h5>LQN</h5>
        <h1>Star Wars</h1>
        <Avatar />
        <Fade />
      </Subheader>

      <Main>
        <PeopleList arrCharacters={initialState} totalCount={totalCount} />
      </Main>

      <FooterComponent />
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: API,
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        allPeople {
          totalCount
          people {
            id
            name
            gender
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
      }
    `,
  });

  return {
    props: {
      arrPeople: data.allPeople.people,
      totalCount: data.allPeople.totalCount,
    },
  };
}
