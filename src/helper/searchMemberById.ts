import type {
  Person,
  FamilyTreeState,
} from "../redux/familyTree/familyTreeSlice";

export const searchMemberById = (
  data: FamilyTreeState,
  personId: string
) => {


  let queue: Person[] = [];
  
  queue.push(data.root);
  while (queue.length !== 0) {
    // lấy phần tử đầu tiên ra khỏi hàng đợi
    let first = queue.shift();
    if (first?.id === personId ) {
      return first
    };

    // duyệt couple
    if (first?.couple) {
      for (const c of first.couple) {
        if (c.id === personId) return c;
      }
    }

    // duyệt children
    if (first?.children) {
      for (const child of first.children) {
        queue.push(child);
      }
    }
  }

  return null;
  
};
