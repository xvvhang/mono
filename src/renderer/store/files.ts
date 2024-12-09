import { atom } from "jotai"

export const fileTreeAtom = atom<false | FileTreeNode>(false)

export const noteFileTreeAtom = atom<false | FileTreeNode>(false)

export const taskFileTreeAtom = atom<false | FileTreeNode>(false)