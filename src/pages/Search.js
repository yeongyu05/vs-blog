import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData } = useContext(AppContext);
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Tech",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 3,
      postArr: [],
    },
  ]);

  useEffect(() => {
    const tempArr = [];

    searchTagFnc(postData);

    function searchTagFnc(nowPostDataArr) {
      //
      nowPostDataArr.forEach((nowPostData) => {
        if (nowPostData.type === "post") {
          // 게시물일 경우 처리
          nowPostData.data.tag?.forEach((tag) => {
            // 임시 데이터에 태그가 존재하는지 검사
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);

            if (tempTarget) {
              tempTarget.count += 1;
            } else {
              tempArr.push({
                tagTitle: tag,
                count: 1,
                postArr: [],
              });
            }
          });
        } else {
          // 디렉토리일 경우 처리
          nowPostData.children && searchTagFnc(nowPostData.children);
        }
      });
    }

    setTagData(tempArr);
  }, [postData]);

  return (
    <Accordion title="Tags" initialExpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag key={index}>
            {one.tagTitle}
            <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

export default Search;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.selected};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }

  > span {
    color: red;
  }
`;
