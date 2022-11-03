import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const listArr = [
  {
    icon: <HiOutlineDocument size={24} />,
    path: "post",
  },
  {
    icon: <AiOutlineSearch size={24} />,
    path: "serach",
  },
];

function Main() {
  const [selected, setSelected] = useState(null);
  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  height: 100vh;
  background: #0ef;
`;

const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background: #aaa;
`;

const IconWrap = styled.div`
  display: "flex";
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;
