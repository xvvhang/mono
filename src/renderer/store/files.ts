import { atom } from "jotai"

export const fileTreeAtom = atom<false | FileTreeNode>(false)