import { type Person } from "../redux/familyTree/familyTreeSlice";

// note: ko được phép xóa nếu node vẫn còn children
export const removeMember = (
  root: Person | null,
  memberId: string
): Person | null => {
  if (!root) return null;

  // Nếu root chính là node cần xoá
  if (root.id === memberId) {
    if (root.children.length > 0) {
      return root; // không xoá nếu còn children
    }
    return null; // xoá root
  }

  // Tìm kiếm trong couple
  const coupleIndex = root.couple.findIndex((c) => c.id === memberId);
  if (coupleIndex !== -1) {
    root.couple.splice(coupleIndex, 1);
    return root;
  }

  // Tìm kiếm trong children
  const childIndex = root.children.findIndex((child) => child.id === memberId);

  if (childIndex !== -1) {
    const target = root.children[childIndex];
    if (target && target.children.length > 0) {
      return root; // không xoá nếu còn children
    }
    root.children.splice(childIndex, 1); // xoá
    return root;
  }

  // Duyệt tiếp các children để xoá đệ quy
  for (let i = 0; i < root.children.length; i++) {
    const updated = removeMember(root.children[i] ?? null, memberId);
    if (updated === null) {
      // Nếu node con bị xoá => xoá khỏi mảng
      root.children.splice(i, 1);
      i--; // điều chỉnh index sau khi splice
    } else {
      root.children[i] = updated;
    }
  }

  return root;
};
