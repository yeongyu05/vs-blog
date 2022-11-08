import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";

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
          <Accordion title="OPEN POSTS" isBold={true} initialExpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);
              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true} initialExpanded={true}>
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
            const data = getPostOne(postData, one);

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
  background: ${({theme}) => theme.color.secondary};

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }

  > div {
    width: 150px;
    min-width: 150px;
    padding: 10px;
    background: ${({theme}) => theme.color.secondary};
    position: relative;
    cursor: pointer;

    &.selected {
      background: ${({theme}) => theme.color.primary};
    }

    &:not(.selected) > span {
      display: none;
    }

    &:hover > span {
      display: block;
    }

    > span {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const RightContent = styled.div`
  background: ${({theme}) => theme.color.primary};
  width: 100%;
  height: calc(100% - 50px);

  > div:first-child {
  }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  border-left: ${({ theme, selected }) => `${selected ? 2 : 0}px solid ${theme.color.text}`};

  > svg {
    color: ${({ theme, selected }) =>selected ? theme.color.text : "#7a7a7a"};}
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBar = styled.div`
  width: 50px;
  min-width: 50px;
  height: 100%;
  background: ${({theme}) => theme.color.third};
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100%;
  background: ${({theme}) => theme.color.secondary};
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #7c7c7c;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;
