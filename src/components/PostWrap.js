import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";

function PostWrap({ path, title, isClose }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(path);
    if (openPost.includes(path)) return;
    setOpenPost([...openPost, path]);
  }

  return (
    <PostWrapStyled
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      {
        <span
          className={isClose && selectedPost === path ? "visible" : ""}
          onClick={(e) => {
            e.stopPropagation();
            const openPostFilter = openPost.filter((one) => one !== path);
            setOpenPost(openPostFilter);
            setSelectedPost(
              openPostFilter.length !== 0 ? openPostFilter[0] : null
            );
          }}
        >
          &#215;
        </span>
      }
      &nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </PostWrapStyled>
  );
}

export default PostWrap;

const PostWrapStyled = styled.div`
  padding: 5px 0;
  cursor: pointer;
  position: relative;

  &:not(.selected):hover {
    background: ${({theme}) => theme.color.hover};
  }

  &.selected {
    background: ${({theme}) => theme.color.selected};
  }

  &:hover > span {
    display: block;
  }

  > span {
    position: absolute;
    left: 5px;
    top: 3.5px;
    display: none;

    &.visible {
      display: block;
    }
  }
`;
