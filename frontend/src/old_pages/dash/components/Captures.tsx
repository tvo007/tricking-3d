//import { UserCard } from "./UserCard";
//import { useApiCreds } from "../../../hooks/useApiCreds";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../store/userStore";
import CapturedCard from "./CapturedCard";

const Captures = () => {
  const [captured, setCaptured] = useState<any>();
  const [capturedMe, setCapturedMe] = useState<any>();
  const userInfo = useUserStore((s) => s.userInfo);
  const nav = useRouter();
  useEffect(() => {
    setCaptured(userInfo.Captured)
    setCapturedMe(userInfo.CapturedMe)

  }, [userInfo]);

  const RenderCaptures = (props) => {
    const [captureGrid, setCaptureGrid] = useState(true)
    const captureContent = props.captureConten
    let captureTitle = props.title
    return <>
      <div id="myCaptures"
        className={`
          ${captureContent === captured ? "text-cyan-300" : "text-teal-200"}
          w-full max-h-[60vh] 
          mt-4
          bg-zinc-400 bg-opacity-30
          rounded-lg
          border-b-[7.5px] border-zinc-900
        `}>

        {/* Container Header */}
        <div 
          className={` font-bold text-xl bg-zinc-800 pl-2 p-1 rounded-t-lg`}
          onClick={() => setCaptureGrid(!captureGrid)} >
          {captureTitle}
        </div>

        {/* Container Content */}
        <div 
          className={`
            ${captureGrid ? " flex flex-row" : " grid grid-cols-3"} 
            max-h-[50vh]
            overflow-auto
            gap-2
            p-2
          `}>
          {!!captureContent &&
            Object.keys(captureContent).map((key) => (
              <div
                onClick={() => nav.push(`/userProfile/${captureContent[key].uuid}`)}
                key={captureContent[key].uuid}
              >
                <CapturedCard
                  name={
                    captureContent[key].first_name + " " + captureContent[key].last_name
                  }
                  src={
                    captureContent[key].profilePic
                      ? `./images/${captureContent[key].uuid}/${captureContent[key].profilePic}`
                      : `./images/noimg.jpeg`
                  }
                  username={`${captureContent[key].username}`}
                />
              </div>
            ))}
          </div>
      </div>
    </>
  }

  return (
    <div
      id="captureContainer"
      className=" w-full"
    >
      {/* My Captures */}
      <RenderCaptures captureConten={captured} title="My Captures" />
      {/* Captured Me */}
      <RenderCaptures captureConten={capturedMe} title="Captured Me"/>
    </div>
  );
};

export default Captures;
