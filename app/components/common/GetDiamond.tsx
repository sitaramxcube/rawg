"use client";
import { memo } from "react"
import { useDiamond } from "../DiamondContext";

const GetDiamond = () => {
    const { addToDiamond } = useDiamond();
    return (
        <button
          onClick={addToDiamond}
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          💎 Get Diamond
        </button>
    )
}
export default memo(GetDiamond)