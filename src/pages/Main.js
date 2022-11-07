import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";

function Main() {
  const [selected, setSelected] = useState(null);
  const { setSelectedPost, selectedPost, postData, setOpenPost, openPost } =
    useContext(AppContext);

  const listArr = [
    {
      icon: <HiOutlineDocument size={24} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true}>
            내요요요옹
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <AiOutlineSearch size={24} />,
      path: "SEARCH",
      content: <p>111</p>,
    },
  ];

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
            key={index}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>

      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const pathArr = one.split("/").filter(Boolean);

            const data = pathArr.reduce((sum, current, index) => {
              const lastPath = pathArr.length - 1 === index;

              const target = sum.find(
                (one) =>
                  one.title === current &&
                  one.type === (lastPath ? "post" : "directory")
              );

              return lastPath ? target : target?.children;
            }, postData);

            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝{data.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );
                    setOpenPost(openPostFilter);
                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                >
                  &#215;
                </span>
              </div>
            );
          })}
        </RightHeader>
        <RightContent selected={selected}>{selectedPost}</RightContent>
      </RightWrap>
    </Wrap>
  );
}

export default Main;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320PX - 50PX)"};
  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow-x: scroll;
  background: #333;

  > div {
    width: 150px;
    min-width: 150px;
    padding: 10px;
    background: #333;
    position: relative;
    cursor: pointer;

    &.selected {
      background: #1e1e1e;
    }

    > span {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBar = styled.div`
  width: 50px;
  min-width: 50px;
  height: 100%;
  background-color: #333333;
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  background-color: #252526;
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #7a7a7a;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

const RightContent = styled.div`
  background: #1e1e1e;
  width: 100%;
  height: calc(100% - 50px);

  > div:first-child {
  }
`;
