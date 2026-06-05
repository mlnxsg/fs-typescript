import type { DiaryEntry } from "../types";
import Diary from "./Diary";

const Content = ({diaries}: {diaries: DiaryEntry[]}) => {
  {diaries.map(d => 
    <Diary diary={d} />
  )}
}

export default Content;