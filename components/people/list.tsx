import { Button } from "antd";
import styled from "styled-components"
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
          <MyTable>
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
                      <Button type="primary">
                      Ver detalles
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </MyTable>
        </>
      ) : null
      // <Empty style={{ color: "white", marginTop: 100 }} />
      }
    </>
  );
};


export const MyTable = styled.table`
width: 100%;
color: white;

th {
  text-align: left;
  color: #ffffff66;
}

td,
th {
  height: 40px;
}

td:first-child,
th:first-child {
  padding-left: 10px;
}

tbody {
  tr {
    transition: 300ms;
    border-radius: 3px;

    &:not(:last-child) {
      border-bottom: 1px solid #e1e1e11a;
    }

    &:hover {
      background-color: white;
      color: #1890ff;
    }
    .anticon {
      cursor: pointer;
      &:last-child {
        margin-left: 10px;
      }
    }

    .edit:hover {
      color: green;
    }

    .delete:hover {
      color: red;
    }
  }
}
@media (max-width: 810px) {
  th:nth-child(5) {
    display: none;
  }
  td:nth-child(5) {
    display: none;
  }
}
@media (max-width: 575px) {
  th:nth-child(4) {
    display: none;
  }
  td:nth-child(4) {
    display: none;
  }
}
`;

export default PeopleList;
