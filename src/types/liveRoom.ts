export interface LiveRoomListSearchParams {
  status: number | undefined;
  title: string;
  userId: number | undefined;
  page: number;
  limit: number;
}

export interface LiveRoom {
  id: number;
  status: number;
  userInfo: {
    id: number;
    avatar: string;
    nickname: string;
  };
  title: string;
  cover: string;
  views: number;
  praiseNumber: number;
  noticeTime: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface LiveRoomListResult {
  list: LiveRoom[];
  page: string;
  limit: string;
  total: string;
}
