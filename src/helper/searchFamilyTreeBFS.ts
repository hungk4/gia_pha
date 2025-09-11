import type {
  Person,
  FamilyTreeState,
} from "../redux/familyTree/familyTreeSlice";

export const searchFamilyTreeBfs = (
  data: FamilyTreeState,
  targetName: string
) => {

  const result: Person[] = [];

  let queue: Person[] = [];
  queue.push(data.root);
  while (queue.length !== 0) {
    // lấy phần tử đầu tiên ra khỏi hàng đợi
    let first = queue.shift();
    if (first?.name.toLowerCase().includes(targetName.toLowerCase())) result.push(first);

    // duyệt couple
    if (first?.couple) {
      for (const c of first.couple) {
        if (c.name.toLowerCase().includes(targetName.toLowerCase())) result.push(c);
      }
    }

    // duyệt children
    if (first?.children) {
      for (const child of first.children) {
        queue.push(child);
      }
    }
  }

  return result;
};
