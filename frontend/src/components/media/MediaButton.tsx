import React from "react";
//Standard Button
interface MediaButtonProps {
  id?: any;
  isPlayPause?: boolean;
  hide?: any;
  f: any;
  content: React.ReactElement<any, any>;
}
export const MediaButton: React.FC<MediaButtonProps> = ({
  id,
  isPlayPause,
  hide,
  f,
  content,
}) => {
  return (
    <button
      id={id}
      className={`
      h-full
      w-full
        ${hide ? "opacity-40" : "opacity-100"}
        ${isPlayPause ? "bg-zinc-300 hover:bg-white" : "bg-transparent"}
        can-hover 
        flex h-[37px] w-[37px]
        items-center 
        justify-center
        rounded-full
        font-bold 
        text-slate-200
        hover:text-white
        `}
      onClick={f}
    >
      {content}
    </button>
  );
};
