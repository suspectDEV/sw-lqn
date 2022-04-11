import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Modal, Tabs, Tag, Divider, Avatar } from "antd";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IArrayPeople } from "./characters/schema";
import moment from "moment"

const { TabPane } = Tabs;

interface IChDetails {
  userID: string;
}

// IArrayPeople

const CharacterDetails = ({ userID }: IChDetails) => {
  const router = useRouter();
  const [userData, setUserData] = useState<IArrayPeople>();

  useEffect(() => {
    queryDetailsCharacter(userID).then((res) => {
      setUserData(res.person);
    });
  }, [userID]);

  return (
    <>
      {userData && (
        // @ts-ignore FIXME:Review
        <Modal
          title="Character details"
          visible={true}
          onCancel={() => router.back()}
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
                  <p>{moment(userData.created).format('MMMM Do YYYY')}</p>
                </div>
                <div>
                  <h4>Updated at</h4>
                  <p>{moment(userData.edited).format('MMMM Do YYYY')}</p>
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
                    <strong>Release date:</strong> {moment(film.releaseDate).format('MMMM Do YYYY')}
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

const Film = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #d1d1d1;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
  p {
    color: #555555;
  }

  p > strong {
    font-weight: 600;
    color: #777777;
  }

  h4 {
    margin-top: 0.5rem;
    font-weight: 600;
  }
`;

const PersonalInfo = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  .data {
    margin-left: 1rem;

    h3 {
      margin: 0;
      font-weight: 600;
    }
    p {
      margin: 0;
      display: inline-block;
    }
  }
`;

const Cake = styled.div`
  background-image: url("https://www.svgrepo.com/show/20280/birthday-cake.svg");
  width: 15px;
  height: 15px;
  background-size: cover;
  opacity: 0.4;
  cursor: pointer;
  display: inline-block;
  margin-left: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  h4{
    margin:0;
    font-weight: 600;
  }
`;

export default CharacterDetails;
