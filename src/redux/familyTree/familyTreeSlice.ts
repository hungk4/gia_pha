import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchFamilyTreeBfs } from "../../helper/searchFamilyTreeBFS";
import { searchMemberById } from "../../helper/searchMemberById";
import { removeMember } from "../../helper/removeMember";
import { toast } from "react-toastify";

export interface Person {
  id: string;
  name: string;
  gender: "male" | "female";
  year: string; // yyyy-mm-dd
  status: "Alive" | "Deceased";
  deathYear: string;
  address: string;
  contact: string;
  fatherId: string;
  motherId: string;
  couple: Person[];
  children: Person[];
}

export interface FamilyTreeState {
  root: Person | null;
  searchResults: Person[];
}

const initialState: FamilyTreeState = {
  root: {
    id: "1",
    name: "Nguyen Van A",
    gender: "male",
    year: "1970-01-01",
    status: "Alive",
    deathYear: "",
    address: "Hanoi",
    contact: "0123456789",
    fatherId: "",
    motherId: "",
    couple: [
      {
        id: "2",
        name: "Tran Thi B",
        gender: "female",
        year: "1972-01-01",
        status: "Alive",
        deathYear: "",
        address: "Hanoi",
        contact: "0987654321",
        fatherId: "",
        motherId: "",
        couple: [],
        children: [],
      },
    ],
    children: [
      {
        id: "3",
        name: "Nguyen Van C",
        gender: "male",
        year: "1995-01-01",
        status: "Alive",
        deathYear: "",
        address: "Hanoi",
        contact: "0111222333",
        fatherId: "1",
        motherId: "2",
        couple: [
          {
            id: "4",
            name: "Le Thi D",
            gender: "female",
            year: "1996-01-01",
            status: "Alive",
            deathYear: "",
            address: "Hanoi",
            contact: "0222333444",
            fatherId: "",
            motherId: "",
            couple: [],
            children: [],
          },
        ],
        children: [
          {
            id: "5",
            name: "Nguyen Van E",
            gender: "male",
            year: "2015-01-01",
            status: "Alive",
            deathYear: "",
            address: "",
            contact: "",
            fatherId: "3",
            motherId: "4",
            couple: [],
            children: [],
          },
          {
            id: "6",
            name: "Nguyen Thi F",
            gender: "female",
            year: "2017-01-01",
            status: "Alive",
            deathYear: "",
            address: "",
            contact: "",
            fatherId: "3",
            motherId: "4",
            couple: [],
            children: [],
          },
        ],
      },
      {
        id: "7",
        name: "Nguyen Thi G",
        gender: "female",
        year: "1998-01-01",
        status: "Alive",
        deathYear: "",
        address: "Hanoi",
        contact: "0555666777",
        fatherId: "1",
        motherId: "2",
        couple: [
          {
            id: "8",
            name: "Pham Van H",
            gender: "male",
            year: "1997-01-01",
            status: "Alive",
            deathYear: "",
            address: "",
            contact: "",
            fatherId: "",
            motherId: "",
            couple: [],
            children: [],
          },
        ],
        children: [
          {
            id: "9",
            name: "Pham Van I",
            gender: "male",
            year: "2020-01-01",
            status: "Alive",
            deathYear: "",
            address: "",
            contact: "",
            fatherId: "8",
            motherId: "7",
            couple: [],
            children: [],
          },
        ],
      },
    ],
  },
  searchResults: [],
};


export const familyTreeSlice = createSlice({
  name: "tree",
  initialState, // dùng luôn initialState đã khai báo
  reducers: {
    addMember: (
      state,
      action: PayloadAction<{ member: Person; parentNodeId: string }>
    ) => {
      const { member, parentNodeId } = action.payload;

      if (!parentNodeId) return;

      const parentNode = searchMemberById(state, parentNodeId);
      if (!parentNode) return;

      // Thêm member vào children của parent
      parentNode.children.push(member);
      toast.success("Thêm con thành công!");
    },
    editMember: (state, action: PayloadAction<Person>) => {
      const member = action.payload;
      let nodeToEdit = searchMemberById(state, member.id);
      if (nodeToEdit) {
        nodeToEdit.name = member.name;
        nodeToEdit.gender = member.gender;
        nodeToEdit.year = member.year;
        nodeToEdit.status = member.status;
        nodeToEdit.deathYear = member.deathYear;
        nodeToEdit.address = member.address;
        nodeToEdit.contact = member.contact;
        nodeToEdit.fatherId = member.fatherId;
        nodeToEdit.motherId = member.motherId;
        nodeToEdit.couple = member.couple;
        nodeToEdit.children = member.children;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      const memberId = action.payload;
      state.root = removeMember(state.root, memberId);
    },

    searchMember: (state, action: PayloadAction<string>) => {
      const targetName = action.payload.trim();
      if (!targetName) {
        state.searchResults = [];
        return;
      }
      const result = searchFamilyTreeBfs(state, targetName);
      state.searchResults = result;
    },
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  addMember,
  editMember,
  deleteMember,
  searchMember,
  clearSearch,
} = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
