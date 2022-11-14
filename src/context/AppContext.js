import React from "react";

export default React.createContext({
  selectedPost: "",
  setSelectedPost: () => {},

  openPost: [],
  setOpenPost: () => {},

  // 게시물 데이터
  postData: [],

  // 테마 관련
  theme: "",
  setTheme: () => {},

  // 현재 선택된 태그
  selectedTag: null,
  setSelectedTag: () => {},
});
