import Link from "next/link";
import { useState } from "react";
import { IArrayPeople, IList } from "./schema";

const PeopleList = ({ arrPeople }: IList) => {
  const [countPeople, setCountPeople] = useState<number>(1);
  const [peopleList, setPeopleList] = useState<IArrayPeople[] | []>(arrPeople);

  return (
    <>
      <h2>Personajes ({countPeople})</h2>
      {countPeople > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Planeta</th>
                <th>Primer película</th>
                <th>Especie</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {peopleList.map((person, i) => (
                <tr key={person.id}>
                  <td>{i + 1}</td>
                  <td>{person.name}</td>
                  <td>{person.homeworld.name}</td>
                  <td>{person.filmConnection.films[0].title}</td>
                  <td>
                    {person.species
                      ? person.species.name
                      : "Human: " + person.gender}
                  </td>
                  <td>
                    <Link
                    href={`/?character=${person.id}`}
                    scroll={false}
                    >
                      Ver detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null
      // <Empty style={{ color: "white", marginTop: 100 }} />
      }
    </>
  );
};

export default PeopleList;
