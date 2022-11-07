import React from "react";

export default React.createContext({
  selectedPost: "",
  setSelectedPost: () => {},

  openPost: [],
  setOpenPost: () => {},

  // 게시물 데이터
  postData: [],
});
