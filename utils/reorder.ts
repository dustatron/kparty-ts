import { ISong } from "./Types";

const reorder = (list, startIndex, endIndex) => {
  const result: ISong[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder