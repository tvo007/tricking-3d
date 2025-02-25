import React from "react";
import Link from "next/link";
import { transArr } from "../../../data/TricklistClass";
import { whichLeg } from "../../comboMaker/components/ArrayDisplay";
function Transitions() {
  console.table(transArr);
  return (
    <>
      <div className="mt-4 flex flex-col place-content-center place-items-center font-inter font-bold text-zinc-300">
        <div className="text-xl font-black text-white">Transitions</div>
        <div className="flex gap-2">
          <Link href="all">All</Link>
          <Link href="singular">Singular</Link>
          <Link href="sequential">Sequential</Link>
          <Link href="unified">Unified</Link>
        </div>
        <div className="my-2 flex h-[55vh] w-full flex-col overflow-y-auto rounded-md ">
          <div>Transitions Array</div>
          {transArr.map((e) => {
            return (
              <div className=" my-2 flex flex-row place-content-center place-items-center justify-around gap-2 rounded-xl bg-black bg-opacity-40 p-1">
                <div className="w-[150px] text-xl font-bold">{e.name}</div>
                <div className="text-sm text-zinc-400">
                  {e.fromLeg && whichLeg(e.fromLeg)}
                </div>
                <div className="text-sm text-zinc-400">
                  {e.toLeg && whichLeg(e.toLeg)}
                </div>

                {/* {Object.keys(e).map((key, i) => (
									<table className='bg-zinc-400' id={i}>
										<tr>
											<td>{`${key}:`}</td>
										</tr>
										<tr className='pr-4'>
											<td>{e[key]}</td>
										</tr>
									</table>
								))} */}
                {/* <div className='text-zinc-300'>{e?.name}</div>
								<div className='text-zinc-300'>From:{e?.fromLeg}</div> */}
              </div>
            );
          })}
        </div>
        {/*TODO children routing <Outlet /> */}
      </div>
    </>
  );
}

export default Transitions;
