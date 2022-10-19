import Home from "./pages/home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import { TestPage } from "./pages/TestPage";
// import { Sandbox } from "./pages/sandbox/Sandbox";
import Contribute from "./pages/contribute/Contribute";
import ComingSoon from "./pages/ComingSoon";
import InstructionsPage from "./pages/instructrions/InstructionsPage";
import Theory from "./pages/contribute/components/Theory";
import Marketing from "./pages/contribute/components/Marketing";
import Code from "./pages/contribute/components/Code";
import Design from "./pages/contribute/components/Design";
import HelpWith3d from "./pages/contribute/components/HelpWith3d";
import AppBackground from "./components/layout/AppBackground";
import Header from "./components/layout/Header";
import TheoryPage from "./pages/theory/TheoryPage";
import AdvancedStanceCircle from "./components/theory/AdvancedStanceCircle";
import LearnMore from "./pages/learnmore/LearnMore";
import AboutUs from "./pages/about/AboutUs";
import AllTrickDisplay from "./pages/AllTrickDisplay";
import AnatomyOfATrick from "./pages/theory/anatomy/AnatomyOfATrick";
import Setups from "./pages/theory/Setups";
import Transitions from "./pages/theory/transitions/Transitions";
import Grabs from "./pages/theory/grabs/Grabs";
import Shapes from "./pages/theory/shapes/Shapes";
import Rotations from "./pages/theory/rotations/Rotations";
import Kicks from "./pages/theory/kicks/Kicks";
import Touchdowns from "./pages/theory/touchdowns/Touchdowns";
import Singular from "./pages/theory/transitions/components/Singular";
import Sequential from "./pages/theory/transitions/components/Sequential";
import Unified from "./pages/theory/transitions/components/Unified";
import All from "./pages/theory/transitions/components/All";
import { TransitionList } from "./pages/TransitionList";
import TabBar from "./components/layout/TabBar";
import { animated, useTransition } from "react-spring";
import { lazy, Suspense, useEffect, useState } from "react";
import TheoryTabBar from "./components/layout/TheoryTabBar";
import AnimationsNeeded from "./pages/AnimationsNeeded";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dash/Dashboard";
import RequireAuth from "./auth/RequireAuth";
import PersistLogin from "./auth/PersistLogin";
import UserIcon from "./components/layout/UserIcon";
import { useUserStore } from "./store/userStore";
import Axes from "./pages/theory/axes/Axes";
// import ComboMakerV2 from "./pages/comboMakerV2/ComboMakerV2";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import UserProfile from "./pages/userProfile/userProfile";
import TheoryIndexInstructions from "./pages/theory/TheoryIndexInstructions";
import TestSections from "./pages/TestSections";
import AdminIndex from "./admin/AdminIndex";
import UserSettings from "./pages/userSettings/UserSettings";
import { TorqueScene } from "./scenes/TorqueScene";
import PointsPage from "./pages/pppoints/PointsPage";
const UserProfile = lazy(() => import("./pages/userProfile/userProfile"));
const Sandbox = lazy(() => import("./pages/sandbox/Sandbox"));
const ComboMakerV2 = lazy(() => import("./pages/comboMakerV2/ComboMakerV2"));
function App() {
	const accessToken = useUserStore((s) => s.accessToken);
	const location = useLocation();
	const transitions = useTransition(location, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		exitBeforeEnter: true,
		config: {
			duration: 100,
			tension: 140,
			friction: 80,
		},
	});

	const [tabBar, setTabBar] = useState(true);
	const [isSandbox, setIsSandbox] = useState(false);
	const [isUserProfile, setIsUserProfile] = useState(false);
	useEffect(() => {
		location.pathname.includes("/theory") ? setTabBar(false) : setTabBar(true);
	}, [location.pathname]);
	useEffect(() => {
		location.pathname.includes("/sandbox")
			? setIsSandbox(false)
			: setIsSandbox(false);
		location.pathname.includes("/sandbox")
			? setIsUserProfile(true)
			: setIsUserProfile(false);
	}, [location.pathname]);
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				{/* <ReactQueryDevtools initialIsOpen /> */}
				<AppBackground />
				{!location.pathname.includes("/admin") && <UserIcon />}
				{!location.pathname.includes("/home") &&
					!location.pathname.includes("/admin") &&
					location.pathname !== "/" && <Header />}
				{tabBar
					? (!isSandbox || !isUserProfile) && <TabBar />
					: !isSandbox && <TheoryTabBar />}

				{transitions(({ opacity }, curLocation) => (
					<animated.div style={{ opacity }}>
						<Routes location={curLocation}>
							<Route path='*' element={<ComingSoon />} />
							<Route
								path='/'
								element={
									<Suspense>
										<Home />
									</Suspense>
								}
							/>

							<Route path='/admin' element={<AdminIndex />} />
							<Route path={"/register"} element={<Register />} />
							<Route path={"/pppoints"} element={<PointsPage />} />
							<Route element={<PersistLogin />}>
								<Route path={"/login"} element={<Login />} />

								<Route element={<RequireAuth />}>
									<Route path={"/dash"} element={<Dashboard />} />
								</Route>
							</Route>
							<Route path={"/home"} element={<Home />} />
							<Route
								path={"/userProfile/:uuid"}
								element={
									<Suspense>
										<UserProfile />
									</Suspense>
								}
							/>
							<Route path={"/userSettings"} element={<UserSettings />} />
							<Route path={"/learnmore"} element={<LearnMore />} />
							<Route path={"/about"} element={<AboutUs />} />

							<Route
								path={"/sandbox"}
								element={
									<Suspense>
										<Sandbox />
									</Suspense>
								}>
								<Route path=':model/:trick' element={<TorqueScene />} />
								<Route index element={<TorqueScene />} />
							</Route>
							<Route
								path={"/comboMaker"}
								element={
									<div className=' mt-14 flex h-full w-full place-content-center'>
										<Suspense>
											<ComboMakerV2 />
										</Suspense>
									</div>
								}
							/>

							<Route path={"/test"} element={<TestSections />} />
							<Route path={"/need"} element={<AnimationsNeeded />} />
							<Route path={"/theory"} element={<TheoryPage />}>
								<Route path={"transitionlist"} element={<TransitionList />} />
								<Route path={"tricks"} element={<AllTrickDisplay />} />
								<Route path={"axes"} element={<Axes />} />
								<Route path={"anatomy"} element={<AnatomyOfATrick />} />
								<Route path={"setups"} element={<Setups />} />
								<Route path={"transitions"} element={<Transitions />}>
									<Route index element={<All />} />
									<Route path='all' element={<All />} />
									<Route path='singular' element={<Singular />} />
									<Route path='sequential' element={<Sequential />} />
									<Route path='unified' element={<Unified />} />
								</Route>
								<Route path={"grabs"} element={<Grabs />} />
								<Route path={"shapes"} element={<Shapes />} />
								<Route path={"rotations"} element={<Rotations />} />
								<Route path={"kicks"} element={<Kicks />} />
								<Route path={"touchdowns"} element={<Touchdowns />} />
								<Route
									path={"stances"}
									element={<AdvancedStanceCircle />}></Route>
								<Route index element={<TheoryIndexInstructions />} />
							</Route>
							<Route path={"/comingsoon"} element={<ComingSoon />} />
							<Route path={"/contribute"} element={<Contribute />}>
								<Route path={"design"} element={<Design />} />
								<Route path={"code"} element={<Code />} />
								<Route path={"marketing"} element={<Marketing />} />
								<Route path={"theory"} element={<Theory />} />
								<Route path={"3d"} element={<HelpWith3d />} />
								<Route
									index
									element={
										<div className='text-center'>What can you help with?</div>
									}
								/>
							</Route>
							<Route path={"/instructions"} element={<InstructionsPage />} />

							<Route path={"/test"} element={<TestPage />}></Route>
						</Routes>
					</animated.div>
				))}
			</QueryClientProvider>
		</>
	);
}

export default App;

// 8=D
