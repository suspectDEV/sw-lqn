import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Modal, Tabs, Tag, Avatar, Spin } from "antd";
import moment from "moment";
import { IArrayPeople } from "../model/character.schema";

// ..Components
import { PersonalInfo, Header, Cake, Grid, LoadingPage } from "./personal-info.component";
import { Film } from "./film-details.component";
import { API } from "../services/constants";

const { TabPane } = Tabs;

interface IChDetails {
  userID: string;
}

const CharacterDetails = ({ userID }: IChDetails) => {
  const router = useRouter();
  const [userData, setUserData] = useState<IArrayPeople>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    queryDetailsCharacter(userID).then((res) => {
      setUserData(res.person);
      setVisible(true);
    });
  }, [userID]);

  return (
    <>
      <Head>
        <title>Star Wars {"- " + userData?.name}</title>
        <meta name="description" content="Created for LQN." />
      </Head>
      {userData ? (
        // @ts-ignore FIXME:Review
        <Modal
          title="Character details"
          visible={visible}
          onCancel={handleModal}
          onOk={handleModal}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Personal information" key="1">
              <PersonalInfo>
                <Header>
                  <Avatar
                    size={"large"}
                    src={`https://ui-avatars.com/api/?background=108ee9&color=FFFFFF&name=${userData.name}&format=svg&rounded=true`}
                  />
                  <div className="data">
                    <h3>{userData.name}</h3>
                    <div>
                      <p>{userData.birthYear}</p>
                      <Cake title="Birthday" />
                    </div>
                  </div>
                </Header>
              </PersonalInfo>

              <Grid>
                <div>
                  <h4>Eyes color</h4>
                  <p>{userData.eyeColor}</p>
                </div>
                <div>
                  <h4>Gender</h4>
                  <p>{userData.gender}</p>
                </div>
                <div>
                  <h4>Hair color</h4>
                  <p>{userData.hairColor}</p>
                </div>
                <div>
                  <h4>Height</h4>
                  <p>{userData.height}cm</p>
                </div>
                <div>
                  <div>
                    <h4>Weight</h4>
                    <p>{userData.mass}kg</p>
                  </div>
                </div>
                <div>
                  <h4>Skin color</h4>
                  <p>{userData.skinColor}</p>
                </div>
                <div>
                  <h4>Created at</h4>
                  <p>{moment(userData.created).format("MMMM Do YYYY")}</p>
                </div>
                <div>
                  <h4>Updated at</h4>
                  <p>{moment(userData.edited).format("MMMM Do YYYY")}</p>
                </div>
              </Grid>
            </TabPane>
            <TabPane tab="Related films" key="2">
              {userData.filmConnection.films.map((film) => (
                <Film key={film.id}>
                <h3>{film.title}</h3>
                <p>
                  <strong>Director:</strong> {film.director}
                </p>
                <p>
                  <strong>Release date:</strong>{" "}
                  {moment(film.releaseDate).format("MMMM Do YYYY")}
                </p>
                <h4>Planets:</h4>
                <div>
                  {film.planetConnection.planets.map((planet) => (
                    <Tag key={planet.id} color="#108ee9">
                      {planet.name}
                    </Tag>
                  ))}
                </div>
              </Film>
              ))}
            </TabPane>
          </Tabs>
        </Modal>
      ) : (
        <LoadingPage>
          <Spin size="large" spinning />
        </LoadingPage>
      )}
    </>
  );
  function handleModal() {
    setVisible(!visible);
    router.push(
      {
        pathname: "/",
      },
      undefined,
      { scroll: false }
    );
  }
};

async function queryDetailsCharacter(userID: string) {
  const client = new ApolloClient({
    uri: API,
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
              releaseDate
              planetConnection{
                planets{
                  name
                }
              }
            }
          }
        }
      }
    `,
  });
  return data;
}

export default CharacterDetails;
