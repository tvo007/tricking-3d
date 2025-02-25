import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import useMeasure from "react-use-measure";
// import { Link, useParams } from "react-router-dom";
import {
  useBattleRoomClose,
  useBattleRoomUpdate,
  useBattleRoomUpdateScore,
  useGetBattleRoombySessionid,
} from "../../api/useBattleRoom";
import useAblyStore from "../../hooks/useAblyStore";
import { useUserStore } from "../../store/userStore";
import { animated, config, useSpring } from "react-spring";
import ScoreDisplay from "./components/ScoreDisplay";
import MovingPoint from "./components/MovingPoint";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { useRouter } from "next/router";
const ably = useAblyStore.getState().ably;
export const getPointsNormalized = (team1Points, team2Points) => {
  let totalPoints = team1Points + team2Points;
  let team1PointsNormalized =
    parseFloat((team1Points / totalPoints).toPrecision(2)) * 100 || 0;
  let team2PointsNormalized =
    parseFloat((team2Points / totalPoints).toPrecision(2)) * 100 || 0;
  console.log("Total", totalPoints);
  console.log("1", team1PointsNormalized);
  console.log("2", team2PointsNormalized);
  return [team1PointsNormalized, team2PointsNormalized];
};
const BattleroomPage = () => {
  const [host, setHost] = useState();
  const [judges, setJudges] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultsPending, setResultsPending] = useState(false);
  const [pollsOpen, setPollsOpen] = useState(false);
  const [hostTimer, setHostTimer] = useState(0);
  const [winner, setWinner] = useState();
  const [judgeMessages, addJudgeMessage] = useState([]);
  const [duration, setDuration] = useState(0);
  const userUUID = useUserStore((s) => s.userInfo.uuid);
  const router = useRouter();
  const { sessionid } = router.query;
  const sessionChannel = ably.channels.get(`[?rewind=10m]points:${sessionid}`);
  const [team1points, setTeam1points] = useState(0);
  const [team2points, setTeam2points] = useState(0);
  const [publicTeam1Points, setPublicTeam1points] = useState(0);
  const [publicTeam2Points, setPublicTeam2points] = useState(0);
  let isHost = host === userUUID;
  let isJudge = judges.some((j) => j.uuid === userUUID);
  const { data: roomSetup } = useGetBattleRoombySessionid(sessionid);
  const { mutate: closeRoom } = useBattleRoomClose(sessionid as string);
  const { mutate: updateRoomStats } = useBattleRoomUpdate(sessionid as string);
  const { mutate: updateRoomScore } = useBattleRoomUpdateScore(
    sessionid as string
  );
  useEffect(() => {
    console.log(roomSetup);
    Array.isArray(roomSetup?.judges) && setJudges([...roomSetup?.judges]);
    Array.isArray(roomSetup?.team1) && setTeam1([...roomSetup?.team1]);
    Array.isArray(roomSetup?.team2) && setTeam2([...roomSetup?.team2]);
    setHostTimer(roomSetup?.duration);
    if (duration === 0 || duration !== roomSetup?.duration) {
      setTimer(roomSetup?.duration);
      setDuration(roomSetup?.duration);
    }
    setHost(roomSetup?.host);
  }, [roomSetup]);
  const getWinners = () => {
    let winner, audienceWinner;
    if (team1points > team2points) {
      winner = "Team1";
    }
    if (team2points > team1points) {
      winner = "Team2";
    }
    if (team2points === team1points) {
      winner = "Tie";
    }
    if (publicTeam1Points > publicTeam2Points) {
      audienceWinner = "Team1";
    }
    if (publicTeam2Points > publicTeam1Points) {
      audienceWinner = "Team2";
    }
    if (publicTeam2Points === publicTeam1Points) {
      audienceWinner = "Tie";
    }
    return { winner, audienceWinner };
  };
  //Handle Animation
  const [imgGrow1, api1] = useSpring(() => ({
    from: { scale: 1, borderColor: "none" },
    config: { ...config.stiff },
  }));
  const [imgGrow2, api2] = useSpring(() => ({
    from: { scale: 1, borderColor: "none" },
    config: { ...config.stiff },
  }));
  const [movePoint, api3] = useSpring(() => ({
    from: { x: 0, y: 0, opacity: 0, backgroundColor: "#fcd34d" },
    config: { ...config.stiff },
  }));
  const [
    {
      pendingTeam1score,
      pendingTeam2score,
      pendingTeam1judgescore,
      pendingTeam2judgescore,
    },
    apipending,
  ] = useSpring(() => ({
    from: {
      pendingTeam1score: 50,
      pendingTeam2score: 50,
      pendingTeam1judgescore: 50,
      pendingTeam2judgescore: 50,
    },
    config: { ...config.stiff },
  }));

  useEffect(() => {
    const subscribe = async () => {
      if (userUUID) {
        sessionChannel.presence.enter({ user: userUUID });
      }
      await sessionChannel.subscribe("timer", (t) => {
        setPollsOpen(t.data.pollsOpen);
        setTimer(t.data.timer);
      });

      await sessionChannel.subscribe("finalScore", (final) => {
        console.log(final);

        let [team1pointsNormal, team2pointsNormal] = getPointsNormalized(
          final.data.team1Score,
          final.data.team2Score
        );
        let [team1AudiencepointsNormal, team2AudiencepointsNormal] =
          getPointsNormalized(
            final.data.team1AudienceScore,
            final.data.team2AudienceScore
          );
        setResultsPending(true);
        setTimeout(() => {
          setResultsPending(false);
          setShowResults(true);
        }, 7000);
        setTeam1points(() => team1pointsNormal);
        setTeam2points(() => team2pointsNormal);
        setPublicTeam1points(() => team1AudiencepointsNormal);
        setPublicTeam2points(() => team2AudiencepointsNormal);
        setWinner(final.data.winner);
        addJudgeMessage(final?.data?.judgeMessages);
      });
      if (isHost) {
        await sessionChannel.subscribe("total", (t) => {
          console.log(t);
          if (t?.data?.judge) {
            addJudgeMessage((jms) => [...jms, t.data]);
            //TODOupdateJudgeScores
            updateRoomScore({
              judge: t.data.judge,
              team: "Team1",
              score: t.data.team1,
            });
            updateRoomScore({
              judge: t.data.judge,
              team: "Team2",
              score: t.data.team2,
            });
            setTeam1points((prevPoints) => prevPoints + t.data.team1);
            setTeam2points((prevPoints) => prevPoints + t.data.team2);
          } else {
            //TODOupdateUserScores
            if (userUUID) {
              updateRoomScore({
                user: userUUID,
                team: "Team1",
                score: t.data.team1,
              });
              updateRoomScore({
                user: userUUID,
                team: "Team2",
                score: t.data.team2,
              });
            }
            setPublicTeam1points((prevPoints) => prevPoints + t.data.team1);
            setPublicTeam2points((prevPoints) => prevPoints + t.data.team2);
          }
        });

        await sessionChannel.subscribe("getTotals", (t) => {
          if (t.data.message === "getTotals") {
            const { winner, audienceWinner } = getWinners();
            updateRoomStats({
              team1Score: team1points,
              team2Score: team2points,
              team1AudienceScore: publicTeam1Points,
              team2AudienceScore: publicTeam2Points,
              winner: winner,
              audienceWinner: audienceWinner,
            });
            sessionChannel.publish("finalScore", {
              team1Score: team1points,
              team2Score: team2points,
              team1AudienceScore: publicTeam1Points,
              team2AudienceScore: publicTeam2Points,
              winner: winner,
              audienceWinner: audienceWinner,
              judgeMessages: judgeMessages,
            });
          }
        });
      }
      await sessionChannel.subscribe("closeRoom", (m) => {
        //close battleRoom & Total
        if (isHost) {
          //clearPoints before getting totals
          setTeam1points(0);
          setTeam2points(0);
          setPublicTeam1points(0);
          setPublicTeam2points(0);
          setTimeout(() => {
            sessionChannel.publish("getTotals", { message: "getTotals" });
            closeRoom();
          }, 2000);
        }
        setTimeout(() => {
          //publish data after clearingHostdata
          if (isJudge) {
            let [team1PointsNormal, team2PointsNormal] = getPointsNormalized(
              team1points,
              team2points
            );
            sessionChannel.publish("total", {
              judge: userUUID,
              team1: team1PointsNormal,
              team2: team2PointsNormal,
            });
          } else {
            let [team1PointsNormal, team2PointsNormal] = getPointsNormalized(
              publicTeam1Points,
              publicTeam2Points
            );
            sessionChannel.publish("total", {
              user: userUUID,
              team1: team1PointsNormal,
              team2: team2PointsNormal,
            });
          }
        }, 69);
      });
      await sessionChannel.subscribe("points", (m) => {
        if (m.data.team === "Team1") {
          api3.start({
            from: { x: -bounds1.width / 2, y: 333, opacity: 1 },
            to: { x: 0, y: 0, opacity: 0, backgroundColor: "#ec4899" },
          });
          api1.start({
            from: { scale: 1.3 },
            to: { scale: 1 },
          });
        }
        if (m.data.team === "Team2") {
          api3.start({
            from: { x: bounds2.width / 2, y: 333, opacity: 1 },
            to: { x: 0, y: 0, opacity: 0, backgroundColor: "#06b6d4" },
          });
          api2.start({
            from: { scale: 1.3 },
            to: { scale: 1 },
          });
        }
      });
    };
    subscribe();
    return () => sessionChannel.unsubscribe();
  });
  const handleUserClick = (team) => {
    if (pollsOpen === true) {
      sessionChannel.publish("points", {
        user: userUUID,
        team: team,
        points: 1,
      });
      if (team === "Team1") {
        setPublicTeam1points((prevPoints) => prevPoints + 1);
        api1.start({
          from: { scale: 1.6 },
          to: { scale: 1 },
        });
      }
      if (team === "Team2") {
        setPublicTeam2points((prevPoints) => prevPoints + 1);
        api2.start({
          from: { scale: 1.6 },
          to: { scale: 1 },
        });
      }
    }
  };
  const handleJudgeClick = (team) => {
    if (pollsOpen === true) {
      sessionChannel.publish("points", {
        judge: userUUID,
        team: team,
        points: 1,
      });
      if (team === "Team1") {
        setTeam1points((prevPoints) => prevPoints + 1);
        api1.start({
          //@ts-ignore
          from: { scale: 1.6, borderColor: "#f05033", borderWidth: "4px" },
          to: { scale: 1, borderWidth: "0px" },
        });
      }
      if (team === "Team2") {
        setTeam2points((prevPoints) => prevPoints + 1);
        api2.start({
          //@ts-ignore
          from: { scale: 1.6, borderColor: "#f05033", borderWidth: "4px" },
          to: { scale: 1, borderWidth: "0px" },
        });
      }
    }
  };

  useEffect(() => {
    if (hostTimer && duration && hostTimer > 0 && hostTimer !== duration) {
      sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: true });
    }
    if (hostTimer === 0 && pollsOpen === true) {
      sessionChannel.publish("timer", { timer: hostTimer, pollsOpen: false });
    }
    if (duration && hostTimer === 0 && pollsOpen === false) {
      sessionChannel.publish("closeRoom", { message: "Close" });
    }
  }, [hostTimer, duration, pollsOpen]);

  const handleTimer = () => {
    setHostTimer((prevTime) => {
      if (prevTime > 0) {
        return prevTime - 1;
      }
    });

    setTimeout(() => {
      if (hostTimer > 0) {
        handleTimer();
      }
    }, 1000);
  };
  const [team1ref, bounds1] = useMeasure();
  const [team2ref, bounds2] = useMeasure();
  useEffect(() => {
    console.log(bounds1, bounds2);
  }, [bounds1, bounds2]);
  useEffect(() => {
    function startPending() {
      let rnd = Math.random() * 100;
      let rnd2 = Math.random() * 100;
      if (resultsPending) {
        setTimeout(() => {
          startPending();
        }, 2000);

        apipending.start({
          pendingTeam1score: rnd,
          pendingTeam2score: 100 - rnd,
          pendingTeam1judgescore: rnd2,
          pendingTeam2judgescore: 100 - rnd2,
        });
      }
    }
    startPending();
  }, [resultsPending]);
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen flex-col place-items-center p-2 pt-14 text-zinc-300">
      <div
        className="absolute top-20 left-4 text-3xl"
        onClick={() => router.back()}
      >
        <IoIosArrowBack />
      </div>
      <div className=" font-titan text-3xl font-black ">Pppoints</div>
      <div className="neumorphicIn relative flex w-[70vw] flex-col place-items-center rounded-xl p-4 text-center  font-bold text-zinc-300">
        <div>{!!timer && timer}</div>
        <MovingPoint movePoint={movePoint} api3={api3} />
        {showResults ? (
          <>
            <div>{winner === "Team1" && team1.map((m) => m.username)}</div>
            <div>{winner === "Team2" && team2.map((m) => m.username)}</div>
            <div>{winner === "Tie" && "Tie"}</div>
          </>
        ) : (
          <VsDisplay team1={team1} team2={team2} />
        )}
        <TimerButton
          handleTimer={handleTimer}
          isHost={isHost}
          pollsOpen={pollsOpen}
          timer={timer}
        />
      </div>

      <div className="left-50 absolute top-0 font-black text-zinc-700">
        {userUUID ? `${isJudge ? "Judge" : "Audience"}` : "You are Anonymous"}
      </div>

      {showResults ? (
        <ResultScoreDisplay
          judgeMessages={judgeMessages}
          judges={judges}
          publicTeam1Points={publicTeam1Points}
          publicTeam2Points={publicTeam2Points}
          team1points={team1points}
          team2points={team2points}
          winner={winner !== "Tie" && winner === "Team1" ? team1 : team2}
        />
      ) : resultsPending ? (
        <div className="flex w-[90vw] flex-col place-items-center gap-3 p-4">
          <ScoreDisplay
            team1Score={pendingTeam1score}
            team2Score={pendingTeam2score}
          />
          <ScoreDisplay
            team1Score={pendingTeam1judgescore}
            team2Score={pendingTeam2judgescore}
          />
          <h1 className="font-inter text-4xl font-black text-zinc-600">
            Calculating Results...
          </h1>
        </div>
      ) : (
        <div
          id={"teamButtonContainer"}
          className="flex h-full w-full justify-around gap-2 py-2"
        >
          <TeamButton
            ref={team1ref}
            isJudge={isJudge}
            team={team1}
            teamString={"Team1"}
            imgGrow={imgGrow1}
            handleJudgeClick={handleJudgeClick}
            handleUserClick={handleUserClick}
          />
          <TeamButton
            ref={team2ref}
            isJudge={isJudge}
            team={team2}
            teamString={"Team2"}
            imgGrow={imgGrow2}
            handleJudgeClick={handleJudgeClick}
            handleUserClick={handleUserClick}
          />
        </div>
      )}
    </div>
  );
};
const TeamButton: React.FC<any> = React.forwardRef(
  (
    //@ts-ignore
    { isJudge, team, teamString, imgGrow, handleJudgeClick, handleUserClick },
    ref
  ) => {
    return (
      <div
        className="w-1/2 rounded-xl bg-zinc-900 p-2 text-center"
        //@ts-ignore
        ref={ref}
        onClick={() =>
          isJudge
            ? handleJudgeClick(`${teamString}`)
            : handleUserClick(`${teamString}`)
        }
      >
        <div className="flex h-full w-full flex-col place-content-center place-items-center justify-around gap-2">
          {team.map((p) => (
            <PlayerMap imgGrow={imgGrow} player={p} />
          ))}
        </div>
      </div>
    );
  }
);
function ResultScoreDisplay({
  publicTeam1Points,
  publicTeam2Points,
  team1points,
  team2points,
  judges,
  judgeMessages,
  winner,
}) {
  console.log(winner);
  const [showAudienceScore, setShowAudienceScore] = useState(false);
  return (
    <>
      <div className="flex w-full flex-col place-items-center gap-2 pt-4">
        <ScoreDisplay team1Score={team1points} team2Score={team2points} />
        <span className="flex gap-2">
          {winner?.map((winner) => {
            return (
              <div className="flex flex-col place-items-center gap-2">
                <img
                  key={winner.uuid}
                  className="h-[30vw] max-h-[160px] w-[30vw] max-w-[160px] rounded-full"
                  src={
                    winner.profilePic !== (undefined || null)
                      ? `/images/${winner.uuid}/${winner.profilePic}`
                      : "/images/noimg.jpeg"
                  }
                />
                <div>{winner.username}</div>
              </div>
            );
          })}
        </span>
      </div>
      {showAudienceScore && (
        <ScoreDisplay
          team1Score={publicTeam1Points}
          team2Score={publicTeam2Points}
        />
      )}
      {showAudienceScore ? (
        <FaUsers
          onClick={() => setShowAudienceScore(!showAudienceScore)}
          className={`absolute bottom-16 left-5 text-3xl ${
            showAudienceScore ? "text-zinc-300" : "text-zinc-500"
          }`}
        />
      ) : (
        <FaUsersSlash
          onClick={() => setShowAudienceScore(!showAudienceScore)}
          className={`absolute bottom-16 left-5 text-3xl ${
            showAudienceScore ? "text-zinc-300" : "text-zinc-500"
          }`}
        />
      )}
      <div className="absolute bottom-10 flex gap-2">
        <JudgeDisplay judges={judges} judgeMessages={judgeMessages} />
      </div>
    </>
  );
}
export function PlayerMap({ player, imgGrow }) {
  return (
    <div className="flex flex-col place-items-center text-zinc-300">
      <div>{player.username}</div>
      <animated.img
        style={{ ...imgGrow }}
        className="h-[20vw] max-h-[100px] w-[20vw] max-w-[100px] rounded-full"
        src={
          player.profilePic !== (undefined || null)
            ? `/images/${player.uuid}/${player.profilePic}`
            : "/images/noimg.jpeg"
        }
      />
    </div>
  );
}

function JudgeDisplay({ judges, judgeMessages }) {
  return (
    <>
      {judges.map((p) => {
        let judgeTeam1 = judgeMessages.filter(
          (m) => m.judge === p.uuid && m.team1
        )[0]?.team1;
        let judgeTeam2 = judgeMessages.filter(
          (m) => m.judge === p.uuid && m.team2
        )[0]?.team2;
        console.log(judgeTeam1, judgeTeam2);
        return (
          <div className="flex w-full flex-col place-items-center">
            <ScoreDisplay team1Score={judgeTeam1} team2Score={judgeTeam2} />
            <PlayerMap imgGrow={false} player={p} />
          </div>
        );
      })}
    </>
  );
}

function TimerButton({ isHost, timer, pollsOpen, handleTimer }) {
  return (
    isHost &&
    !!timer &&
    !pollsOpen && (
      <button
        className="w-full max-w-[400px] rounded-xl bg-emerald-500 p-2"
        onClick={() => handleTimer()}
      >
        Start Timer
      </button>
    )
  );
}
function VsDisplay({ team1, team2 }) {
  return (
    <div>
      {team1.map((m) => m.username)} vs.
      {team2.map((m) => m.username)}
    </div>
  );
}
export default BattleroomPage;
