import React, { useEffect, useState } from "react";
import useGetTricks, {
  useGetTrickParts,
  useUpdateTrickPoints,
} from "../../../api/useGetTricks";
import { MdCheckCircle } from "../../../data/icons/MdIcons";
import useDebounce from "../../../hooks/useDebounce";

const TrickPointEditor = () => {
  const { data: trickParts, isLoading } = useGetTrickParts();
  const { data: tricks } = useGetTricks();
  if (isLoading) return <p>Loading...</p>;
  console.log(window?.screen?.orientation?.angle);
  return (
    <div
      className={`no-scrollbar grid ${
        window?.screen?.orientation?.angle > 0 ? "grid-cols-3" : "grid-cols-1"
      } no-scrollbar h-[80vh] w-[70vw] gap-3 overflow-hidden overflow-y-scroll text-xs md:w-[80vw] md:flex-wrap`}
    >
      <div className="no-scrollbar h-[35vh] w-[90%] min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 bg-zinc-900 text-2xl">Bases</div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => !a.type)
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-[90%] min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 bg-zinc-900 text-2xl">Stances</div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => a.type === "Stance")
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-[90%] min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 bg-zinc-900 text-2xl">Variations</div>
        {trickParts?.length &&
          trickParts
            ?.filter((a) => a.type === "Variation")
            ?.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
      <div className="no-scrollbar h-[35vh] w-[90%] min-w-[100px] overflow-y-scroll">
        <div className="sticky top-0 bg-zinc-900 text-2xl">Transitions</div>
        {tricks?.length &&
          tricks
            ?.filter((t) => t.type === "Transition")
            ?.map((trick) => {
              return <PointInput trick={trick} />;
            })}
      </div>
    </div>
  );
};

export default TrickPointEditor;

const PointInput = ({ trick }) => {
  const [pointValue, setPointValue] = useState(trick?.pointValue);
  //updatepointValue
  const { mutate: updatePoints, data } = useUpdateTrickPoints();
  const debouncedValue = useDebounce(pointValue, 500);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (data?.status === 200) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setSaved(false);
    }
  }, [data]);
  useEffect(() => {
    if (pointValue !== trick?.pointValue) {
      if (trick.type === "Transition") {
        updatePoints({
          pointValue: debouncedValue,
          type: trick.type,
          id: trick.id,
        });
        return;
      } else if (trick.type === "Variation") {
        updatePoints({
          pointValue: debouncedValue,
          type: trick.type,
          id: trick.id,
        });
        return;
      } else if (trick.type === "Stance") {
        updatePoints({
          pointValue: debouncedValue,
          type: trick.type,
          id: trick.stance_id,
        });
        return;
      } else if (trick.base_id) {
        updatePoints({
          pointValue: debouncedValue,
          type: "Base",
          id: trick.base_id,
        });
        return;
      }
    }
  }, [debouncedValue]);
  return (
    <div className="flex place-items-center justify-between gap-2 p-1 odd:bg-zinc-800 odd:bg-opacity-70 even:bg-zinc-900 even:bg-opacity-70">
      <div onClick={() => console.log(trick)} className="w-1/4">
        {trick?.name}
      </div>
      {saved && (
        <MdCheckCircle className={"relative left-2 text-emerald-500"} />
      )}
      <input
        onChange={(e) => setPointValue(e.target.value)}
        value={pointValue}
        className="w-1/4 bg-transparent p-1 text-center text-zinc-300"
      />
    </div>
  );
};
